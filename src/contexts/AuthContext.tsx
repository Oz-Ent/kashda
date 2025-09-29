"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { User } from "firebase/auth";
import {
  AuthService,
  UserProfile,
  AuthResponse,
  KYCData,
  LoggedInUser,
} from "@/lib/auth";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface AuthContextType {
  // State
  user: User | null;
  userProfile: UserProfile | null;
  loggedInUser: LoggedInUser | null;
  loading: boolean;
  sessionTime: number;

  // Authentication methods
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signInWithGoogle: () => Promise<AuthResponse>;
  signInWithApple: () => Promise<AuthResponse>;
  signOut: () => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<AuthResponse>;

  // User management
  updateProfile: (updates: Partial<UserProfile>) => Promise<AuthResponse>;
  sendEmailVerification: () => Promise<AuthResponse>;
  checkEmailVerification: () => Promise<boolean>;
  fetchUserProfile: () => Promise<void>;
  refreshLoggedInUser: () => void;

  // KYC management
  submitKYC: (
    kycData: Omit<KYCData, "submittedAt" | "status">
  ) => Promise<AuthResponse>;
  isKYCCompleted: () => Promise<boolean>;

  // Session management
  refreshSessionTime: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);

  // Helper function to create loggedInUser object consistently
  const createLoggedInUser = useCallback(
    (profile: UserProfile): LoggedInUser => {
      const individual = profile.kycData?.accountType === "individual";
      return {
        email: profile.email,
        firstName: individual
          ? profile.kycData?.personalInfo?.firstName || ""
          : profile.kycData?.businessInfo?.companyName || "",
        lastName: individual
          ? profile.kycData?.personalInfo?.lastName || ""
          : profile.kycData?.businessInfo?.companyName || "",
        accountType: profile.kycData?.accountType || "individual",
        photoURL: profile.photoURL || "",
        createdAt: profile.createdAt || new Date(),
        kycCompleted: profile.kycCompleted || false,
      };
    },
    []
  );

  // Session time update interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (user?.email && userProfile?.sessionStartTime) {
      interval = setInterval(() => {
        const startTime =
          userProfile.sessionStartTime instanceof Date
            ? userProfile.sessionStartTime
            : userProfile.sessionStartTime?.toDate();

        if (startTime) {
          setSessionTime(Date.now() - startTime.getTime());
        }
      }, 1000); // Update every second
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [user?.email, userProfile?.sessionStartTime]);

  // Debug: Monitor loggedInUser changes
  useEffect(() => {
    console.log("AuthContext: loggedInUser changed:", loggedInUser);
  }, [loggedInUser]);

  // Listen for authentication state changes
  useEffect(() => {
    console.log("Setting up auth state listener...");
    const unsubscribe = AuthService.onAuthStateChange(async (firebaseUser) => {
      console.log(
        "Auth state changed:",
        firebaseUser ? firebaseUser.uid : "null"
      );
      setUser(firebaseUser);

      if (firebaseUser) {
        console.log("User authenticated, getting profile...");
        // Get user profile from Firestore
        const profile = await AuthService.getUserProfile(firebaseUser.uid);
        console.log("User profile:", profile);
        setUserProfile(profile);

        // Also populate loggedInUser for existing users
        if (profile) {
          setLoggedInUser(createLoggedInUser(profile));
        } else {
          // Fallback: create basic loggedInUser if no profile exists
          const fallbackLoggedInUser = {
            email: firebaseUser.email!,
            firstName: "",
            lastName: "",
            accountType: "individual" as const,
            photoURL: firebaseUser.photoURL || "",
            createdAt: new Date(),
            kycCompleted: false,
          };
          setLoggedInUser(fallbackLoggedInUser);
        }

        // Initialize session time
        if (profile?.sessionStartTime) {
          const startTime =
            profile.sessionStartTime instanceof Date
              ? profile.sessionStartTime
              : profile.sessionStartTime?.toDate();

          if (startTime) {
            setSessionTime(Date.now() - startTime.getTime());
          }
        }
      } else {
        console.log("User signed out, clearing state...");
        setUserProfile(null);
        setLoggedInUser(null);
        setSessionTime(0);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Authentication methods
  const signUp = useCallback(
    async (email: string, password: string): Promise<AuthResponse> => {
      console.log("AuthContext: Starting signup for", email);
      setLoading(true);
      const result = await AuthService.createAccount(email, password);
      console.log("AuthContext: Signup result", result);

      if (result.success && result.user) {
        console.log("AuthContext: Immediately setting user state after signup");
        // Immediately set the user state instead of waiting for onAuthStateChange
        setUser(result.user);

        // Create a basic user profile structure with explicit KYC status
        const basicProfile: UserProfile = {
          uid: result.user.uid,
          email: result.user.email!,
          photoURL: result.user.photoURL || "",
          createdAt: new Date(),
          lastLoginAt: new Date(),
          sessionStartTime: new Date(),
          emailVerified: result.user.emailVerified,
          provider: "email",
          kycCompleted: false, // Explicitly set to false for new users
          displayName: "",
        };
        console.log("AuthContext: Setting basic profile", basicProfile);
        setUserProfile(basicProfile);

        // Immediately set loggedInUser with basic data
        const basicLoggedInUser = {
          email: result.user.email!,
          firstName: "",
          lastName: "",
          accountType: "individual" as const,
          photoURL: result.user.photoURL || "",
          createdAt: new Date(),
          kycCompleted: false,
        };
        console.log(
          "AuthContext: Setting basic loggedInUser:",
          basicLoggedInUser
        );
        setLoggedInUser(basicLoggedInUser);

        setSessionTime(0); // Start session time from 0

        // Fetch the actual user profile from Firestore to ensure consistency
        try {
          console.log("AuthContext: Fetching Firestore profile...");
          const userDoc = await getDoc(doc(db, "users", result.user.uid));
          if (userDoc.exists()) {
            const firestoreProfile = userDoc.data() as UserProfile;
            console.log(
              "AuthContext: Fetched Firestore profile",
              firestoreProfile
            );
            // Ensure KYC status is explicitly set to false for new users
            const updatedProfile = {
              ...firestoreProfile,
              kycCompleted: firestoreProfile.kycCompleted || false,
            };

            setLoggedInUser(createLoggedInUser(updatedProfile));
            setUserProfile(updatedProfile);
          } else {
            console.log("AuthContext: No Firestore profile found yet");
            // Keep the basic loggedInUser we set earlier
          }
        } catch (error) {
          console.error("AuthContext: Error fetching Firestore profile", error);
          // Keep the basic loggedInUser we set earlier
        }

        console.log("AuthContext: Signup completed, user state set");
      } else {
        console.log("AuthContext: Signup failed", result.error);
      }

      setLoading(false);
      return result;
    },
    []
  );

  const signIn = useCallback(
    async (email: string, password: string): Promise<AuthResponse> => {
      setLoading(true);
      const result = await AuthService.signInWithEmail(email, password);
      if (result.success) {
        // Reset session time on successful login
        setSessionTime(0);
        console.log("session time set to 0");
        // Optimistically set local session start to avoid expiry race
        setUserProfile((prev) => (prev ? { ...prev, sessionStartTime: new Date() } : prev));
      }
      setLoading(false);
      return result;
    },
    []
  );

  const signInWithGoogle = useCallback(async (): Promise<AuthResponse> => {
    setLoading(true);
    const result = await AuthService.signInWithGoogle();
    if (result.success) {
      // Reset session time on successful login
      setSessionTime(0);
      // Optimistically set local session start to avoid expiry race
      setUserProfile((prev) => (prev ? { ...prev, sessionStartTime: new Date() } : prev));
    }
    setLoading(false);
    return result;
  }, []);

  const signInWithApple = useCallback(async (): Promise<AuthResponse> => {
    setLoading(true);
    const result = await AuthService.signInWithApple();
    if (result.success) {
      // Reset session time on successful login
      setSessionTime(0);
      // Optimistically set local session start to avoid expiry race
      setUserProfile((prev) => (prev ? { ...prev, sessionStartTime: new Date() } : prev));
    }
    setLoading(false);
    return result;
  }, []);

  const signOut = useCallback(async (): Promise<AuthResponse> => {
    setLoading(true);
    const result = await AuthService.signOut();
    if (result.success) {
      // User logged out willingly; zero out current session time immediately
      setSessionTime(0);
    }
    console.log("session time set to 0");
    setLoading(false);
    return result;
  }, []);

  const resetPassword = useCallback(
    async (email: string): Promise<AuthResponse> => {
      return await AuthService.resetPassword(email);
    },
    []
  );

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>): Promise<AuthResponse> => {
      if (!user) {
        return { success: false, error: "No user logged in" };
      }

      const result = await AuthService.updateUserProfile(user.uid, updates);

      if (result.success) {
        // Update local state
        setUserProfile((prev) => {
          if (!prev) return null;
          const updated = {
            ...prev,
            ...updates,
            displayName:
              updates.kycData?.businessInfo?.companyName ||
              updates.kycData?.personalInfo?.firstName ||
              "",
          };

          // Also update loggedInUser with the new data
          if (updates.kycData) {
            const individual = updates.kycData.accountType === "individual";
            const updatedLoggedInUser = {
              email: prev.email,
              firstName: individual
                ? updates.kycData.personalInfo?.firstName || ""
                : updates.kycData.businessInfo?.companyName || "",
              lastName: individual
                ? updates.kycData.personalInfo?.lastName || ""
                : updates.kycData.businessInfo?.companyName || "",
              accountType: updates.kycData.accountType || "individual",
              photoURL: prev.photoURL || "",
              createdAt: prev.createdAt || new Date(),
              kycCompleted: updates.kycCompleted || prev.kycCompleted || false,
            };

            console.log(
              "AuthContext: Updating loggedInUser from updateProfile:",
              updatedLoggedInUser
            );
            setLoggedInUser(updatedLoggedInUser);
          }

          return updated;
        });
      }

      return result;
    },
    [user]
  );

  const sendEmailVerification = useCallback(async (): Promise<AuthResponse> => {
    return await AuthService.sendEmailVerification();
  }, []);

  const checkEmailVerification = useCallback(async (): Promise<boolean> => {
    return await AuthService.checkEmailVerification();
  }, []);

  const refreshSessionTime = useCallback(async (): Promise<void> => {
    if (user) {
      await refreshSessionTimeForUser({
        userId: user.uid,
        setSessionTime,
        signOut,
      });
    }
  }, [user, signOut, setSessionTime]);

  // KYC management methods
  const submitKYC = useCallback(
    async (
      kycData: Omit<KYCData, "submittedAt" | "status">
    ): Promise<AuthResponse> => {
      if (!user) {
        return { success: false, error: "No user logged in" };
      }

      console.log("AuthContext: Starting KYC submission for user:", user.uid);
      console.log("AuthContext: KYC data to submit:", kycData);

      const result = await AuthService.submitKYC(user.uid, kycData);
      console.log("AuthContext: KYC submission result:", result);

      if (result.success) {
        console.log(
          "AuthContext: KYC submission successful, updating local state"
        );
        // Update local state to reflect KYC completion
        setUserProfile((prev) => {
          if (!prev) return null;

          // Create updated profile with new KYC data
          const updated = {
            ...prev,
            kycCompleted: true,
            kycData: {
              ...kycData,
              submittedAt: new Date(),
              status: "pending" as const,
            },
            displayName:
              kycData.accountType === "individual"
                ? kycData.personalInfo?.firstName || ""
                : kycData.businessInfo?.companyName || "",
          };

          console.log("AuthContext: Updated profile with KYC data:", updated);

          // Also update loggedInUser with the new data
          const updatedLoggedInUser = {
            email: prev.email,
            firstName:
              kycData.accountType === "individual"
                ? kycData.personalInfo?.firstName || ""
                : kycData.businessInfo?.companyName || "",
            lastName:
              kycData.accountType === "individual"
                ? kycData.personalInfo?.lastName || ""
                : kycData.businessInfo?.companyName || "",
            accountType: kycData.accountType,
            photoURL: prev.photoURL || "",
            createdAt: prev.createdAt || new Date(),
            kycCompleted: true,
          };

          console.log(
            "AuthContext: Setting updated loggedInUser:",
            updatedLoggedInUser
          );
          setLoggedInUser(updatedLoggedInUser);

          return updated;
        });
      } else {
        console.log("AuthContext: KYC submission failed:", result.error);
      }

      return result;
    },
    [user]
  );

  const isKYCCompleted = useCallback(async (): Promise<boolean> => {
    if (!user) {
      return false;
    }
    return await AuthService.isKYCCompleted(user.uid);
  }, [user]);

  const fetchUserProfile = useCallback(async (): Promise<void> => {
    if (user) {
      const profile = await AuthService.getUserProfile(user.uid);
      if (profile) {
        setUserProfile({
          ...profile,
          displayName:
            profile.kycData?.businessInfo?.companyName ||
            profile.kycData?.personalInfo?.firstName ||
            "",
        });

        // Update loggedInUser with the fresh profile data
        const individual = profile.kycData?.accountType === "individual";
        const updatedLoggedInUser = {
          email: profile.email,
          firstName: individual
            ? profile.kycData?.personalInfo?.firstName || ""
            : profile.kycData?.businessInfo?.companyName || "",
          lastName: individual
            ? profile.kycData?.personalInfo?.lastName || ""
            : profile.kycData?.businessInfo?.companyName || "",
          accountType: profile.kycData?.accountType || "individual",
          photoURL: profile.photoURL || "",
          createdAt: profile.createdAt || new Date(),
          kycCompleted: profile.kycCompleted || false,
        };

        console.log(
          "AuthContext: Refreshing loggedInUser from fetchUserProfile:",
          updatedLoggedInUser
        );
        setLoggedInUser(updatedLoggedInUser);
      }
    }
  }, [user]);

  const refreshLoggedInUser = useCallback(() => {
    if (userProfile) {
      setLoggedInUser(createLoggedInUser(userProfile));
    }
  }, [userProfile, createLoggedInUser]);

  const value: AuthContextType = useMemo(
    () => ({
      // State
      user,
      userProfile,
      loggedInUser,
      loading,
      sessionTime,

      // Authentication methods
      signUp,
      signIn,
      signInWithGoogle,
      signInWithApple,
      signOut,
      resetPassword,

      // User management
      updateProfile,
      sendEmailVerification,
      checkEmailVerification,
      fetchUserProfile,
      refreshLoggedInUser,

      // KYC management
      submitKYC,
      isKYCCompleted,

      // Session management
      refreshSessionTime,
    }),
    [
      user,
      userProfile,
      loggedInUser,
      loading,
      sessionTime,
      signUp,
      signIn,
      signInWithGoogle,
      signInWithApple,
      signOut,
      resetPassword,
      updateProfile,
      sendEmailVerification,
      checkEmailVerification,
      fetchUserProfile,
      refreshLoggedInUser,
      submitKYC,
      isKYCCompleted,
      refreshSessionTime,
      createLoggedInUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Helper hook for protected routes
export const useRequireAuth = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login page using Next.js router
      router.push("/login");
    }
  }, [user, loading, router]);

  return { user, loading };
};

// Exported helper to refresh session time for a specific user id
export async function refreshSessionTimeForUser(params: {
  userId: string;
  setSessionTime: React.Dispatch<React.SetStateAction<number>>;
  signOut: () => Promise<AuthResponse>;
}): Promise<void> {
  const { userId, setSessionTime, signOut } = params;
  const currentSessionTime = await AuthService.getSessionTime(userId);
  if (currentSessionTime !== null) {
    setSessionTime(currentSessionTime);

    // Check if session has expired (24 hours = 86400000 ms)
    const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;
    if (currentSessionTime > SESSION_TIMEOUT) {
      // Session expired, sign out user
      await signOut();
    }
  }
}

// Session time formatter utility
export const formatSessionTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};
