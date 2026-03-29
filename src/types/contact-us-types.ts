// contactUsTypes.ts
export interface InsertInquiryRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface InsertInquiryResponse {
  code: number;
  status: string;
  message: string;
  data: {
    message: string;
  };
  timestamp: string;
}