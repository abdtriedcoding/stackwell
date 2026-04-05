import { requireActionCtx } from '@convex-dev/better-auth/utils';
import type { GenericCtx } from '@convex-dev/better-auth/utils';
import type { DataModel } from '../_generated/dataModel';
import type { EmailOTPOptions } from 'better-auth/plugins';
import { resend } from '../lib/resend';

type OTPType = Parameters<EmailOTPOptions['sendVerificationOTP']>[0]['type'];

const FROM_EMAIL = 'onboarding@resend.dev';
const TO_EMAIL = 'delivered@resend.dev';

const subjectMap: Record<OTPType, string> = {
  'sign-in': 'Your sign-in code',
  'email-verification': 'Verify your email',
  'forget-password': 'Reset your password',
  'change-email': 'Verify your new email',
};

export async function sendOtpEmailDirect(
  ctx: GenericCtx<DataModel>,
  to: string,
  otp: string,
  type: OTPType,
): Promise<void> {
  await resend.sendEmail(requireActionCtx(ctx), {
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: subjectMap[type],
    html: `<p>Your verification code is: <strong>${otp}</strong></p>`,
  });
}

export async function sendEmail(
  ctx: GenericCtx<DataModel> | unknown,
  opts: { to: string; subject: string; text: string },
): Promise<void> {
  await resend.sendEmail(requireActionCtx(ctx as GenericCtx<DataModel>), {
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: opts.subject,
    text: opts.text,
  });
}
