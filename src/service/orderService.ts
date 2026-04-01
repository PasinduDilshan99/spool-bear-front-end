// services/orderService.ts
import {
  AddDesignOrderRequest,
  AddPrintingOrderRequest,
  AddProductOrderRequest,
  OrderOperationResponse,
  OrdersResponse,
} from "@/types/order-types";
import {
  ADD_DESIGN_ORDER_DATA_FE,
  ADD_PRINTING_ORDER_DATA_FE,
  ADD_PRODUCT_ORDER_DATA_FE,
  GET_ORDERS_DETAILS_BY_USER_ID_DATA_FE,
  GET_ORDERS_DETAILS_BY_USER_ID_FOR_ADD_REVIEW_DATA_FE,
} from "@/utils/frontEndConstant";

export class OrderService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
  }

  async getUserOrders(): Promise<OrdersResponse> {
    try {
      const response = await fetch(GET_ORDERS_DETAILS_BY_USER_ID_DATA_FE, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OrdersResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  }

  async getUserOrdersForAddReview(): Promise<OrdersResponse> {
    try {
      const response = await fetch(
        GET_ORDERS_DETAILS_BY_USER_ID_FOR_ADD_REVIEW_DATA_FE,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OrdersResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  }

  // Add Printing Order API
  async addPrintingOrder(
    orderData: AddPrintingOrderRequest,
  ): Promise<OrderOperationResponse> {
    try {
      const response = await fetch(ADD_PRINTING_ORDER_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data: OrderOperationResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to add printing order");
      }

      return data;
    } catch (error) {
      console.error("Error adding printing order:", error);
      throw error;
    }
  }

  // Add Design Order API
  async addDesignOrder(
    orderData: AddDesignOrderRequest,
  ): Promise<OrderOperationResponse> {
    try {
      const response = await fetch(ADD_DESIGN_ORDER_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data: OrderOperationResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to add design order");
      }

      return data;
    } catch (error) {
      console.error("Error adding design order:", error);
      throw error;
    }
  }

  async addProductOrder(
    orderData: AddProductOrderRequest,
  ): Promise<OrderOperationResponse> {
    try {
      const response = await fetch(ADD_PRODUCT_ORDER_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      const data: OrderOperationResponse = await response.json();

      if (data.code !== 200) {
        throw new Error(data.message || "Failed to add product order");
      }

      return data;
    } catch (error) {
      console.error("Error adding product order:", error);
      throw error;
    }
  }
}
