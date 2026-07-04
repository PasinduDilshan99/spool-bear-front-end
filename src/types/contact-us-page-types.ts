export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCall: () => void;
  onWhatsApp: () => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

export interface SubmitStatus {
  type: "success" | "error" | "info" | null;
  message: string;
}
