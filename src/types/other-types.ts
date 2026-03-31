// other-types.ts
export interface UploadImageData {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
}

export interface UploadImageDataResponse {
  data: UploadImageData;
}

export interface UploadFileDataResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  resource_type: string; // "raw"
  created_at: string;
  tags: string[];
  bytes: number;
  type: string; // "upload"
  etag: string;
  placeholder: boolean;
  url: string;        // HTTP URL
  secure_url: string; // HTTPS URL
  asset_folder: string;
  display_name: string;
  original_filename: string;
}