import "./globals.css";
import { Nunito_Sans, Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Providers } from "@/components/Providers";
import { AuthProvider } from "@/context/AuthContext";

const figtreeHeading = Figtree({ subsets: ['latin'], variable: '--font-heading' });
const nunitoSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: "RentNest - Find & List Rental Properties with Ease",
  description: "Modern rental property marketplace connecting tenants, landlords, and property managers.",
  icons: {
    icon: "/logo-bg-white.jpg",
    shortcut: "/logo-bg-white.jpg",
    apple: "/logo-bg-white.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased font-sans", nunitoSans.variable, figtreeHeading.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
