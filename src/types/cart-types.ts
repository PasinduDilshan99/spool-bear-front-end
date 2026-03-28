// types/cart.ts
export interface CartImage {
  id: number;
  name: string;
  url: string;
  description: string | null;
}

export interface CartItem {
  cartId: number;
  cartItemId: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  images?: CartImage[];
  material: string;
  materialId: number;
  typeId: number;
  type: string;
  color: string;
  colorCode: string;
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

export interface CreateCartRequest {
  cartId: number | null;
  productId: number;
  quantity: number;
  material: string;
  materialId: number;
  type: string;
  typeId: number;
  color: string;
}

export interface AddProductRequest {
  cartId: number;
  productId: number;
  quantity: number;
  material: string;
  materialId: number;
  type: string;
  typeId: number;
  color: string;
}

export interface RemoveProductRequest {
  cartItemId: number;
  productId: number;
  cartId: number;
}

export interface ClearCartRequest {
  cartId: number;
}

export interface FetchCartRequest {
  cartId: number;
}