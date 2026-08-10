'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { loginSchema } from '../_schemas/loginSchema';
import { registerSchema } from '../_schemas/registerSchema';
import z from 'zod';

export type LoginState = {
  success: boolean;
  message: string;
  role?: "TENANT" | "LANDLORD" | "ADMIN";
  errors?: Record<string, string>;
};

export type RegisterState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export type SocialLoginPayload = {
  email: string;
  name: string;
  profileImage?: string;
  provider: "GOOGLE";
  providerId: string;
  role?: "TENANT" | "LANDLORD" | "ADMIN";
};

export async function loginAction(
  redirectTo: string,
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {

  const values = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validated = loginSchema.safeParse(values);

  if (!validated.success) {

    const tree = z.treeifyError(validated.error);

    const errors = {
      email: tree.properties?.email?.errors[0],
      password: tree.properties?.password?.errors[0],
    };

    return {
      success: false,
      message: 'Please fix the validation errors.',
      errors: errors as Record<string, string>,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validated.data),
    cache: 'no-store',
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message: result.message,
    };
  }

  const cookieStore = await cookies();

  cookieStore.set('accessToken', result.data.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  });

  cookieStore.set('refreshToken', result.data.refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

  if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
    redirect(redirectTo)
  }

  return {
    success: true,
    message: "Login successful",
    role: decodedToken.role,
  };

}

export async function socialLoginAction(
  payload: SocialLoginPayload
): Promise<LoginState> {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/social-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Social login failed.',
      };
    }

    const cookieStore = await cookies();

    cookieStore.set('accessToken', result.data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set('refreshToken', result.data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    return {
      success: true,
      message: 'Social login successful!',
      role: decodedToken.role,
    };
  } catch (error) {
    // console.error('Social login action error:', error);
    return {
      success: false,
      message: 'Server error during social login.',
    };
  }
}

export async function registerAction(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {

  const values = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    phone: formData.get('phone') || undefined,
    profileImage: formData.get('profileImage') || undefined,
  };

  const validated = registerSchema.safeParse(values);

  if (!validated.success) {
    const tree = z.treeifyError(validated.error);

    const errors = {
      name: tree.properties?.name?.errors[0],
      email: tree.properties?.email?.errors[0],
      password: tree.properties?.password?.errors[0],
      role: tree.properties?.role?.errors[0],
      phone: tree.properties?.phone?.errors[0],
      profileImage: tree.properties?.profileImage?.errors[0],
    };

    return {
      success: false,
      message: 'Please fix the validation errors.',
      errors: errors as Record<string, string>,
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validated.data),
    cache: 'no-store',
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    return {
      success: false,
      message: result.message || 'Registration failed. Please try again.',
    };
  }

  redirect('/login');

}