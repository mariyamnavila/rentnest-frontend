'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contactSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send, Mail, User, Tag, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      // Simulate submission network call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`Thank you ${data.name}! Your message has been sent successfully.`);
      reset();
    } catch (error) {
      console.error('Contact form submit error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans">
      {/* Full Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-name"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200"
        >
          <User className="size-3.5 text-[#CFA190]" />
          Full Name <span className="text-rose-500">*</span>
        </label>
        <Input
          id="contact-name"
          {...register('name')}
          disabled={loading}
          placeholder="e.g. John Doe"
          className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
        />
        {errors.name && (
          <p className="text-[11px] font-semibold text-rose-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-email"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200"
        >
          <Mail className="size-3.5 text-[#CFA190]" />
          Email Address <span className="text-rose-500">*</span>
        </label>
        <Input
          id="contact-email"
          type="email"
          {...register('email')}
          disabled={loading}
          placeholder="name@example.com"
          className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
        />
        {errors.email && (
          <p className="text-[11px] font-semibold text-rose-500">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-subject"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200"
        >
          <Tag className="size-3.5 text-[#CFA190]" />
          Subject <span className="text-rose-500">*</span>
        </label>
        <Input
          id="contact-subject"
          {...register('subject')}
          disabled={loading}
          placeholder="e.g. Inquiry regarding rental booking"
          className="rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
        />
        {errors.subject && (
          <p className="text-[11px] font-semibold text-rose-500">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label
          htmlFor="contact-message"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200"
        >
          <MessageSquare className="size-3.5 text-[#CFA190]" />
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="contact-message"
          {...register('message')}
          disabled={loading}
          rows={4}
          placeholder="How can we help you?"
          className="w-full rounded-xl border border-[#e4e4e4] dark:border-[#2e3440] bg-transparent px-3 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CFA190]/50 resize-none"
        />
        {errors.message && (
          <p className="text-[11px] font-semibold text-rose-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl py-6 cursor-pointer text-sm gap-2 shadow-md transition-transform hover:-translate-y-0.5"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="size-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
