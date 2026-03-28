import {
  AccountSecurityResponse,
  EmailUpdateRequest,
  EmailVerifyRequest,
  MobileUpdateRequest,
  MobileVerifyRequest,
} from "@/types/account-security-types";
import { ApiResponse } from "@/types/common-types";
import {
  NotificationResponse,
  UpdateNotificationRequest,
} from "@/types/notifications-types";
import { SidebarResponse } from "@/types/sidebar-types";
import {
  UpdateAccountResponseData,
  UserProfileResponse,
  UserUpdateRequest,
} from "@/types/user-profile-types";
import { WishListResponse } from "@/types/wish-list-types";
import {
  GET_ACCOUNT_SECURITY_DETAILS_FE,
  GET_USER_NOTIFICATION_DETAILS_DATA_FE,
  GET_USER_PROFILE_SIDE_BAR_DATA_FE,
  GET_USER_PROFILE_USER_DETAILS_DATA_FE,
  GET_WIS_LIST_DETAILS_DATA_FE,
  REQUEST_EMAIL_VERIFY_SECURITY_DETAILS_FE,
  REQUEST_MOBILE_VERIFY_SECURITY_DETAILS_FE,
  UPDATE_EMAIL_VERIFY_SECURITY_DETAILS_FE,
  UPDATE_MOBILE_VERIFY_SECURITY_DETAILS_FE,
  UPDATE_USER_NOTIFICATION_DETAILS_DATA_FE,
  UPDATE_USER_PROFILE_DETAILS_DATA_FE,
} from "@/utils/frontEndConstant";

export class UserProfileAPIService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
  }

  async getSidebarData(): Promise<SidebarResponse> {
    const response = await fetch(GET_USER_PROFILE_SIDE_BAR_DATA_FE, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sidebar");
    }

    return response.json();
  }

  async getUserProfile(): Promise<UserProfileResponse> {
    try {
      const response = await fetch(GET_USER_PROFILE_USER_DETAILS_DATA_FE, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async getNotificationPermissions(): Promise<NotificationResponse> {
    try {
      const response = await fetch(GET_USER_NOTIFICATION_DETAILS_DATA_FE, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching notification permissions:", error);
      throw error;
    }
  }

  async updateNotificationPermission(
    request: UpdateNotificationRequest,
  ): Promise<unknown> {
    try {
      const response = await fetch(UPDATE_USER_NOTIFICATION_DETAILS_DATA_FE, {
        method: "POST",
        headers: {
          ...this.getAuthHeaders(),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating notification permission:", error);
      throw error;
    }
  }

  async getAccountSecurityDetails(): Promise<AccountSecurityResponse> {
    try {
      const response = await fetch(GET_ACCOUNT_SECURITY_DETAILS_FE, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching account security details:", error);
      throw error;
    }
  }

  async requestMobileVerification(
    request: MobileVerifyRequest,
  ): Promise<unknown> {
    try {
      const response = await fetch(REQUEST_MOBILE_VERIFY_SECURITY_DETAILS_FE, {
        method: "POST",
        headers: {
          ...this.getAuthHeaders(),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error requesting mobile verification:", error);
      throw error;
    }
  }

  async verifyMobileCode(request: MobileUpdateRequest): Promise<unknown> {
    try {
      const response = await fetch(UPDATE_MOBILE_VERIFY_SECURITY_DETAILS_FE, {
        method: "POST",
        headers: {
          ...this.getAuthHeaders(),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error verifying mobile code:", error);
      throw error;
    }
  }

  async requestEmailVerification(
    request: EmailVerifyRequest,
  ): Promise<unknown> {
    try {
      const response = await fetch(REQUEST_EMAIL_VERIFY_SECURITY_DETAILS_FE, {
        method: "POST",
        headers: {
          ...this.getAuthHeaders(),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error requesting email verification:", error);
      throw error;
    }
  }

  async verifyEmailCode(request: EmailUpdateRequest): Promise<unknown> {
    try {
      const response = await fetch(UPDATE_EMAIL_VERIFY_SECURITY_DETAILS_FE, {
        method: "POST",
        headers: {
          ...this.getAuthHeaders(),
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error verifying email code:", error);
      throw error;
    }
  }


  async updateAccount(
    request: UserUpdateRequest,
  ): Promise<UpdateAccountResponseData> {
    try {
      const response = await fetch(UPDATE_USER_PROFILE_DETAILS_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to update profile");
      }

      const result: ApiResponse<UpdateAccountResponseData> =
        await response.json();

      return result.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
}
