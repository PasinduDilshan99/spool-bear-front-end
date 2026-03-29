import {
  UploadFileDataResponse,
  UploadImageDataResponse,
} from "@/types/other-types";
import {
  UPLOAD_FILE_TO_CLOUDINARY_FE,
  UPLOAD_IMAGE_TO_CLOUDINARY_FE,
} from "@/utils/frontEndConstant";

export class OtherService {
  static async uploadImage(file: File): Promise<UploadImageDataResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sample_upload_present");

      const response = await fetch(UPLOAD_IMAGE_TO_CLOUDINARY_FE, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Cloudinary API error:", text);
        throw new Error("Failed to upload image");
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async uploadFile(file: File): Promise<UploadFileDataResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sample_upload_present");

      const response = await fetch(UPLOAD_FILE_TO_CLOUDINARY_FE, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Cloudinary API error:", text);
        throw new Error("Failed to upload file");
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
