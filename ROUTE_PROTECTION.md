# Route Protection System for Kasha App

## 🔐 Overview

This system provides comprehensive route protection to block access to all pages for unauthenticated users and automatically redirect them to the login page. It also handles session expiration and provides appropriate user feedback.

## 🚀 Features

- ✅ **Automatic Route Protection**: All routes are protected by default
- ✅ **Session Expiration**: 24-hour session timeout with automatic logout
- ✅ **Smart Redirects**: Redirects to login with appropriate messages
- ✅ **Loading States**: Shows loading spinners during authentication checks
- ✅ **Middleware Protection**: Server-level route protection
- ✅ **Component-Level Protection**: Flexible protection at component level

## 🛠️ Implementation Methods

### Method 1: Using ProtectedRoute Component (Recommended)

Wrap any page component with the `ProtectedRoute` component:

```tsx
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";

const MyPage = () => {
  return (
    <ProtectedRoute>
      <div>Your protected content here</div>
    </ProtectedRoute>
  );
};
```

### Method 2: Using withAuth HOC

Wrap page components with the `withAuth` higher-order component:

```tsx
import { withAuth } from "@/app/components/auth/withAuth";

const MyPage = () => {
  return <div>Your protected content here</div>;
};

export default withAuth(MyPage);
```

### Method 3: Using useRequireAuth Hook

Use the hook directly in your component:

```tsx
import { useRequireAuth } from "@/contexts/AuthContext";

const MyPage = () => {
  const { user, loading } = useRequireAuth();

  if (loading) return <div>Loading...</div>;

  return <div>Welcome, {user?.email}!</div>;
};
```

## 📁 Files Created

### 1. `ProtectedRoute.tsx`

- Main component for wrapping protected content
- Handles authentication checks and redirects
- Shows loading states during checks

### 2. `withAuth.tsx`

- Higher-order component for easy page protection
- Can be applied to any component

### 3. `middleware.ts`

- Next.js middleware for server-level protection
- Handles route protection before pages render
- Manages public vs. protected routes

## 🔧 Configuration

### Session Timeout

The default session timeout is set to **24 hours**. You can modify this in:

```tsx
// In ProtectedRoute.tsx and withAuth.tsx
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
```

### Public Routes

Configure public routes in `middleware.ts`:

```tsx
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/api/auth",
];
```

## 📱 Usage Examples

### Protecting Individual Pages

```tsx
// dashboard/page.tsx
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <AppLayout>{/* Your dashboard content */}</AppLayout>
    </ProtectedRoute>
  );
};
```

### Protecting Multiple Pages

```tsx
// wallets/page.tsx
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";

const WalletsPage = () => {
  return (
    <ProtectedRoute>
      <AppLayout>{/* Your wallets content */}</AppLayout>
    </ProtectedRoute>
  );
};
```

### Conditional Protection

```tsx
// Some pages might not need protection
<ProtectedRoute requireAuth={false}>
  <PublicPage />
</ProtectedRoute>
```

## 🔄 Redirect Behavior

### Unauthenticated Users

- **Destination**: `/login`
- **Behavior**: Immediate redirect with loading state
- **Message**: "Please log in to continue"

### Expired Sessions

- **Destination**: `/login?expired=true`
- **Behavior**: Automatic logout + redirect
- **Message**: "Your session has expired. Please log in again."

### Already Authenticated Users

- **On `/login` or `/signup`**: Redirected to `/dashboard`
- **Behavior**: Prevents authenticated users from accessing auth pages

## 🎨 Loading States

The system provides consistent loading states:

```tsx
// During authentication check
<div className="min-h-screen bg-[#2a004a] flex items-center justify-center">
  <div className="text-center">
    <FontAwesomeIcon icon={faSpinner} className="text-[#d4af37] text-4xl animate-spin mb-4" />
    <p className="text-[#e0e0e0] text-lg">Loading...</p>
  </div>
</div>

// During redirect
<div className="min-h-screen bg-[#2a004a] flex items-center justify-center">
  <div className="text-center">
    <FontAwesomeIcon icon={faSpinner} className="text-[#d4af37] text-4xl animate-spin mb-4" />
    <p className="text-[#e0e0e0] text-lg">Redirecting...</p>
  </div>
</div>
```

## 🚨 Error Handling

### Authentication Errors

- Invalid credentials
- Network issues
- Firebase service errors

### Session Errors

- Expired sessions
- Invalid tokens
- Corrupted user data

### Redirect Errors

- Invalid redirect URLs
- Loop prevention
- Fallback handling

## 🔒 Security Features

### Token Validation

- Firebase ID token verification
- Automatic token refresh
- Secure cookie handling

### Route Validation

- Server-side route protection
- Client-side authentication checks
- Double-layer security

### Session Management

- Real-time session monitoring
- Automatic expiration handling
- Secure logout process

## 📋 Implementation Checklist

### For Each Protected Page:

1. ✅ Import `ProtectedRoute` component
2. ✅ Wrap page content with `<ProtectedRoute>`
3. ✅ Ensure proper component hierarchy
4. ✅ Test authentication flow
5. ✅ Verify redirect behavior

### For Public Pages:

1. ✅ Add to `publicRoutes` array in middleware
2. ✅ Use `requireAuth={false}` if needed
3. ✅ Test access without authentication

### For Auth Pages:

1. ✅ Ensure they're in `publicRoutes`
2. ✅ Handle expired session parameters
3. ✅ Test redirect when already authenticated

## 🧪 Testing

### Test Scenarios:

1. **Unauthenticated Access**: Try accessing protected pages without login
2. **Session Expiration**: Wait for session timeout or manually expire
3. **Redirect Loops**: Ensure no infinite redirects occur
4. **Loading States**: Verify loading spinners appear correctly
5. **Error Messages**: Check appropriate error messages display

### Test Commands:

```bash
# Start development server
npm run dev

# Test protected routes
# 1. Open browser in incognito mode
# 2. Try accessing /dashboard directly
# 3. Verify redirect to /login
# 4. Login and verify access granted
```

## 🚀 Deployment

### Production Considerations:

1. **Environment Variables**: Ensure Firebase config is set
2. **Domain Configuration**: Update authorized domains in Firebase
3. **HTTPS**: Required for production authentication
4. **Cookie Settings**: Configure secure cookie options
5. **Error Monitoring**: Set up error tracking for auth failures

## 🔧 Troubleshooting

### Common Issues:

#### "useAuth must be used within an AuthProvider"

- **Cause**: Missing AuthProvider wrapper
- **Solution**: Ensure AuthProvider wraps your app in layout.tsx

#### Infinite Redirects

- **Cause**: Incorrect route configuration
- **Solution**: Check middleware.ts and public routes

#### Session Not Persisting

- **Cause**: Cookie or storage issues
- **Solution**: Verify Firebase auth persistence settings

#### Loading States Not Showing

- **Cause**: Component not properly wrapped
- **Solution**: Ensure ProtectedRoute is correctly implemented

## 📚 Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Next.js Middleware Docs](https://nextjs.org/docs/advanced-features/middleware)
- [React Context API](https://react.dev/reference/react/createContext)

---

## 🎯 Quick Start

1. **Wrap your pages**:

   ```tsx
   <ProtectedRoute>
     <YourPageContent />
   </ProtectedRoute>
   ```

2. **Test the flow**:

   - Try accessing protected pages without login
   - Verify redirects work correctly
   - Test session expiration

3. **Customize as needed**:
   - Adjust session timeout
   - Modify public routes
   - Customize loading states

Your Kasha app is now fully protected! 🔐✨

