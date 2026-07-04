export interface UserProfile {
  userId: number;
  username: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  nic: string;
  email: string;
  mobileNumber: string;
  dateOfBirth: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  benefitsPointsCount: number;
  addressNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  province: string;
  countryName: string;
  postalCode: string;
  gender: string;
  userType: string;
  userTypeDescription: string;
  userStatus: string;
  userStatusDescription: string;
}

export interface UserProfileResponse {
  code: number;
  status: string;
  message: string;
  data: UserProfile;
  timestamp: string;
}

export interface UserUpdateRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth?: string; 
  gender?: string;
  country?: string;

  email?: string;
  mobileNumber?: string;
  nic?: string;

  addressNumber?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  district?: string;
  province?: string;
  postalCode?: string;

  imageUrl?: string;
}


export interface UpdateAccountResponseData {
  message: string;
  id: number;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

export interface FilterState {
  categoryId?: number;
  typeId?: number;
  materialId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  name?: string;
  sortBy: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";
}

export interface FilterOption {
  id: number;
  name: string;
  count?: number;
}
export interface FilterOptions {
  categories: (FilterOption & { count: number })[];
  types: (FilterOption & { categoryId: number; count: number })[];
  materials: (FilterOption & { typeId: number; count: number })[];
  priceRange: { min: number; max: number };
}
