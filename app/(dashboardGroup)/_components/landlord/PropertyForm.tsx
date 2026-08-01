'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Loader2,
  Plus,
  X,
  MapPin,
  DollarSign,
  Tag,
  Image as ImageIcon,
  Building2,
  FileText,
  Sparkles,
  CheckCircle2,
  Info,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import type { ICategory } from '@/lib/types';
import { createPropertySchema } from '../../_schemas/landlord/createPropertySchema';
import { createProperty, CreatePropertyState } from '../../_actions/landlord/propertyActions';

type CreatePropertyFormData = z.infer<typeof createPropertySchema>;

type PropertyFormProps = {
  categories: ICategory[];
};

const AMENITY_OPTIONS = [
  'WiFi', 'Parking', 'AC', 'Heating', 'Kitchen', 'Washer', 'Dryer',
  'TV', 'Pool', 'Gym', 'Elevator', 'Security', 'Generator', 'Balcony',
  'Furnished', 'CCTV', 'Lift', '24/7 Security', 'Generator Backup',
];

const initialState: CreatePropertyState = {
  success: false,
  message: '',
  errors: {},
};

export function PropertyForm({ categories }: PropertyFormProps) {
  const router = useRouter();
  const [state, action, pending] = useActionState(createProperty, initialState);

  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreatePropertyFormData>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      price: 0,
      categoryId: '',
      amenities: [],
      images: [],
    },
  });

  useEffect(() => {
    if (!state) return;
    if (!state.message.trim()) return;

    if (state.success) {
      toast.success(state.message);
      router.push('/landlord-dashboard/properties');
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  // Sync amenities
  const addAmenity = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !amenities.includes(trimmed)) {
      const updated = [...amenities, trimmed];
      setAmenities(updated);
      setValue('amenities', updated, { shouldValidate: true });
    }
    setAmenityInput('');
  };

  const removeAmenity = (amenity: string) => {
    const updated = amenities.filter((a) => a !== amenity);
    setAmenities(updated);
    setValue('amenities', updated, { shouldValidate: true });
  };

  const toggleAmenityOption = (amenity: string) => {
    if (amenities.includes(amenity)) {
      removeAmenity(amenity);
    } else {
      addAmenity(amenity);
    }
  };

  // Sync image URLs
  const addImageUrl = () => {
    const trimmed = imageUrlInput.trim();
    if (trimmed && !imageUrls.includes(trimmed)) {
      const updated = [...imageUrls, trimmed];
      setImageUrls(updated);
      setValue('images', updated, { shouldValidate: true });
    }
    setImageUrlInput('');
  };

  const removeImageUrl = (url: string) => {
    const updated = imageUrls.filter((u) => u !== url);
    setImageUrls(updated);
    setValue('images', updated, { shouldValidate: true });
  };

  const onSubmit = (data: CreatePropertyFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('price', String(data.price));
    formData.append('categoryId', data.categoryId);
    formData.append('amenities', amenities.join(','));
    formData.append('images', imageUrls.join('\n'));

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 font-sans px-2 sm:px-0">

      {/* Back Link */}
      <Link
        href="/landlord-dashboard/properties"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-[#CFA190] transition-colors uppercase tracking-wider"
      >
        <ArrowLeft className="size-4" />
        <span>Back to Properties</span>
      </Link>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-white via-white to-[#fff5f5] dark:from-[#1a1d24] dark:via-[#1a1d24] dark:to-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-[#CFA190] text-xs font-extrabold tracking-wider uppercase">
            <Building2 className="size-3.5" />
            <span>Landlord Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] dark:text-white uppercase tracking-tight">
            ADD NEW <span className="text-[#CFA190]">PROPERTY LISTING</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
            Publish your property on RentNest to reach thousands of verified prospective tenants.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* 1. Basic Details Card */}
        <Card className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-6 pt-2 pb-4 space-y-1 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
              <FileText className="size-4" />
              <span>Section 1</span>
            </div>
            <CardTitle className="text-lg font-black text-[#222222] dark:text-white uppercase tracking-tight">
              PROPERTY DETAILS
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
              Provide a clear title and detailed description for your property.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 py-1 space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                <span>Property Title <span className="text-rose-500">*</span></span>
              </label>
              <Input
                {...register('title')}
                placeholder="e.g. Modern Luxury 2-Bedroom Apartment in Gulshan"
                disabled={pending}
                className="rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm font-semibold"
              />
              <p className="text-[11px] font-semibold text-rose-500">
                {errors.title?.message || state.errors?.title}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                <span>Description <span className="text-rose-500">*</span></span>
              </label>
              <textarea
                {...register('description')}
                disabled={pending}
                rows={4}
                placeholder="Describe your property, key highlights, building features, neighborhood highlights..."
                className="w-full rounded-2xl border border-[#e4e4e4] dark:border-[#2e3440] bg-transparent p-3.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#CFA190]/50 resize-none font-sans"
              />
              <p className="text-[11px] font-semibold text-rose-500">
                {errors.description?.message || state.errors?.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 2. Location & Pricing Card */}
        <Card className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-6 pt-2 pb-4 space-y-1 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
              <MapPin className="size-4" />
              <span>Section 2</span>
            </div>
            <CardTitle className="text-lg font-black text-[#222222] dark:text-white uppercase tracking-tight">
              LOCATION & MONTHLY RENT
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
              Specify where your property is located and your monthly rental price.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 py-1 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Location */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                  <MapPin className="size-3.5 text-[#CFA190]" />
                  <span>Location Address <span className="text-rose-500">*</span></span>
                </label>
                <Input
                  {...register('location')}
                  placeholder="e.g. Road 11, Banani, Dhaka"
                  disabled={pending}
                  className="rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm font-semibold"
                />
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.location?.message || state.errors?.location}
                </p>
              </div>

              {/* Price */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                  <DollarSign className="size-3.5 text-[#CFA190]" />
                  <span>Monthly Rate (BDT) <span className="text-rose-500">*</span></span>
                </label>
                <Input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  placeholder="e.g. 35000"
                  disabled={pending}
                  min={1}
                  className="rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm font-semibold"
                />
                <p className="text-[11px] font-semibold text-rose-500">
                  {errors.price?.message || state.errors?.price}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Category & Amenities Card */}
        <Card className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-6 pt-2 pb-4 space-y-1 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
              <Tag className="size-4" />
              <span>Section 3</span>
            </div>
            <CardTitle className="text-lg font-black text-[#222222] dark:text-white uppercase tracking-tight">
              CATEGORY & AMENITIES
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
              Select property category and feature amenities.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 py-1 space-y-6">
            {/* Category Select */}
            <div className="w-full space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                <Tag className="size-3.5 text-[#CFA190]" />
                <span>
                  Category <span className="text-rose-500">*</span>
                </span>
              </label>

              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={pending}
                  >
                    <SelectTrigger className="w-full rounded-3xl border-[#e4e4e4] dark:border-[#2e3440] py-3 text-sm font-semibold">
                      <SelectValue placeholder="Select property category" />
                    </SelectTrigger>

                    <SelectContent className="w-(--radix-select-trigger-width) rounded-2xl">
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="w-full rounded-xl cursor-pointer"
                        >
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              <p className="text-[11px] font-semibold text-rose-500">
                {errors.categoryId?.message || state.errors?.categoryId}
              </p>
            </div>

            {/* Amenities Toggle Chips */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                <Sparkles className="size-3.5 text-[#CFA190]" />
                <span>Select Amenities <span className="text-rose-500">*</span></span>
              </label>

              <div className="flex flex-wrap gap-2 pt-1">
                {AMENITY_OPTIONS.map((amenity) => {
                  const isSelected = amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      disabled={pending}
                      onClick={() => toggleAmenityOption(amenity)}
                      className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${isSelected
                        ? 'bg-[#CFA190] text-white shadow-md scale-105'
                        : 'bg-[#f7f7f7] dark:bg-[#232733] border border-[#e4e4e4] dark:border-[#2e3440] text-gray-600 dark:text-slate-300 hover:border-[#CFA190]/50'
                        }`}
                    >
                      {isSelected && <CheckCircle2 className="size-3.5" />}
                      <span>{amenity}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Amenity Adder */}
              <div className="flex gap-2 pt-2">
                <Input
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addAmenity(amenityInput);
                    }
                  }}
                  placeholder="Add custom amenity (e.g. Solar Power)..."
                  disabled={pending}
                  className="rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={pending || !amenityInput.trim()}
                  onClick={() => addAmenity(amenityInput)}
                  className="rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] px-4 cursor-pointer"
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              {/* Active Selected Amenities List */}
              {amenities.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#fff5f5] dark:bg-[#232733] border border-[#CFA190]/30 text-xs font-extrabold text-[#CFA190]"
                    >
                      {amenity}
                      <button type="button" onClick={() => removeAmenity(amenity)} className="cursor-pointer hover:text-rose-500">
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <p className="text-[11px] font-semibold text-rose-500">
                {errors.amenities?.message || state.errors?.amenities}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Property Photos & Showcase Card */}
        <Card className="bg-white dark:bg-[#1a1d24] border border-[#e4e4e4] dark:border-[#2e3440] shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-6 pt-2 pb-4 space-y-1 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#CFA190] uppercase tracking-wider">
              <ImageIcon className="size-4" />
              <span>Section 4</span>
            </div>
            <CardTitle className="text-lg font-black text-[#222222] dark:text-white uppercase tracking-tight">
              PROPERTY PHOTOS & MEDIA
            </CardTitle>
            <CardDescription className="text-xs text-gray-500 dark:text-slate-400">
              Add image URLs to showcase your property gallery.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 py-1 space-y-5">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#222222] dark:text-slate-200">
                <ImageIcon className="size-3.5 text-[#CFA190]" />
                <span>Image URLs <span className="text-rose-500">*</span></span>
              </label>

              <div className="flex gap-2">
                <Input
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addImageUrl();
                    }
                  }}
                  placeholder="Paste image URL (e.g. https://images.unsplash.com/...) and press Enter"
                  disabled={pending}
                  className="rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] py-5 text-sm font-semibold"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={pending || !imageUrlInput.trim()}
                  onClick={addImageUrl}
                  className="rounded-2xl border-[#e4e4e4] dark:border-[#2e3440] px-4 cursor-pointer"
                >
                  <Plus className="size-4" />
                </Button>
              </div>

              {/* Added Image URL Gallery Preview */}
              {imageUrls.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                  {imageUrls.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative h-24 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 group shadow-xs"
                    >
                      <Image unoptimized src={url} alt={`Property image ${idx + 1}`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImageUrl(url)}
                          className="h-8 w-8 rounded-full bg-rose-500 text-white flex items-center justify-center cursor-pointer shadow-md hover:bg-rose-600 transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#232733] border border-gray-200 dark:border-slate-800 text-xs text-gray-500 flex items-center gap-2">
                  <Info className="size-4 text-[#CFA190] shrink-0" />
                  <span>Paste valid image URLs above and click &quot;+&quot; or press Enter to generate thumbnail gallery previews.</span>
                </div>
              )}

              <p className="text-[11px] font-semibold text-rose-500">
                {errors.images?.message || state.errors?.images}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit CTA */}
        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-[#CFA190] hover:bg-[#C08E82] text-white font-bold rounded-2xl py-6 cursor-pointer text-sm gap-2 shadow-xl transition-transform hover:-translate-y-0.5"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Creating Property Listing...</span>
            </>
          ) : (
            <>
              <Plus className="size-4" />
              <span>Publish Property Listing</span>
            </>
          )}
        </Button>
      </form>

    </div>
  );
}
