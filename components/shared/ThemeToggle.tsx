'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`size-9 rounded-xl border border-[#e4e4e4] dark:border-[#2e3440] opacity-50 ${className}`}
        disabled
      >
        <Sun className="size-4 text-gray-400" />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      aria-label="Toggle theme mode"
      className={`size-9 rounded-xl border border-[#e4e4e4] dark:border-[#2e3440] bg-white dark:bg-[#1a1d24] text-[#222222] dark:text-slate-200 hover:bg-[#fff5f5] dark:hover:bg-[#232733] hover:text-[#CFA190] dark:hover:text-[#CFA190] transition-all cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="size-4.5 text-amber-400 animate-in spin-in-90 duration-300" />
      ) : (
        <Moon className="size-4.5 text-slate-700 animate-in spin-in-90 duration-300" />
      )}
    </Button>
  );
}
