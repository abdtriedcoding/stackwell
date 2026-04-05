# Auth Feature Documentation

## Feature Status

| Layer    | Status |
| -------- | ------ |
| Frontend | ✅     |
| Backend  | ✅     |

---

## Overview

Complete authentication system using **Better Auth** with Convex as the backend adapter.

Features:

- Email/password registration with OTP email verification
- Email/password login
- Password recovery via OTP
- Google OAuth (social login)
- Session management via cookies
- Auto sign-in after email verification

Stack: Next.js (App Router), shadcn/ui, React Hook Form, Zod, Better Auth, Convex.

---

## Tech Stack

| Layer         | Technology                                  |
| ------------- | ------------------------------------------- |
| Frontend Auth | Better Auth React client (`auth-client.ts`) |
| Backend Auth  | Better Auth + Convex adapter                |
| Database      | Convex (via Better Auth adapter)            |
| Email         | Resend (OTP delivery)                       |

---

## User Flows

### Sign Up Flow

```
Sign Up Form → Submit → OTP Email Sent → Verify Email (OTP) → Auto Sign In → Home
```

1. User submits name, email, password
2. `authClient.signUp.email()` creates account (email verification required)
3. OTP sent to email via `sendVerificationOTP`
4. User redirected to `/verify-email?email=...`
5. User enters 6-digit OTP
6. `authClient.emailOtp.verifyEmail()` verifies and auto signs in
7. User redirected to home

### Sign In Flow

```
Sign In Form → Submit → (Email Verification Check) → Home
```

1. User submits email, password
2. `authClient.signIn.email()` authenticates
3. If 403 error (unverified), redirect to email verification
4. On success, redirect to home

### Google Sign In Flow

```
Google Button → OAuth Redirect → Home
```

1. User clicks "Continue with Google"
2. `authClient.signIn.social({ provider: 'google' })` initiates OAuth
3. User redirected to Google consent screen
4. On success, redirect to home

### Forgot Password Flow

```
Forgot Password → Email Sent → Reset Password (OTP) → Success → Sign In
```

1. User submits email
2. `authClient.emailOtp.requestPasswordReset()` sends OTP
3. User redirected to `/reset-password?email=...`
4. User enters OTP + new password
5. `authClient.emailOtp.resetPassword()` updates password
6. Success message, redirect to sign in

### Email Verification (Resend)

```
Verify Email View → Enter OTP → Success → Home
```

1. User on `/verify-email?email=...`
2. OTP input accepts 6 digits
3. Submit calls `authClient.emailOtp.verifyEmail()`
4. On success: toast + redirect to home
5. Resend button calls `authClient.emailOtp.sendVerificationOtp({ email, type: 'email-verification' })`

---

## Pages / Routes

| Route              | Purpose                | View File                                          |
| ------------------ | ---------------------- | -------------------------------------------------- |
| `/sign-up`         | User registration      | `src/features/auth/views/signup-view.tsx`          |
| `/sign-in`         | User login             | `src/features/auth/views/signin-view.tsx`          |
| `/forgot-password` | Request password reset | `src/features/auth/views/forgot-password-view.tsx` |
| `/reset-password`  | Set new password       | `src/features/auth/views/reset-password-view.tsx`  |
| `/verify-email`    | OTP verification       | `src/features/auth/views/verify-email-view.tsx`    |

---

## Backend Configuration

**File**: `convex/betterAuth/auth.ts`

```typescript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: true,  // Users must verify email before sign in
  onExistingUserSignUp: async ({ user }) => {
    // Sends warning email if someone tries to sign up with existing email
  },
},
emailVerification: {
  autoSignInAfterVerification: true,  // Auto sign in after email verification
},
plugins: [
  emailOTP({
    overrideDefaultEmailVerification: true,
    sendVerificationOnSignUp: true,
    sendVerificationOTP({ email, otp, type }) {
      // Sends OTP email via Resend
    },
  }),
  convex({ authConfig }),
],
```

**Email OTP Types**: `sign-in`, `email-verification`, `forget-password`, `change-email`

---

## Frontend Client

**File**: `src/lib/auth-client.ts`

```typescript
import { createAuthClient } from 'better-auth/react';
import { convexClient } from '@convex-dev/better-auth/client/plugins';
import { emailOTPClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  plugins: [convexClient(), emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
```

### Available Methods

| Method                                             | Usage                        |
| -------------------------------------------------- | ---------------------------- |
| `authClient.signUp.email()`                        | Email/password registration  |
| `authClient.signIn.email()`                        | Email/password login         |
| `authClient.signIn.social({ provider: 'google' })` | Google OAuth                 |
| `authClient.emailOtp.verifyEmail()`                | Verify email OTP             |
| `authClient.emailOtp.sendVerificationOtp()`        | Resend verification OTP      |
| `authClient.emailOtp.requestPasswordReset()`       | Request password reset OTP   |
| `authClient.emailOtp.resetPassword()`              | Reset password with OTP      |
| `authClient.useSession()`                          | React hook for session state |
| `authClient.getSession()`                          | Get session (server/client)  |
| `authClient.signOut()`                             | Sign out                     |

