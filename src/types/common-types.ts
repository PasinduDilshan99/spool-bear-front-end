// types/common_types.ts
export type ApiResponse<T> = {
  data: T;
  message?: string;
  status?: number;
  timestamp?: string;
};