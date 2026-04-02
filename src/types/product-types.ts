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
  materialType: string | null;
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

export interface ProductCardProps {
  product: Product;
  formatPrice: (price: number) => string;
  getProductImage: (product: Product) => string;
  onAddToCart: (product: Product) => void;
  onWishlistToggle: (product: Product) => void;
  handleDetailsPageNavgation: (product: Product) => void;
  isAddingToCart: boolean;
  isTogglingWishlist: boolean;
}

export interface ProductListItemProps {
  product: Product;
  formatPrice: (price: number) => string;
  getProductImage: (product: Product) => string;
  onAddToCart: (product: Product) => void;
  onWishlistToggle: (product: Product) => void;
  handleDetailsPageNavgation: (product: Product) => void;
  isAddingToCart: boolean;
  isTogglingWishlist: boolean;
}

export interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ColorSelectionModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (color: string, colorCode: string, quantity: number) => void;
  isLoading: boolean;
}

export interface EmptyStateProps {
  onClearFilters: () => void;
}

export interface ProductToolbarProps {
  totalProducts: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}