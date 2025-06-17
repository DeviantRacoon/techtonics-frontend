export interface SmartInputRef {
  isValid: () => boolean;
  getValue: () => string;
  validate: () => boolean;
}

export interface SmartInputProps {
  onChange?: (value: string) => void;
  name?: string;
  type?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  isTextArea?: boolean;
  defaultValue?: string;
  fullWidth?: boolean;
  label?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: { message?: string; value: RegExp };
  disabled?: boolean;
}
