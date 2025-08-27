import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

// Types
export interface UserProfile {
  uid: string;
  email: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
  sessionStartTime?: Date | Timestamp;
  emailVerified: boolean;
  provider: "email" | "google" | "apple";
  kycCompleted: boolean;
  kycData?: KYCData;
  displayName: string;
}

export interface KYCData {
  accountType: "individual" | "business";
  personalInfo?: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    phoneNumber: string;
    address: string; // Simple textarea address as in current form
    occupation: string;
    incomeRange: string;
    purposeOfAccount: string[]; // Checkbox selections
  };
  businessInfo?: {
    companyName: string;
    nationality: string;
    phoneNumber: string;
    address: string; // Simple textarea address as in current form
    industryType: string;
    incomeRange: string;
  };
  documents: {
    idType: string;
    idNumber: string;
    idExpiryDate?: string;
    proofOfAddress?: string;
    additionalDocuments?: string[];
  };
  submittedAt: Date;
  status: "pending" | "approved" | "rejected";
  verifiedAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}
export interface LoggedInUser {
  email: string;
  firstName: string;
  lastName: string;
  accountType: "individual" | "business";
  photoURL?: string;
  createdAt: Date;
  kycCompleted: boolean;
}

// Initialize OAuth providers
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

// Configure providers
googleProvider.addScope("email");
googleProvider.addScope("profile");

appleProvider.addScope("email");
appleProvider.addScope("name");

// Auth Service Class
export class AuthService {
  /**
   * Create a new user account with email and password
   */
  static async createAccount(
    email: string,
    password: string,
    displayName?: string
  ): Promise<AuthResponse> {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // Update display name if provided
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Create user profile in Firestore
      await this.createUserProfile(user, "email");

      // Send email verification
      await sendEmailVerification(user);

      return { success: true, user };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Sign in with email and password
   */
  static async signInWithEmail(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Update last login time and session start time
      await this.updateUserSession(user.uid);

      return { success: true, user };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<AuthResponse> {
    try {
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        googleProvider
      );
      const user = userCredential.user;

      // Check if this is a new user
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await this.createUserProfile(user, "google");
      } else {
        await this.updateUserSession(user.uid);
      }

      return { success: true, user };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Sign in with Apple
   */
  static async signInWithApple(): Promise<AuthResponse> {
    try {
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        appleProvider
      );
      const user = userCredential.user;

      // Check if this is a new user
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await this.createUserProfile(user, "apple");
      } else {
        await this.updateUserSession(user.uid);
      }

      return { success: true, user };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<AuthResponse> {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Send password reset email
   */
  static async resetPassword(email: string): Promise<AuthResponse> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Get current user
   */
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Get user session time
   */
  static async getSessionTime(uid: string): Promise<number | null> {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const sessionStartTime = userData.sessionStartTime?.toDate();
        if (sessionStartTime) {
          return Date.now() - sessionStartTime.getTime();
        }
      }
      return null;
    } catch (error) {
      console.error("Error getting session time:", error);
      return null;
    }
  }

  /**
   * Create user profile in Firestore
   */
  private static async createUserProfile(
    user: User,
    provider: "email" | "google" | "apple"
  ): Promise<void> {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      photoURL: user.photoURL || "",
      createdAt: new Date(),
      lastLoginAt: new Date(),
      sessionStartTime: new Date(),
      emailVerified: user.emailVerified,
      provider,
      kycCompleted: false, // Explicitly set to false for new users
      displayName: user.displayName || "",
    };

    console.log(
      "AuthService: Creating user profile with KYC status:",
      userProfile.kycCompleted
    );
    await setDoc(doc(db, "users", user.uid), userProfile);
    console.log("AuthService: User profile created successfully");
  }

  /**
   * Update user session information
   */
  private static async updateUserSession(uid: string): Promise<void> {
    try {
      await updateDoc(doc(db, "users", uid), {
        lastLoginAt: new Date(),
        sessionStartTime: new Date(),
      });
    } catch (error) {
      console.error("Error updating user session:", error);
    }
  }

  /**
   * Listen to authentication state changes
   */
  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  /**
   * Get user profile from Firestore
   */
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(
    uid: string,
    updates: Partial<UserProfile>
  ): Promise<AuthResponse> {
    try {
      await updateDoc(doc(db, "users", uid), updates);
      return { success: true };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Send email verification
   */
  static async sendEmailVerification(): Promise<AuthResponse> {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        return { success: true };
      }
      return { success: false, error: "No user logged in" };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Check if email is verified
   */
  static async checkEmailVerification(): Promise<boolean> {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      return user.emailVerified;
    }
    return false;
  }

  /**
   * Submit KYC data for user verification
   */
  static async submitKYC(
    uid: string,
    kycData: Omit<KYCData, "submittedAt" | "status">
  ): Promise<AuthResponse> {
    try {
      console.log("AuthService: Starting KYC submission for user:", uid);
      console.log("AuthService: KYC data received:", kycData);

      const user = auth.currentUser;
      if (!user || user.uid !== uid) {
        console.log("AuthService: Unauthorized access - user mismatch");
        return { success: false, error: "Unauthorized access" };
      }

      const kycSubmission: KYCData = {
        ...kycData,
        submittedAt: new Date(),
        status: "pending",
      };

      console.log("AuthService: Prepared KYC submission:", kycSubmission);
      console.log("AuthService: Updating Firestore document...");

      await updateDoc(doc(db, "users", uid), {
        kycCompleted: true,
        kycData: kycSubmission,
      });

      console.log("AuthService: Firestore update successful");
      return { success: true };
    } catch (error: unknown) {
      console.error("AuthService: Error in submitKYC:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Check if user has completed KYC
   */
  static async isKYCCompleted(uid: string): Promise<boolean> {
    try {
      const profile = await this.getUserProfile(uid);
      return profile?.kycCompleted || false;
    } catch (error) {
      console.error("Error checking KYC status:", error);
      return false;
    }
  }
}
