import { getMyReviews } from '../../_actions/tenant/reviewActions';
import { Star, MessageSquare, MapPin, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'My Reviews - RentNest',
};

export default async function MyReviewsPage() {
  const result = await getMyReviews();
  const reviews = result.data;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            <Star className="size-3.5" />
            <span>Reviews</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            MY <span className="text-[#CFA190]">REVIEWS</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            {reviews.length > 0
              ? `You have submitted ${reviews.length} review${reviews.length > 1 ? 's' : ''}.`
              : 'Share your experiences with properties you have rented.'}
          </p>
        </div>
      </div>

      {/* Content */}
      {reviews.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#f7f7f7] dark:bg-[#232733] border-b border-[#e4e4e4] dark:border-[#2e3440] text-gray-500 dark:text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="py-4 px-6">Property</th>
                    <th className="py-4 px-6">Rating</th>
                    <th className="py-4 px-6">Comment</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4e4e4] dark:divide-[#2e3440]">
                  {reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="hover:bg-[#fff5f5]/50 dark:hover:bg-[#232733]/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="min-w-0">
                          <p className="font-extrabold text-[#222222] dark:text-white truncate text-sm">
                            {review.property?.title || 'Unknown Property'}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate flex items-center gap-1">
                            <MapPin className="size-3" />
                            {review.property?.location}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`size-4 ${star <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-gray-200 text-gray-200 dark:fill-slate-700 dark:text-slate-700'
                                }`}
                            />
                          ))}
                          <span className="ml-1.5 text-[11px] font-bold text-gray-500 dark:text-slate-400">
                            {review.rating}/5
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {review.comment ? (
                          <p className="text-xs text-gray-600 dark:text-slate-300 max-w-50 truncate">
                            {review.comment}
                          </p>
                        ) : (
                          <span className="text-xs text-gray-400 italic">No comment</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="flex items-center gap-1 text-[11px] text-gray-500">
                          <Calendar className="size-3 text-[#CFA190]" />
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                            : '-'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/properties/${review.propertyId}`}>
                          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-[#CFA190] hover:bg-[#fff5f5] dark:hover:bg-[#232733] rounded-xl px-2.5 py-1.5 cursor-pointer">
                            <MessageSquare className="size-4" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-xs font-black text-[#222222] dark:text-white truncate">
                      {review.property?.title || 'Unknown Property'}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate flex items-center gap-1">
                      <MapPin className="size-3" />
                      {review.property?.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`size-3.5 ${star <= review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200 dark:fill-slate-700 dark:text-slate-700'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {review.comment && (
                  <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                  <span className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Calendar className="size-3 text-[#CFA190]" />
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                      : '-'}
                  </span>
                  <Link href={`/properties/${review.propertyId}`}>
                    <Button size="sm" variant="ghost" className="text-xs p-1.5 h-7">
                      <MessageSquare className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm">
          <div className="space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] mx-auto flex items-center justify-center">
              <Star className="size-7" />
            </div>
            <div>
              <p className="text-sm font-black text-[#222222] dark:text-white">No Reviews Yet</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Leave a review after renting a property to share your experience.
              </p>
            </div>
            <Link href="/properties" className="inline-block pt-1">
              <Button className="bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-xl text-xs px-6 py-4 cursor-pointer gap-2">
                <Star className="size-4" />
                <span>Browse Properties</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
