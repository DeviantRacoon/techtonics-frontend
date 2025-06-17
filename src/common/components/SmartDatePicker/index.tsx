import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect,
  memo
} from 'react';
import {
  TextField,
  Typography,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  parseISO,
  isBefore,
  isAfter,
  format,
  isValid as isValidDate
} from 'date-fns';

export interface SmartDateInputRef {
  isValid: () => boolean;
  getValue: () => string | null;
  validate: () => boolean;
}

interface SmartDateInputProps {
  label?: string;
  name?: string;
  defaultValue?: string;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onChange?: (value: string | null) => void;
  validateDate?: (date: Date | null) => string | null;
}

const SmartDateInput = memo(forwardRef<SmartDateInputRef, SmartDateInputProps>((props, ref) => {
  const {
    label,
    name,
    defaultValue = null,
    minDate,
    maxDate,
    required = false,
    disabled = false,
    fullWidth = true,
    className,
    onChange,
    validateDate
  } = props;

  const [value, setValue] = useState<Date | null>(defaultValue ? parseISO(defaultValue) : null);
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const validate = useCallback((date: Date | null): boolean => {
    if (required && !date) {
      setError('La fecha es obligatoria');
      return false;
    }

    if (date && !isValidDate(date)) {
      setError('Fecha inválida');
      return false;
    }

    if (minDate && date && isBefore(date, minDate)) {
      setError(`Debe ser posterior a ${format(minDate, 'dd/MM/yyyy')}`);
      return false;
    }

    if (maxDate && date && isAfter(date, maxDate)) {
      setError(`Debe ser anterior a ${format(maxDate, 'dd/MM/yyyy')}`);
      return false;
    }

    if (validateDate) {
      const customMessage = validateDate(date);
      if (customMessage) {
        setError(customMessage);
        return false;
      }
    }

    setError('');
    return true;
  }, [required, minDate, maxDate, validateDate]);

  useImperativeHandle(ref, () => ({
    isValid: () => error === '',
    getValue: () => value ? value.toISOString() : null,
    validate: () => {
      setTouched(true);
      return validate(value);
    }
  }), [value, error, validate]);

  useEffect(() => {
    if (defaultValue) {
      const initial = parseISO(defaultValue);
      setValue(initial);
      validate(initial);
    }
  }, [defaultValue]);

  const handleChange = (newValue: Date | null) => {
    setTouched(true);
    setValue(newValue);
    validate(newValue);
    onChange?.(newValue ? newValue.toISOString() : null);
  };

  return (
    <Box className={className}>
      <DatePicker
        label={label}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        slotProps={{
          textField: {
            name,
            fullWidth,
            error: !!error && touched,
            helperText: touched && error ? error : '',
            size: 'small',

          }
        }}
        minDate={minDate}
        maxDate={maxDate}
      />
    </Box>
  );
}));

SmartDateInput.displayName = 'SmartDateInput';

export default SmartDateInput;