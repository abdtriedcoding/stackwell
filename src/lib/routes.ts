export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORGOT_PASSWORD: '/forgot-password',

  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',

  // builders (for query params)
  resetPassword: (email: string) => `/reset-password?email=${encodeURIComponent(email)}`,
  verifyEmail: (email: string) => `/verify-email?email=${encodeURIComponent(email)}`,
} as const;
