// types/forms.d.ts

export interface FieldSchema {
  key: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "textarea"
    | "checkbox"
    | "select"
    | "file"
    | "date";
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: {
    message?: string;
    value: RegExp;
  };
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string;
  options?: { label: string; value: string }[];
  allowedFormats?: string[];
  maxFileSizeMB?: number;
  multiple?: boolean;
  breakpoint?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  hidden?: boolean | ((formValues: Record<string, any>) => boolean);
  disabled?: boolean | ((formValues: Record<string, any>) => boolean);
  onChange?: (formValues: any, newValue: any) => void;
}

export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, any>) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  schema: FieldSchema[];
  data?: Record<string, any>;
  readOnly?: boolean;
}
