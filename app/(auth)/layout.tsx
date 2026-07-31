import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/shared/navbar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=''>
      {/* <Navbar /> */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#f7f7f7] dark:bg-[#14171d] py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="w-full max-w-md space-y-6">

          {/* Auth Brand Header */}
          <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-md flex items-center justify-center group-hover:scale-105 transition-transform p-1">
              <Image
                src="/logo.png"
                alt="RentNest Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black tracking-tight text-[#222222] dark:text-white uppercase font-sans">
                RENT<span className="text-[#CFA190]">NEST</span>
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold -mt-1">
                Rentals Marketplace
              </span>
            </div>
          </Link>
        </div>

          {/* Auth Form Card Wrapper */}
          <div className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] rounded-3xl p-6 sm:p-8 shadow-xl">
            {children}
          </div>

          {/* Auth Footer Note */}
          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} RentNest Marketplace. All rights reserved.
          </p>

        </div>
      </div>
    </div>
  );
}
