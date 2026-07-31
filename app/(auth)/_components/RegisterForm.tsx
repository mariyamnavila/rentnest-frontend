'use client';

import { startTransition, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, User, Mail, Lock, Phone, Image as ImageIcon, KeyRound, Building2, Loader2 } from 'lucide-react';

import { registerSchema } from '../_schemas/registerSchema';
import { registerAction, type RegisterState } from '../_actions/authActions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { UserRole } from '@/lib/types';

type RegisterFormData = z.infer<typeof registerSchema>;

const initialState: RegisterState = {
  success: false,
  message: '',
  errors: {},
};

export function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = (searchParams.get('role')?.toUpperCase() as UserRole) || 'TENANT';

  const [state, action, pending] = useActionState(registerAction, initialState);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: defaultRole === 'LANDLORD' ? 'LANDLORD' : 'TENANT',
      phone: '',
      profileImage: '',
    },
  });

  const currentRole = watch('role');

  useEffect(() => {
    if (!state) return;

    if (!state.message.trim()) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  const onSubmit = (data: RegisterFormData) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);
    if (data.phone) formData.append('phone', data.phone);
    if (data.profileImage) formData.append('profileImage', data.profileImage);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans">
      <div className="text-center space-y-1 mb-5">
        <h2 className="text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
          CREATE AN ACCOUNT
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400">
          Join RentNest as a tenant or landlord
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#222222] dark:text-slate-200 uppercase tracking-wide block">
          Select Your Role <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setValue('role', 'TENANT')}
            disabled={pending}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${currentRole === 'TENANT'
              ? 'border-[#CFA190] bg-[#fff5f5] text-[#CFA190] dark:bg-[#232733] shadow-xs'
              : 'border-[#e4e4e4] dark:border-[#2e3440] bg-gray-50 dark:bg-[#1a1d24] text-gray-600 dark:text-slate-300'
              }`}
          >
            <KeyRound className="size-4" />
            <span>Tenant</span>
          </button>

          <button
            type="button"
            onClick={() => setValue('role', 'LANDLORD')}
            disabled={pending}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${currentRole === 'LANDLORD'
              ? 'border-[#CFA190] bg-[#fff5f5] text-[#CFA190] dark:bg-[#232733] shadow-xs'
              : 'border-[#e4e4e4] dark:border-[#2e3440] bg-gray-50 dark:bg-[#1a1d24] text-gray-600 dark:text-slate-300'
              }`}
          >
            <Building2 className="size-4" />
            <span>Landlord</span>
          </button>
        </div>
        <p className="text-[11px] font-semibold text-rose-500">
          {errors.role?.message || state.errors?.role}
        </p>
      </div>

      {/* Full Name Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#222222] dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
          <User className="size-3.5 text-[#CFA190]" />
          <span>Full Name <span className="text-rose-500">*</span></span>
        </label>
        <Input
          {...register('name')}
          type="text"
          disabled={pending}
          placeholder="John Doe"
          className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
        />
        <p className="text-[11px] font-semibold text-rose-500">
          {errors.name?.message || state.errors?.name}
        </p>
      </div>

      {/* Email Address Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#222222] dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
          <Mail className="size-3.5 text-[#CFA190]" />
          <span>Email Address <span className="text-rose-500">*</span></span>
        </label>
        <Input
          {...register('email')}
          type="email"
          disabled={pending}
          placeholder="name@example.com"
          className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
        />
        <p className="text-[11px] font-semibold text-rose-500">
          {errors.email?.message || state.errors?.email}
        </p>
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#222222] dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
          <Lock className="size-3.5 text-[#CFA190]" />
          <span>Password <span className="text-rose-500">*</span></span>
        </label>
        <Input
          {...register('password')}
          type="password"
          disabled={pending}
          placeholder="••••••••"
          className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
        />
        <p className="text-[11px] font-semibold text-rose-500">
          {errors.password?.message || state.errors?.password}
        </p>
      </div>

      {/* Phone Number Field (Optional) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#222222] dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
          <Phone className="size-3.5 text-[#CFA190]" />
          <span>Phone Number <span className="text-gray-400 font-normal text-[10px]">(Optional)</span></span>
        </label>
        <Input
          {...register('phone')}
          type="tel"
          disabled={pending}
          placeholder="+1 (555) 000-0000"
          className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
        />
        <p className="text-[11px] font-semibold text-rose-500">
          {errors.phone?.message || state.errors?.phone}
        </p>
      </div>

      {/* Profile Image URL Field (Optional) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#222222] dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
          <ImageIcon className="size-3.5 text-[#CFA190]" />
          <span>Profile Image URL <span className="text-gray-400 font-normal text-[10px]">(Optional)</span></span>
        </label>
        <Input
          {...register('profileImage')}
          type="url"
          disabled={pending}
          placeholder="https://example.com/photo.jpg"
          className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
        />
        <p className="text-[11px] font-semibold text-rose-500">
          {errors.profileImage?.message || state.errors?.profileImage}
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl py-5 mt-2 gap-2 cursor-pointer shadow-md"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            <UserPlus className="size-4" />
            <span>Register as {currentRole === 'LANDLORD' ? 'Landlord' : 'Tenant'}</span>
          </>
        )}
      </Button>

      {/* Login Link */}
      <div className="text-center pt-3 border-t border-[#e4e4e4] dark:border-[#2e3440] mt-4">
        <p className="text-xs text-gray-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-[#CFA190] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
}
