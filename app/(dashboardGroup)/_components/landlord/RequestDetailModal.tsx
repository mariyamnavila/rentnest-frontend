'use client';

import Image from 'next/image';
import { Calendar, MapPin, MessageSquare, Mail } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type RequestDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: {
    id: string;
    startDate: string;
    endDate: string;
    status: string;
    message?: string | null;
    property?: {
      title: string;
      location: string;
      price: number;
      images?: string[];
    };
    tenant?: {
      name: string;
      email: string;
    };
  };
};

export function RequestDetailModal({ open, onOpenChange, request }: RequestDetailModalProps) {
  const displayImage =
    request.property?.images?.[0] ||
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-black uppercase">
            Request Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Property */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
            <div className="relative h-14 w-16 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
              <Image src={displayImage} alt={request.property?.title || ''} fill className="object-cover" unoptimized />
            </div>
            <div className="min-w-0 space-y-0.5">
              <p className="text-sm font-black text-[#222222] dark:text-white truncate">
                {request.property?.title}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <MapPin className="size-3 text-[#CFA190] shrink-0" />
                <span className="truncate">{request.property?.location}</span>
              </div>
              <p className="text-sm font-black text-[#CFA190]">
                ${request.property?.price?.toLocaleString()}<span className="text-[10px] text-gray-400 font-normal">/mo</span>
              </p>
            </div>
          </div>

          {/* Tenant */}
          <div className="p-3 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Applicant</p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#CFA190] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {request.tenant?.name?.[0]?.toUpperCase() || 'T'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#222222] dark:text-white truncate">{request.tenant?.name}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Mail className="size-3" />
                  <span className="truncate">{request.tenant?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar className="size-3.5 text-[#CFA190]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Move-in</span>
              </div>
              <p className="text-sm font-bold text-[#222222] dark:text-white">
                {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar className="size-3.5 text-[#CFA190]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Move-out</span>
              </div>
              <p className="text-sm font-bold text-[#222222] dark:text-white">
                {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Status</span>
            <StatusBadge status={request.status} />
          </div>

          {/* Message */}
          {request.message && (
            <div className="p-3 rounded-xl bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440]">
              <div className="flex items-center gap-1.5 mb-1">
                <MessageSquare className="size-3.5 text-[#CFA190]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Message</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-300 italic">
                &ldquo;{request.message}&rdquo;
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
