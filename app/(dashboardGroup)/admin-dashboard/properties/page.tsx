import { getAdminProperties } from '../../_actions/admin/adminActions';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'All Listings - Admin Dashboard',
  description: 'View and moderate all property listings',
};

export default async function AdminPropertiesPage() {
  const result = await getAdminProperties();
  const properties = result.data;

  const available = properties.filter((p) => p.isAvailable).length;
  const unavailable = properties.length - available;

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            All <span className="text-[#CFA190]">Listings</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {properties.length} total · {available} available · {unavailable} unavailable
          </p>
        </div>
      </div>

      {/* Properties Table */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs pb-1">
        <CardHeader className="p-6 pt-2 pb-0">
          <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
            Property Listings
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            All properties listed on the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          {properties.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440]">
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Property</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Location</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Price</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Landlord</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-5 text-[11px] font-extrabold text-gray-400 dark:text-slate-400 uppercase tracking-wider text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                  {properties.map((property) => {
                    const img = property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

                    return (
                      <tr key={property.id} className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                              <Image unoptimized src={img} alt={property.title} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-[#222222] dark:text-white truncate max-w-50">{property.title}</p>
                              <p className="text-[10px] text-gray-400">{property.category?.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                            <MapPin className="size-3 text-[#CFA190] shrink-0" />
                            <span className="truncate max-w-37.5">{property.location}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-5 font-black text-sm text-[#CFA190]">
                          ${property.price.toLocaleString()}
                          <span className="text-[10px] text-gray-400 font-normal">/mo</span>
                        </td>
                        <td className="py-3.5 px-5 text-xs text-gray-500 dark:text-slate-400">
                          {property.landlord?.name || '—'}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold ${property.isAvailable
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                            }`}>
                            {property.isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <Link href={`/properties/${property.id}`} target="_blank">
                            <span className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#CFA190] transition-colors">
                              <ExternalLink className="size-3.5" />
                            </span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center">
                <Building2 className="size-6" />
              </div>
              <p className="text-sm font-bold text-[#222222] dark:text-white">No Properties Found</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">No properties have been listed yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
