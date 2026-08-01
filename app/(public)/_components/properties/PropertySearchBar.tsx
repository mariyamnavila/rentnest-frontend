"use client";

import { useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function PropertySearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("searchTerm", value);
      } else {
        params.delete("searchTerm");
      }

      params.delete("page");

      router.replace(`${pathname}?${params.toString()}`);
    }, 500);
  };

  const handleClear = () => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    const params = new URLSearchParams(searchParams.toString());
    params.delete("searchTerm");
    params.delete("page");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />

      <Input
        defaultValue={searchParams.get("searchTerm") ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search by title, location, or description..."
        className="pl-10 pr-10 py-5 rounded-xl border-[#e4e4e4] dark:border-[#2e3440] text-sm bg-white dark:bg-[#232733]"
      />

      {searchParams.get("searchTerm") && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2e3440] transition-colors cursor-pointer"
        >
          <X className="size-3.5 text-gray-400" />
        </button>
      )}
    </div>
  );
}