export type UserRole = "TENANT" | "LANDLORD" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED";

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";

export type PaymentMethod = "STRIPE" | "SSLCOMMERZ";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type ISidebarItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: "TENANT" | "LANDLORD";
  phone?: string;
  profileImage?: string;
}

export type IUser = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    profileImage?: string | null;
    phone?: string | null;
    createdAt?: string;
    updatedAt?: string;
  };
};

export type NavbarProps = {
  user?: IUser | null;
};

export type ICategory = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type IProperty = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  propertyType: string;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  landlordId: string;
  categoryId: string;
  category?: ICategory;
  landlord?: {
    id: string;
    name: string;
    email: string;
    role: string;
    profileImage?: string;
    phone?: string;
  };
  reviews?: IReview[];
  createdAt?: string;
  updatedAt?: string;
};

export type IRentalRequest = {
  id: string;
  propertyId: string;
  tenantId: string;
  status: RequestStatus;
  startDate: string;
  endDate: string;
  message?: string | null;
  createdAt?: string;
  updatedAt?: string;
  property?: IProperty;
  tenant?: {
    id: string;
    name: string;
    email: string;
  };
  payments?: IPayment[];
};

export type IPayment = {
  id: string;
  rentalRequestId: string;
  tenantId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string | null;
  paidAt?: string | null;
  rentalRequest?: IRentalRequest;
  createdAt?: string;
  updatedAt?: string;
};

export type IReview = {
  id: string;
  propertyId: string;
  tenantId: string;
  rating: number;
  comment: string;
  tenant?: {
    id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
};
