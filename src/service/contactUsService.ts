// contactUsService.ts

import {
  InsertInquiryRequest,
  InsertInquiryResponse,
} from "@/types/contact-us-types";
import { ADD_INQUIRY_DATA_FE } from "@/utils/frontEndConstant";

export class ContactUsService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
  }

  async addInquiry(
    requestBody: InsertInquiryRequest,
  ): Promise<InsertInquiryResponse> {
    try {
      const response = await fetch(ADD_INQUIRY_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: InsertInquiryResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding inquiry:", error);
      throw error;
    }
  }
}
