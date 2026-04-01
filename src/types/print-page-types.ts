export interface PrintHeroProps {
  onScrollToForm: () => void;
}

export interface PrintFormData {
  customText: string;
  description: string;
  size: string;
  color: string;
  quantity: number;
  materiel: string;
  file: File | null;
  fileName: string;
}

export interface PrintFormUploadStatus {
  type: "success" | "error" | "info" | null;
  message: string;
}

export interface PrintCTAProps {
  onScrollToForm: () => void;
}