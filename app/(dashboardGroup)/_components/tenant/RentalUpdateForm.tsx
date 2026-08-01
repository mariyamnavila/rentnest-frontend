'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { CalendarDays, MessageSquare, ArrowLeft, Loader2, Save, Building2, ShieldCheck } from 'lucide-react';

import { rentalUpdateSchema } from '../../_schemas/tenant/rentalUpdateSchema';
import { updateRentalRequest, type RentalRequestState } from '../../_actions/tenant/rentalActions';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { toast } from 'sonner';

type RentalUpdateFormData = z.infer<typeof rentalUpdateSchema>;

type RentalUpdateFormProps = {
  rentalId: string;
  startDate: string;
  endDate: string;
  message?: string | null;
};

const initialState: RentalRequestState = {
  success: false,
  message: '',
  errors: {},
};

export function RentalUpdateForm({ rentalId, startDate: initialStartDate, endDate: initialEndDate, message }: RentalUpdateFormProps) {
  const router = useRouter();

  const boundAction = updateRentalRequest.bind(null, rentalId);
  const [state, action, pending] = useActionState(boundAction, initialState);

  // State for Shadcn DatePickers
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialStartDate ? new Date(initialStartDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialEndDate ? new Date(initialEndDate) : undefined
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RentalUpdateFormData>({
    resolver: zodResolver(rentalUpdateSchema),
    defaultValues: {
      startDate: initialStartDate ? initialStartDate.split('T')[0] : '',
      endDate: initialEndDate ? initialEndDate.split('T')[0] : '',
      message: message || '',
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

  useEffect(() => {
    if (!state) return;
    if (!state.message.trim()) return;

    if (state.success) {
      toast.success(state.message);
      router.push(`/tenant-dashboard/requests/${rentalId}`);
    } else {
      toast.error(state.message);
    }
  }, [state, router, rentalId]);

  const onSubmit = (data: RentalUpdateFormData) => {
    const formData = new FormData();
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    if (data.message) formData.append('message', data.message);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">

      {/* Back Navigation Link */}
      <Link
        href={`/tenant-dashboard/requests/${rentalId}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-[#CFA190] transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="size-4" />
        <span>Back to Application Details</span>
      </Link>

      {/* Main Edit Form Card */}
      <Card className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xl rounded-3xl">
        <CardHeader className="p-6 pb-2 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase w-fit">
            <Building2 className="size-3.5" />
            <span>Update Application</span>
          </div>
          <CardTitle className="text-2xl font-black text-[#222222] mb-0 dark:text-white uppercase tracking-tight">
            EDIT RENTAL DATES
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            Only applications in PENDING status can be edited before landlord review.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6 pt-0 space-y-6">
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
                placeholder="Update your message to the landlord..."
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
              <span>Saving changes will update your pending application details for landlord review.</span>
            </div>

          </CardContent>

          <CardFooter className="p-6 pt-0 border-t-0">
            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl py-6 cursor-pointer text-sm gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  <span>Update Application</span>
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

    </div>
  );
}
