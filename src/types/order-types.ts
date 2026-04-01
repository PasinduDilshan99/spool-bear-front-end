// types/order-types.ts
export interface OrderImage {
  imageId: string;
  imageUrl: string;
  imageStatus: string;
  createdAt: string;
  primary: boolean;
}

export interface OrderFile {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

export interface Printer {
  printerId: number;
  printerName: string;
  printerModel: string;
}

export interface PrintingOrder {
  orderId: number;
  printingOrderId: number;
  productId: number;
  customText: string;
  description: string;
  size: string;
  color: string;
  material: string;
  quantity: number;
  unitPrice: number;
  status: string;
  printer: Printer;
  imagesList: OrderImage[];
  orderFilesList: OrderFile[];
}

export interface ProductOrder {
  orderId: number;
  productId: number;
  productName: string;
  productDescription: string;
  imagesList: OrderImage[];
  productType: string;
  material: string;
  quantity: number;
  color: string | null;
}

export interface OrderItems {
  productsList: ProductOrder[];
  printingsList: PrintingOrder[];
}

export interface Order {
  orderId: number;
  userId: number;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  status: string;
  createdDate: string;
  updatedDate: string | null;
  orderType: string; // "PRINTING", "PRODUCT"
  orderItems: OrderItems;
}

export interface OrdersResponse {
  code: number;
  status: string;
  message: string;
  data: Order[];
  timestamp: string;
}

export interface AddPrintingOrderRequest {
  customText: string;
  description: string;
  size: string;
  color: string;
  quantity: number;
  materiel: string;
  orderFiles: Array<{
    fileName: string;
    fileUrl: string;
  }>;
}

export interface AddDesignOrderRequest {
  customText: string;
  description: string;
  size: string;
  color: string;
  quantity: number;
  materiel: string;
}

export interface OrderOperationResponse {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
  };
  timestamp: string;
}

export interface AddProductOrderRequest {
  totalAmount: number;
  products: OrderProducts[];
}

export interface OrderProducts {
  cartItemId: number;
  cartId: number;
  productId: number;
  price: number;
  quantity: number;
  colorId: string;
}
