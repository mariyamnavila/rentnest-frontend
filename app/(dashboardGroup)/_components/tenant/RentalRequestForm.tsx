'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { CalendarDays, MessageSquare, ArrowLeft, Loader2, Send, Building2, MapPin, Calculator, ShieldCheck } from 'lucide-react';

import { rentalRequestSchema } from '../../_schemas/tenant/rentalRequestSchema';
import { createRentalRequest, type RentalRequestState } from '../../_actions/tenant/rentalActions';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { toast } from 'sonner';
import type { IProperty } from '@/lib/types';

type RentalRequestFormData = z.infer<typeof rentalRequestSchema>;

type RentalRequestFormProps = {
  property: IProperty;
};

const initialState: RentalRequestState = {
  success: false,
  message: '',
  errors: {},
};

export function RentalRequestForm({ property }: RentalRequestFormProps) {
  const router = useRouter();

  const [state, action, pending] = useActionState(createRentalRequest, initialState);

  // State for Shadcn DatePickers
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RentalRequestFormData>({
    resolver: zodResolver(rentalRequestSchema),
    defaultValues: {
      propertyId: property.id,
      startDate: '',
      endDate: '',
      message: '',
    },
  });

  // Sync state with React Hook Form
  const handleStartDateChange = (d?: Date) => {
    setStartDate(d);
    setValue('startDate', d ? format(d, 'yyyy-MM-dd') : '', { shouldValidate: true });
  };

  const handleEndDateChange = (d?: Date) => {
    setEndDate(d);
    setValue('endDate', d ? format(d, 'yyyy-MM-dd') : '', { shouldValidate: true });
  };

  // Cost calculation based on monthly rate
  let totalDays = 0;
  let amount = 0;
  if (startDate && endDate) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const start = new Date(startDate);
    const end = new Date(endDate);

    totalDays = Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY);
    if (totalDays > 0) {
      const dailyRate = property.price / 30;
      amount = Number((dailyRate * totalDays).toFixed(2));
    }
  }

  useEffect(() => {
    if (!state) return;
    if (!state.message.trim()) return;

    if (state.success) {
      toast.success(state.message);
      router.push('/tenant-dashboard/requests');
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  const onSubmit = (data: RentalRequestFormData) => {
    const formData = new FormData();
    formData.append('propertyId', data.propertyId);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    if (data.message) formData.append('message', data.message);

    startTransition(() => {
      action(formData);
    });
  };

  const displayImage =
    property.images?.[0] ||
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      
      {/* Back Link */}
      <Link
        href={`/properties/${property.id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-[#CFA190] transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="size-4" />
        <span>Back to Property Details</span>
      </Link>

      {/* Property Preview Card */}
      <Card className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-md rounded-3xl overflow-hidden">
        <CardContent className="p-5 flex flex-col sm:flex-row items-center gap-5">
          <div className="relative h-24 w-full sm:w-32 rounded-2xl overflow-hidden shrink-0 border border-gray-100 dark:border-slate-800">
            <Image src={displayImage} alt={property.title} fill className="object-cover" unoptimized />
            <Badge className="absolute top-2 left-2 bg-black/70 text-white font-bold text-[9px] uppercase">
              {property.propertyType || property.category?.name || 'Rental'}
            </Badge>
          </div>

          <div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-black text-[#222222] dark:text-white truncate">
              {property.title}
            </h3>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-gray-500 dark:text-slate-400">
              <MapPin className="size-3.5 text-[#CFA190] shrink-0" />
              <span className="truncate">{property.location}</span>
            </div>
            <div className="pt-1 flex items-baseline justify-center sm:justify-start gap-1">
              <span className="text-xl font-black text-[#CFA190]">${property.price.toLocaleString()}</span>
              <span className="text-xs text-gray-400">/ month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Request Form */}
      <Card className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xl rounded-3xl">
        <CardHeader className="p-6 sm:p-8 pb-4 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase w-fit">
            <Building2 className="size-3.5" />
            <span>Rental Application</span>
          </div>
          <CardTitle className="text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            SUBMIT LEASE REQUEST
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            Select your move-in & move-out dates and include an optional message for the landlord.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6 sm:p-8 pt-0 space-y-6">
            <input type="hidden" {...register('propertyId')} />
            <input type="hidden" {...register('startDate')} />
            <input type="hidden" {...register('endDate')} />

            {/* Date Pickers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Move-in Date Picker */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                  <CalendarDays className="size-3.5 text-[#CFA190]" />
                  <span>Move-in Date <span className="text-rose-500">*</span></span>
                </label>
                <DatePicker
                  date={startDate}
                  setDate={handleStartDateChange}
                  placeholder="Select move-in date"
                  minDate={new Date()}
                  disabled={pending}
                />
                {(errors.startDate?.message || state.errors?.startDate) && (
                  <p className="text-[11px] font-semibold text-rose-500 mt-1">
                    {errors.startDate?.message || state.errors?.startDate}
                  </p>
                )}
              </div>

              {/* Move-out Date Picker */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                  <CalendarDays className="size-3.5 text-[#CFA190]" />
                  <span>Move-out Date <span className="text-rose-500">*</span></span>
                </label>
                <DatePicker
                  date={endDate}
                  setDate={handleEndDateChange}
                  placeholder="Select move-out date"
                  minDate={startDate || new Date()}
                  disabled={pending}
                />
                {(errors.endDate?.message || state.errors?.endDate) && (
                  <p className="text-[11px] font-semibold text-rose-500 mt-1">
                    {errors.endDate?.message || state.errors?.endDate}
                  </p>
                )}
              </div>

            </div>

            {/* Cost Banner (Monthly Rate Basis) */}
            {amount > 0 && (
              <div className="p-4 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Calculator className="size-5 text-[#CFA190] shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-[#222222] dark:text-white block">
                      Rental Duration: {totalDays} {totalDays === 1 ? 'Day' : 'Days'}
                    </span>
                    <span className="text-[10px] text-gray-500 block">
                      Listed rate: ${property.price.toLocaleString()}/month
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-[#CFA190]">${amount.toLocaleString()}</span>
                  <span className="text-[10px] text-gray-400 block font-semibold">Total Estimated Rent</span>
                </div>
              </div>
            )}

            {/* Message Field */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                <MessageSquare className="size-3.5 text-[#CFA190]" />
                <span>Message to Landlord <span className="text-gray-400 font-normal text-[10px]">(Optional)</span></span>
              </label>
              <textarea
                {...register('message')}
                disabled={pending}
                rows={4}
                placeholder="Introduce yourself and explain why you'd like to rent this property..."
                className="w-full rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] bg-transparent p-3.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CFA190]/50 resize-none font-sans"
              />
              {(errors.message?.message || state.errors?.message) && (
                <p className="text-[11px] font-semibold text-rose-500 mt-1">
                  {errors.message?.message || state.errors?.message}
                </p>
              )}
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-[#232733] border border-gray-200 dark:border-slate-800 text-xs text-gray-500">
              <ShieldCheck className="size-4 text-[#CFA190] shrink-0" />
              <span>No payment required now. You will only pay if the landlord approves your application.</span>
            </div>

          </CardContent>

          <CardFooter className="p-6 sm:p-8 pt-0">
            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl py-6 cursor-pointer text-sm gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Submit Rental Application</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

    </div>
  );
}
