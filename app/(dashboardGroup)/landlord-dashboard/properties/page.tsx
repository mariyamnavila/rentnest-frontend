import { getLandlordProperties } from '../../_actions/landlord/dashboardActions';
import { PropertyActions } from '../../_components/landlord/PropertyActions';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Building2, Plus, MapPin } from 'lucide-react';

export const metadata = {
  title: 'My Properties - RentNest',
};

export default async function LandlordPropertiesPage() {
  const result = await getLandlordProperties();
  const properties = result.data;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            <Building2 className="size-3.5" />
            <span>Listings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            MY <span className="text-[#CFA190]">PROPERTIES</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Manage your listings, update availability, and track performance.
          </p>
        </div>

        <Link href="/landlord-dashboard/properties/new">
          <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl px-5 py-5 text-xs sm:text-sm gap-2 cursor-pointer shadow-md transition-transform hover:-translate-y-0.5 shrink-0">
            <Plus className="size-4" />
            <span>Add Property</span>
          </Button>
        </Link>
      </div>

      {/* Content */}
      {properties.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                  {properties.map((property) => {
                    const displayImage =
                      property.images?.[0] ||
                      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

                    return (
                      <tr
                        key={property.id}
                        className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3.5 min-w-62.5">
                            <div className="relative h-12 w-14 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                              <Image
                                unoptimized
                                src={displayImage}
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 space-y-0.5">
                              <Link
                                href={`/properties/${property.id}`}
                                className="font-extrabold text-[#222222] dark:text-white truncate block hover:text-[#CFA190] transition-colors text-sm"
                              >
                                {property.title}
                              </Link>
                              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                <MapPin className="size-3 text-[#CFA190] shrink-0" />
                                <span className="truncate">{property.location}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#f7f7f7] dark:bg-[#232733] text-[11px] font-bold text-gray-600 dark:text-slate-300 border border-[#e4e4e4] dark:border-[#2e3440]">
                            {property.category?.name || 'N/A'}
                          </span>
                        </td>

                        <td className="py-4 px-6 font-black text-sm text-[#CFA190]">
                          ${property.price.toLocaleString()}
                          <span className="text-[10px] text-gray-400 font-normal">/mo</span>
                        </td>

                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold ${property.isAvailable
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-200 dark:border-rose-800'
                            }`}>
                            {property.isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <PropertyActions propertyId={property.id} propertyName={property.title} isAvailable={property.isAvailable} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {properties.map((property) => {
              const displayImage =
                property.images?.[0] ||
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';

              return (
                <div
                  key={property.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-16 rounded-xl overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                      <Image unoptimized src={displayImage} alt={property.title} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <Link href={`/properties/${property.id}`} className="text-xs font-black text-[#222222] dark:text-white truncate block hover:text-[#CFA190]">
                        {property.title}
                      </Link>
                      <p className="text-[11px] text-gray-400 truncate flex items-center gap-1">
                        <MapPin className="size-3 text-[#CFA190] shrink-0" />
                        {property.location}
                      </p>
                      <p className="text-[11px] font-extrabold text-[#CFA190]">
                        ${property.price.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${property.isAvailable
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                      }`}>
                      {property.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                    <PropertyActions propertyId={property.id} propertyName={property.title} isAvailable={property.isAvailable} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm">
          <div className="space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center">
              <Building2 className="size-7" />
            </div>
            <div>
              <p className="text-sm font-black text-[#222222] dark:text-white">No Properties Yet</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Start listing your properties and find tenants.
              </p>
            </div>
            <Link href="/landlord-dashboard/properties/new" className="inline-block pt-1">
              <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs px-6 py-4 cursor-pointer gap-2">
                <Plus className="size-4" />
                <span>Add Your First Property</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
