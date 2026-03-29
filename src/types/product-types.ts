// types/product-types.ts

export interface ProductImage {
  imageId: number;
  imageUrl: string;
  isPrimary: boolean;
  status: number;
}

export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  stockQuantity: number;
  isCustomizable: boolean;
  isWish: boolean;
  typeId: number;
  typeName: string;
  materialId: number | null;
  materialName: string | null;
  materialDescription: string | null;
  categoryId: number;
  categoryName: string;
  colors: string[];
  images: ProductImage[];
}

// Optional: request filter type matches your backend DTO
export interface ProductsFilterRequest {
  categoryId?: number;
  typeId?: number;
  materialId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  name?: string;
}

export interface ProductDetailsRequest {
  productId: number;
}
