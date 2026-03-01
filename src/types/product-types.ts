// types/product-types.ts

export type ProductImage = {
  imageId: number;
  imageUrl: string;
  isPrimary: boolean;
  status: number;
};

export type Product = {
  productId: number;
  productName: string;
  productDescription: string;
  price: number;
  stockQuantity: number;
  isCustomizable: boolean;
  typeId: number;
  typeName: string;
  materialId: number | null;
  materialName: string | null;
  materialDescription: string | null;
  categoryId: number;
  categoryName: string;
  images: ProductImage[];
};

// Optional: request filter type matches your backend DTO
export type ProductsFilterRequest = {
  categoryId?: number;
  typeId?: number;
  materialId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  name?: string;
};