---

## Components & Architecture

### Feature Structure

```
src/features/auth/
├── components/          # Reusable UI components
│   ├── auth-card.tsx
│   ├── google-button.tsx
│   ├── form-field.tsx
│   ├── password-field.tsx
│   ├── password-input.tsx
│   └── otp-input.tsx
├── views/              # Page-level compositions
│   ├── signin-view.tsx
│   ├── signup-view.tsx
│   ├── forgot-password-view.tsx
│   ├── reset-password-view.tsx
│   └── verify-email-view.tsx
├── validation/         # Zod schemas + inferred types
│   └── schemas.ts
└── types/              # App-level interfaces
    └── index.ts
```

### Components

| Component       | File                                              | Purpose                                  |
| --------------- | ------------------------------------------------- | ---------------------------------------- |
| `AuthCard`      | `src/features/auth/components/auth-card.tsx`      | Card wrapper for auth forms              |
| `GoogleButton`  | `src/features/auth/components/google-button.tsx`  | Google OAuth button (fully functional)   |
| `FormField`     | `src/features/auth/components/form-field.tsx`     | Text input with RHF Controller           |
| `PasswordField` | `src/features/auth/components/password-field.tsx` | Password input with RHF Controller       |
| `PasswordInput` | `src/features/auth/components/password-input.tsx` | Input with eye/eye-off visibility toggle |
| `OTPInput`      | `src/features/auth/components/otp-input.tsx`      | 6-digit OTP input using shadcn InputOTP  |

### Architecture Pattern

- **Views**: Import components, handle state, compose page layout
- **Components**: Reusable, use React Hook Form Controller for form integration
- **Page files**: Thin wrappers that import and render views

---

## Validation Rules

### Sign Up

| Field            | Rules                                |
| ---------------- | ------------------------------------ |
| Name             | Required, non-empty string           |
| Email            | Valid email format (using Zod email) |
| Password         | Min 8 chars, 1 uppercase, 1 number   |
| Confirm Password | Must match password                  |

### Sign In

| Field    | Rules              |
| -------- | ------------------ |
| Email    | Valid email format |
| Password | Required           |

### Forgot Password

| Field | Rules              |
| ----- | ------------------ |
| Email | Valid email format |

### Reset Password

| Field            | Rules                              |
| ---------------- | ---------------------------------- |
| OTP              | Exactly 6 digits                   |
| Password         | Min 8 chars, 1 uppercase, 1 number |
| Confirm Password | Must match password                |

### OTP Verification

| Field | Rules            |
| ----- | ---------------- |
| OTP   | Exactly 6 digits |

---

## UX & Behavior

### Form Patterns

- All forms use React Hook Form with Zod resolver
- Inline error messages via shadcn `FieldError`
- Submit buttons show loading state and are disabled during submission
- `FormProvider` wraps all forms for context sharing
- Loading type tracking (`idle` | `google` | `credentials`) for Google vs credentials flows

### Password Fields

- Toggle visibility with Eye/EyeOff icons (Lucide)
- `PasswordInput` handles visibility state internally
- `PasswordField` wraps `PasswordInput` with RHF Controller integration

### OTP Input

- 6 individual digit slots using shadcn `InputOTP`
- Numeric input only via `REGEXP_ONLY_DIGITS` pattern
- Auto-focus navigation between slots (handled by shadcn InputOTP)
- Masked email display using `maskEmail()` utility

### Error Handling

- Toast notifications for success/error feedback (`sonner`)
- 403 status on sign in redirects to email verification
- Invalid/expired reset links show "Invalid reset request" message

---

## Environment Variables

Required in `.env.local`:

| Variable               | Description                  |
| ---------------------- | ---------------------------- |
| `BETTER_AUTH_SECRET`   | Secret key for Better Auth   |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID       |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret   |
| `SITE_URL`             | Base URL for auth redirects  |
| `RESEND_API_KEY`       | Resend API key for email OTP |

---

## Session Handling

Sessions are managed by Better Auth:

- **Storage**: Cookies (handled by Better Auth)
- **Server-side**: `getSession()` to retrieve session
- **Client-side**: `useSession()` React hook
- **Convex integration**: `convex()` plugin syncs sessions with Convex backend

### Protected Routes

Route protection is handled via Better Auth session checking. Components should use `useSession()` to conditionally render protected content.

---

## Current Implementation Notes

- Email OTP is currently sent to a fixed `delivered@resend.dev` address for development (see `convex/betterAuth/email.ts`)
- Password reset and email verification use the same OTP flow
- Google OAuth redirect URI must be configured in Google Cloud Console

---

## Last Updated

Based on codebase analysis of `src/features/auth/` and `convex/betterAuth/`
