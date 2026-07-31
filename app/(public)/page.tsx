import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
        Find & List Rental Properties with Ease
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
        RentNest is your modern marketplace connecting tenants with ideal rental homes and empowering landlords to manage property listings effortlessly.
      </p>
      <div className="flex items-center justify-center gap-4 pt-4">
        <Link href="/properties">
          <Button size="lg" className="rounded-full font-semibold">
            Browse Properties
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="outline" size="lg" className="rounded-full font-semibold">
            List Your Property
          </Button>
        </Link>
      </div>
    </div>
  );
}
