# RentNest – Rental Property Marketplace

## Overview
RentNest is a full-stack rental property marketplace that connects tenants with landlords. Users can browse properties, submit rental requests, make payments via Stripe, and leave reviews. The platform includes role-based dashboards for Tenants, Landlords, and Admins.

## Screenshot
<!-- ![RentNest Screenshot](screenshot.png) -->
> *Screenshot coming soon*

## Tech Stack
- **Framework:** Next.js 16, React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Shadcn UI, Radix UI
- **State Management:** TanStack Query, React Context
- **Forms:** React Hook Form, Zod
- **Authentication:** JWT (HTTP-only cookies)
- **Payments:** Stripe
- **Icons:** Lucide React
- **Notifications:** Sonner

## Key Features
- **Public Property Listings** – Browse, search, filter, and sort properties by category, price range, and amenities.
- **Property Detail Pages** – Image gallery, description, amenities, landlord info, and reviews.
- **Rental Request System** – Tenants can create, edit, and track rental requests with status badges (PENDING, APPROVED, REJECTED, ACTIVE, COMPLETED).
- **Stripe Payment Integration** – Secure payment processing with success/cancel redirect pages and payment history.
- **Review System** – Tenants can leave star ratings and comments for properties they have rented.
- **Role-Based Dashboards** – Separate dashboards for Tenant, Landlord, and Admin with different permissions.
- **Landlord Tools** – Create, edit, toggle availability, and delete properties. Approve, reject, or complete rental requests.
- **Admin Panel** – User management with search/pagination, ban/unban users, view all properties and rentals, category CRUD.
- **Profile Management** – Edit name, phone, and avatar with role-based quick links.
- **Responsive Design** – Fully responsive UI built with Tailwind CSS and Shadcn UI components.

## Dependencies
| Package | Purpose |
|---------|---------|
| next | React framework |
| react / react-dom | UI framework |
| @tanstack/react-query | Server state management |
| react-hook-form | Form handling |
| zod | Schema validation |
| radix-ui / shadcn | UI components |
| tailwindcss | Utility-first CSS |
| lucide-react | Icons |
| sonner | Toast notifications |
| swiper | Carousels |
| jsonwebtoken | JWT handling |
| date-fns | Date utilities |

## Run Locally

This repository contains the frontend only. Backend is a separate project.

Clone the repo:

```bash
git clone https://github.com/mariyamnavila/rentnest-app.git
cd rentnest-app
```

Install dependencies:

```bash
pnpm install
```

Create a `.env` file in the root directory and add the following:

```env
BACKEND_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```

Start the dev server:

```bash
pnpm dev
```

> **Note:** Backend setup is required separately. See the backend repo.

## Project Structure
```
app/
├── (auth)/              # Login, Register pages + server actions
├── (public)/            # Public pages: Home, Properties, Profile
├── (dashboardGroup)/    # Role-based dashboards
│   ├── tenant-dashboard/
│   ├── landlord-dashboard/
│   └── admin-dashboard/
├── payment/             # Stripe success/cancel pages
components/              # Shared UI components (Shadcn)
context/                 # Auth Context
lib/                     # Types, utilities
service/                 # getMe, refreshToken, logOut
proxy.ts                 # Middleware for auth + role redirects
```

## Live & Repos
- **Live Site:** https://rentnest-app.vercel.app
- **Backend Repo:** https://github.com/mariyamnavila/rentnest-backend
