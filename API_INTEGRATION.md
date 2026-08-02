# API Integration Map

Backend: `F:\Navila\rentnest-backend` | Frontend: `F:\Navila\rentnest-app`

## Public Routes

| Next.js Route | Component/Feature | Backend API |
|---------------|-------------------|-------------|
| `/` | Home page with hero, featured properties, FAQ | `GET /api/properties` |
| `/properties` | Browse, search, filter, sort properties | `GET /api/properties`, `GET /api/categories` |
| `/properties/[id]` | Property detail, image gallery, reviews, landlord info, "Request to Rent" CTA | `GET /api/properties/:propertyId` |
| `/profile` | View/edit profile (name, phone, avatar), role-based quick links | `GET /api/auth/me`, `PATCH /api/auth/me` |

## Auth Routes

| Next.js Route | Component/Feature | Backend API |
|---------------|-------------------|-------------|
| `/login` | Login form with email/password | `POST /api/auth/login` |
| `/register` | Register form with role selection (TENANT/LANDLORD) | `POST /api/auth/register` |

## Tenant Dashboard Routes

| Next.js Route | Component/Feature | Backend API |
|---------------|-------------------|-------------|
| `/tenant-dashboard` | Overview with stats, recent requests, quick links | `GET /api/rentals`, `GET /api/rentals/stats`, `GET /api/payments` |
| `/tenant-dashboard/requests` | All rental requests list with status badges, review button | `GET /api/rentals` |
| `/tenant-dashboard/requests/new` | New rental request form | `POST /api/rentals`, `GET /api/properties/:id` |
| `/tenant-dashboard/requests/[id]` | Request detail with pay/edit/review actions | `GET /api/rentals/:id` |
| `/tenant-dashboard/requests/[id]/edit` | Edit pending rental request | `GET /api/rentals/:id`, `PATCH /api/rentals/:id` |
| `/tenant-dashboard/requests/[id]/pay` | Payment summary + Stripe checkout | `GET /api/rentals/:id`, `POST /api/payments/create` |
| `/tenant-dashboard/payments` | Payment history with status | `GET /api/payments` |
| `/tenant-dashboard/payments/[id]` | Payment detail (amount, method, transaction ID, property) | `GET /api/payments/:paymentId` |
| `/payment/success` | Stripe redirect — payment success | (client-side only) |
| `/payment/cancel` | Stripe redirect — payment cancelled | (client-side only) |

## Landlord Dashboard Routes

| Next.js Route | Component/Feature | Backend API |
|---------------|-------------------|-------------|
| `/landlord-dashboard` | Overview with stats, quick actions, recent properties | `GET /api/landlord/stats`, `GET /api/landlord/properties` |
| `/landlord-dashboard/properties` | Property list with view/edit/toggle/delete | `GET /api/landlord/properties`, `DELETE /api/landlord/properties/:id`, `PATCH /api/landlord/properties/:id/availability` |
| `/landlord-dashboard/properties/new` | Create property form (category, amenities, images) | `POST /api/landlord/properties`, `GET /api/categories` |
| `/landlord-dashboard/properties/[id]/edit` | Edit property form (pre-filled) | `GET /api/landlord/properties`, `PATCH /api/landlord/properties/:id`, `GET /api/categories` |
| `/landlord-dashboard/requests` | Incoming tenant requests with approve/reject/complete | `GET /api/landlord/requests`, `PATCH /api/landlord/requests/:id`, `PATCH /api/landlord/requests/:id/complete` |

## Admin Dashboard Routes

| Next.js Route | Component/Feature | Backend API |
|---------------|-------------------|-------------|
| `/admin-dashboard` | Overview with stats, recent users table | `GET /api/admin/stats`, `GET /api/admin/users` |
| `/admin-dashboard/users` | User management with server-side search + pagination, ban/unban | `GET /api/admin/users?search=&page=&limit=`, `PATCH /api/admin/users/:id` |
| `/admin-dashboard/properties` | All property listings with status | `GET /api/admin/properties` |
| `/admin-dashboard/rentals` | All rental requests with revenue | `GET /api/admin/rentals` |
| `/admin-dashboard/categories` | Category CRUD (create, edit, delete) | `GET /api/categories`, `POST /api/categories`, `PATCH /api/categories/:id`, `DELETE /api/categories/:id` |

## Reviews

| Component/Feature | Backend API | Notes |
|-------------------|-------------|-------|
| Review button on ACTIVE or COMPLETED rentals | `POST /api/reviews` | Tenant can review after payment (ACTIVE status) or after lease ends (COMPLETED) |

## Internal Services

| Service File | Backend API | Used By |
|--------------|-------------|---------|
| `service/getMe.ts` | `GET /api/auth/me` | `context/AuthContext.tsx` (navbar, sidebar) |
| `service/refreshToken.ts` | `POST /api/auth/refresh-token` | `proxy.ts` (middleware) |
| `service/logOut.ts` | (cookie deletion only) | `navbar.tsx`, `DashboardSidebar.tsx` |

---

## Backend Route Summary

