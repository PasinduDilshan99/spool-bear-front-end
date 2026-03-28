// types/notifications.ts
export interface NotificationPermissions {
  id: number;
  userId: number;
  newProductsUpdate: boolean;
  newProductsUpdateAt: string;
  trackingUpdate: boolean;
  trackingUpdateAt: string;
  productStatusUpdate: boolean;
  productStatusUpdateAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationResponse {
  code: number;
  status: string;
  message: string;
  data: NotificationPermissions;
  timestamp: string;
}

export interface UpdateNotificationRequest {
  name: string;
  value: boolean;
}

export interface UpdateNotificationResponse {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
    id: number | null;
  };
  timestamp: string;
}