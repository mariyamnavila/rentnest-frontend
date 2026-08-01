'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = {
  date?: Date;
  setDate: (date?: Date) => void;
  placeholder?: string;
  minDate?: Date;
  disabled?: boolean;
};

export function DatePicker({
  date,
  setDate,
  placeholder = 'Pick a date',
  minDate,
  disabled = false,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-semibold rounded-xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm cursor-pointer',
            !date && 'text-gray-400 dark:text-slate-500'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-[#CFA190]" />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-2xl shadow-xl border-[#e4e4e4] dark:border-[#2e3440]" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={minDate ? (d) => d < minDate : undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
