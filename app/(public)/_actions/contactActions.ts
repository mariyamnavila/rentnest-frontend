'use server';

import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/schemas/contactSchema';

export type ContactActionState = {
  success: boolean;
  message: string;
  emailSentTo?: string;
  errors?: Record<string, string[]>;
};

export async function sendContactEmailAction(
  prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  const validation = contactSchema.safeParse({ name, email, subject, message });

  if (!validation.success) {
    return {
      success: false,
      message: 'Validation error. Please check your form input.',
      errors: validation.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const targetEmail =
    process.env.CONTACT_RECEIVER_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    'support@rentnest.com';

  try {
    const isSmtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

    if (isSmtpConfigured) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name} (via RentNest)" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: targetEmail,
        subject: `[RentNest Contact] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #222; max-width: 600px; border: 1px solid #e4e4e4; border-radius: 16px;">
            <h2 style="color: #CFA190; margin-bottom: 8px; text-transform: uppercase;">New RentNest Contact Message</h2>
            <p style="font-size: 14px; margin: 4px 0;"><strong>Sender Name:</strong> ${name}</p>
            <p style="font-size: 14px; margin: 4px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="font-size: 14px; margin: 4px 0;"><strong>Subject:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <p style="font-size: 14px; font-weight: bold; margin-bottom: 8px;">Message Content:</p>
            <div style="white-space: pre-wrap; background-color: #f7f7f7; padding: 16px; border-radius: 12px; font-size: 14px; color: #444; border: 1px solid #eee;">${message}</div>
          </div>
        `,
      });

      return {
        success: true,
        message: `Your email was successfully delivered!`,
        emailSentTo: targetEmail,
      };
    }

    // Fallback when SMTP is not configured
    return {
      success: true,
      message: `Form saved! Opening your mail app to complete sending to ${targetEmail}...`,
      emailSentTo: targetEmail,
    };
  } catch (error) {
    console.error('Contact email error:', error);
    return {
      success: false,
      message: 'Error sending email. Please try again or check SMTP configuration.',
    };
  }
}