| Module | Base Path | Routes | Auth |
|--------|-----------|--------|------|
| Auth | `/api/auth` | 5 | Mixed |
| Admin | `/api/admin` | 5 | ADMIN only |
| Landlord | `/api/landlord` | 9 | LANDLORD only |
| Category | `/api/categories` | 4 | Mixed (GET public) |
| Property | `/api/properties` | 2 | Public |
| Rental | `/api/rentals` | 5 | TENANT only |
| Payment | `/api/payments` | 4 | Mixed (webhook public) |
| Review | `/api/reviews` | 1 | TENANT only |
| **Total** | | **35** | |

## All Backend Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Auth | Frontend Consumer |
|--------|----------|------|-------------------|
| POST | `/api/auth/register` | Public | `RegisterForm.tsx` |
| POST | `/api/auth/login` | Public | `LoginForm.tsx` |
| POST | `/api/auth/refresh-token` | Public | `proxy.ts` (middleware) |
| GET | `/api/auth/me` | Any role | `getMe.ts`, `ProfileForm.tsx` |
| PATCH | `/api/auth/me` | Any role | `ProfileForm.tsx` |

### Admin (`/api/admin`)
| Method | Endpoint | Auth | Frontend Consumer |
|--------|----------|------|-------------------|
| GET | `/api/admin/stats` | ADMIN | `admin-dashboard/page.tsx` |
| GET | `/api/admin/users?search=&page=&limit=` | ADMIN | `admin-dashboard/users/page.tsx`, `UserTable.tsx` |
| PATCH | `/api/admin/users/:userId` | ADMIN | `BanUnbanButton.tsx` |
| GET | `/api/admin/properties` | ADMIN | `admin-dashboard/properties/page.tsx` |
| GET | `/api/admin/rentals` | ADMIN | `admin-dashboard/rentals/page.tsx` |

### Landlord (`/api/landlord`)
| Method | Endpoint | Auth | Frontend Consumer |
|--------|----------|------|-------------------|
| GET | `/api/landlord/stats` | LANDLORD | `landlord-dashboard/page.tsx` |
| GET | `/api/landlord/properties` | LANDLORD | `landlord-dashboard/page.tsx`, `properties/page.tsx`, `EditPropertyForm.tsx` |
| POST | `/api/landlord/properties` | LANDLORD | `PropertyForm.tsx` |
| PATCH | `/api/landlord/properties/:propertyId` | LANDLORD | `EditPropertyForm.tsx` |
| DELETE | `/api/landlord/properties/:propertyId` | LANDLORD | `PropertyActions.tsx` |
| PATCH | `/api/landlord/properties/:propertyId/availability` | LANDLORD | `PropertyActions.tsx` |
| GET | `/api/landlord/requests` | LANDLORD | `landlord-dashboard/requests/page.tsx` |
| PATCH | `/api/landlord/requests/:rentalRequestId` | LANDLORD | `RequestActions.tsx` |
| PATCH | `/api/landlord/requests/:rentalRequestId/complete` | LANDLORD | `RequestActions.tsx` |

### Property (`/api/properties`)
| Method | Endpoint | Auth | Frontend Consumer |
|--------|----------|------|-------------------|
| GET | `/api/properties` | Public | `page.tsx` (home), `properties/page.tsx` |
| GET | `/api/properties/:propertyId` | Public | `properties/[id]/page.tsx` |

### Category (`/api/categories`)
| Method | Endpoint | Auth | Frontend Consumer |
|--------|----------|------|-------------------|
| GET | `/api/categories` | Public | `properties/page.tsx`, `PropertyForm.tsx`, `CategoryManager.tsx` |
| POST | `/api/categories` | ADMIN | `CategoryManager.tsx` |
| PATCH | `/api/categories/:categoryId` | ADMIN | `CategoryManager.tsx` |
| DELETE | `/api/categories/:categoryId` | ADMIN | `CategoryManager.tsx` |

### Rental (`/api/rentals`)
| Method | Endpoint | Auth | Frontend Consumer |
|--------|----------|------|-------------------|
| POST | `/api/rentals` | TENANT | `RentalRequestForm.tsx` |
| GET | `/api/rentals/stats` | TENANT | `tenant-dashboard/page.tsx` |
| GET | `/api/rentals` | TENANT | `tenant-dashboard/page.tsx`, `requests/page.tsx` |
| GET | `/api/rentals/:rentalRequestId` | TENANT | `requests/[id]/page.tsx`, `[id]/edit/page.tsx`, `[id]/pay/page.tsx` |
| PATCH | `/api/rentals/:rentalRequestId` | TENANT | `RentalUpdateForm.tsx` |

### Payment (`/api/payments`)
| Method | Endpoint | Auth | Frontend Consumer |
|--------|----------|------|-------------------|
| POST | `/api/payments/create` | TENANT | `PayButton.tsx` |
| POST | `/api/payments/confirm` | Webhook | Stripe webhook (external) |
| GET | `/api/payments` | Any role | `payments/page.tsx` |
| GET | `/api/payments/:paymentId` | Any role | `payments/[id]/page.tsx` |

### Review (`/api/reviews`)
| Method | Endpoint | Auth | Frontend Consumer |
|--------|----------|------|-------------------|
| POST | `/api/reviews` | TENANT | `ReviewFormModal.tsx` (ACTIVE or COMPLETED rentals) |
