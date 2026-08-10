import { getCategories } from '../../_actions/admin/adminActions';
import { CategoryManager } from '../../_components/admin/CategoryManager';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Categories - Admin Dashboard',
  description: 'Manage property categories',
};

export default async function AdminCategoriesPage() {
  const result = await getCategories();
  const categories = result.data;

  return (
    <div className="space-y-6 font-sans">

      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
          Manage <span className="text-[#CFA190]">Categories</span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
          {categories.length} categories available for property listings
        </p>
      </div>

      {/* Category Manager */}
      <Card className="bg-white dark:bg-[#1a1d24] rounded-3xl border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs pb-0">
        <CardHeader className="p-6 py-0">
          <CardTitle className="text-base font-black uppercase tracking-wide text-[#222222] dark:text-white">
            Property Categories
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
            Add, edit, or remove categories used to classify properties
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <CategoryManager categories={categories} />
        </CardContent>
      </Card>

    </div>
  );
}
