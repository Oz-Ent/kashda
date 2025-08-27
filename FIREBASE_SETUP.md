# Firebase Authentication Setup Guide

## Environment Variables (.env.local)

Create a `.env.local` file in your project root with the following KASHDA-prefixed variables:

```env
# Firebase Configuration
NEXT_PUBLIC_KASHDA_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_KASHDA_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_KASHDA_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_KASHDA_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_KASHDA_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_KASHDA_FIREBASE_APP_ID=your_app_id_here
NEXT_PUBLIC_KASHDA_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

**Note:** The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js.

## Firebase Console Setup

### 1. Enable Authentication Methods

In your Firebase Console:

1. Go to Authentication > Sign-in method
2. Enable the following providers:
   - **Email/Password**
   - **Google**
   - **Apple** (if targeting iOS/macOS)

### 2. Google OAuth Setup

1. Enable Google provider in Firebase Console
2. Add your domain to authorized domains
3. For production, add your actual domain

### 3. Apple OAuth Setup

1. Enable Apple provider in Firebase Console
2. Configure Apple Developer account settings
3. Add Bundle ID and Team ID

### 4. Firestore Database

1. Create a Firestore database
2. Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Features Implemented

### ✅ Authentication Methods

- ✅ Email & Password registration
- ✅ Email & Password login
- ✅ Google OAuth login/signup
- ✅ Apple OAuth login/signup
- ✅ Password reset via email
- ✅ Email verification

### ✅ User Management

- ✅ User profile creation with auto-generated UID
- ✅ Display name support
- ✅ Email verification status
- ✅ Provider tracking (email/google/apple)
- ✅ Session time tracking
- ✅ Last login timestamps

### ✅ Session Management

- ✅ Real-time session duration tracking
- ✅ Session start time logging
- ✅ Auto-refresh session data
- ✅ Session status indicators

### ✅ Components Created

- ✅ `Login` component with email/password and OAuth
- ✅ `SignUp` component with validation and OAuth
- ✅ `PasswordReset` component with email verification
- ✅ `SessionManager` component for session display
- ✅ `AuthContext` for global state management

### ✅ Security Features

- ✅ Password validation (minimum 8 characters)
- ✅ Email verification after signup
- ✅ Secure password visibility toggle
- ✅ Error handling and user feedback
- ✅ Loading states and disabled forms during submission

## Usage Examples

### Using Authentication Context

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, userProfile, sessionTime, signOut } = useAuth();

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {userProfile?.displayName}!</p>
      <p>Session time: {formatSessionTime(sessionTime)}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

### Protected Routes

```tsx
import { useRequireAuth } from "@/contexts/AuthContext";

function ProtectedPage() {
  const { user, loading } = useRequireAuth();

  if (loading) return <div>Loading...</div>;

  return <div>Protected content for {user?.email}</div>;
}
```

### Session Management

```tsx
import SessionManager from "@/app/components/ui/SessionManager";

function Header() {
  return (
    <div className="header">
      <SessionManager showDetails={true} />
    </div>
  );
}
```

## Integration with Existing Pages

To integrate authentication with your existing pages, wrap your app with the AuthProvider:

```tsx
// In your layout.tsx or _app.tsx
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

## Next Steps

1. **Add environment variables** to your `.env.local` file
2. **Configure Firebase Console** with the authentication methods
3. **Test authentication flow** with your components
4. **Integrate with existing pages** by adding AuthProvider wrapper
5. **Add protected routes** where authentication is required
6. **Customize styling** to match your Kasha theme

## API Reference

### AuthService Methods

- `createAccount(email, password, displayName)` - Create new user
- `signInWithEmail(email, password)` - Email login
- `signInWithGoogle()` - Google OAuth
- `signInWithApple()` - Apple OAuth
- `resetPassword(email)` - Send password reset
- `signOut()` - Sign out user
- `getSessionTime(uid)` - Get session duration

### AuthContext Properties

- `user` - Current Firebase user
- `userProfile` - User profile from Firestore
- `loading` - Authentication loading state
- `sessionTime` - Current session duration in milliseconds

The authentication system is now fully configured and ready to use! 🔐🎉

