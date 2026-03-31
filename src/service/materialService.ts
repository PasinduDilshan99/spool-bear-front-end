// service/materialService.ts
import {
  GetAllMaterialsResponse,
  GetMaterialByIdRequest,
  GetMaterialByIdResponse,
} from "@/types/material-types";
import {
  GET_ALL_MATERIALS_DETAILS_DATA_FE,
  GET_MATERIAL_DETAILS_BY_ID_DATA_FE,
} from "@/utils/frontEndConstant";

export class MaterialService {
  private getAuthHeaders(): HeadersInit {
    const cookies = document.cookie;
    return {
      "Content-Type": "application/json",
      Cookie: cookies,
    };
  }

  async getAllMaterials(): Promise<GetAllMaterialsResponse> {
    try {
      const response = await fetch(GET_ALL_MATERIALS_DETAILS_DATA_FE, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GetAllMaterialsResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching all materials:", error);
      throw error;
    }
  }

  async getMaterialById(
    request: GetMaterialByIdRequest,
  ): Promise<GetMaterialByIdResponse> {
    try {
      const response = await fetch(GET_MATERIAL_DETAILS_BY_ID_DATA_FE, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GetMaterialByIdResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching material by ID:", error);
      throw error;
    }
  }
}
