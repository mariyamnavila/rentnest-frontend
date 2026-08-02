'use client';

import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Loader2, Lock, Mail } from 'lucide-react';

import { loginSchema } from '../_schemas/loginSchema';
import { loginAction, type LoginState } from '../_actions/authActions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

type LoginFormData = z.infer<typeof loginSchema>;

const initialState: LoginState = {
  success: false,
  message: '',
  errors: {},
};

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '';
  const queryClient = useQueryClient();
  const router = useRouter();

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!state.message) return;

    if (!state.message.trim()) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
      return;
    }

    const updateAuth = async () => {
      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });

      await queryClient.refetchQueries({
        queryKey: ["auth", "me"],
      });

      if (state.role === "TENANT") {
        router.replace("/tenant-dashboard");
      } else if (state.role === "LANDLORD") {
        router.replace("/landlord-dashboard");
      } else {
        router.replace("/admin-dashboard");
      }

      router.refresh();
    };

    updateAuth();
  }, [state, queryClient, router]);

  const onSubmit = (data: LoginFormData) => {
    const formData = new FormData();

    formData.append('email', data.email);
    formData.append('password', data.password);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans">
      <div className="mb-6 space-y-1 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tight text-[#222222] dark:text-white">
          WELCOME BACK
        </h2>

        <p className="text-xs text-gray-500 dark:text-slate-400">
          Sign in to access your RentNest account
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
          <Mail className="size-3.5 text-[#CFA190]" />
          Email Address
        </label>

        <Input
          {...register('email')}
          type="email"
          disabled={pending}
          placeholder="name@example.com"
          className="rounded-xl border-[#e4e4e4] py-5 text-sm dark:border-[#2e3440]"
        />

        <p className="mt-1 text-[11px] font-semibold text-rose-500">
          {errors.email?.message || state.errors?.email}
        </p>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
            <Lock className="size-3.5 text-[#CFA190]" />
            Password
          </label>

          {/* <span className="cursor-pointer text-[11px] text-[#CFA190] hover:underline">
            Forgot password?
          </span> */}
        </div>

        <Input
          {...register('password')}
          type="password"
          disabled={pending}
          placeholder="••••••"
          className="rounded-xl border-[#e4e4e4] py-5 text-sm dark:border-[#2e3440]"
        />

        <p className="mt-1 text-[11px] font-semibold text-rose-500">
          {errors.password?.message || state.errors?.password}
        </p>
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="mt-2 w-full cursor-pointer gap-2 rounded-xl bg-[#CFA190] py-5 font-bold text-white shadow-md hover:bg-[#C08E82]"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Logging In...
          </>
        ) : (
          <>
            <LogIn className="size-4" />
            Login
          </>
        )}
      </Button>

      <div className="mt-4 border-t border-[#e4e4e4] pt-3 text-center dark:border-[#2e3440]">
        <p className="text-xs text-gray-500 dark:text-slate-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-bold text-[#CFA190] hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </form>
  );
}