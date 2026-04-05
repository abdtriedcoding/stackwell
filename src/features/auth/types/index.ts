export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export interface OTPInputProps {
  name: string;
  disabled?: boolean;
  resendButton?: React.ReactNode;
}

export type VerificationLoadingState = 'idle' | 'verifying' | 'resending';

export type AuthLoadingType = 'idle' | 'google' | 'credentials';

export type ResetPasswordLoadingState = 'idle' | 'submitting' | 'resending';
