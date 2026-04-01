export interface DesignHeroProps {
  onScrollToForm: () => void;
}

export interface DesignFormData {
  customText: string;
  description: string;
  size: string;
  color: string;
  quantity: number;
  materiel: string;
}

export interface SubmitStatus {
  type: "success" | "error" | "info" | null;
  message: string;
}

export interface DesignCTAProps {
  onScrollToForm: () => void;
}
