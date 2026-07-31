import "./globals.css";
import { Nunito_Sans, Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const figtreeHeading = Figtree({ subsets: ['latin'], variable: '--font-heading' });
const nunitoSans = Nunito_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: "RentNest - Find & List Rental Properties with Ease",
  description: "Modern rental property marketplace connecting tenants, landlords, and property managers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-sans", nunitoSans.variable, figtreeHeading.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
