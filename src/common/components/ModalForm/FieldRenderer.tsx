import React, { memo } from 'react';
import SmartInput from '../SmartInput';
import SmartSelect from '../SmartSelect';
import SmartFileInput from '../SmartFileInput';
import SmartDateInput from '../SmartDatePicker';

import { Checkbox, FormControlLabel } from '@mui/material';

import { FieldSchema } from './types';

interface FieldRendererProps {
  field: FieldSchema
  defaultValue: any
  value: any
  onChange: (value: any) => void
}

function FieldRendererComponent({ field, defaultValue, value, onChange }: FieldRendererProps) {
  const {
    label,
    type = 'text',
    required,
    placeholder,
    options = [],
    allowedFormats,
    maxFileSizeMB,
    multiple,
    minLength,
    maxLength,
    pattern,
    disabled
  } = field;


  if (type === 'checkbox') {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value}
            disabled={!!disabled}
            onChange={(e) => onChange(e.target.checked)}
          />
        }
        label={label}
      />
    )
  }

  if (type === 'select') {
    return (
      <SmartSelect
        label={label}
        required={required}
        multiple={multiple}
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange as any}
        disabled={!!disabled}
        size="small"
        fullWidth
      />
    );
  }

  if (type === 'file') {
    return (
      <SmartFileInput
        label={label}
        allowedTypes={allowedFormats}
        maxSizeMb={maxFileSizeMB}
        required={required}
        disabled={!!disabled}
        multiple={multiple}
        defaultValue={defaultValue}
        onChange={onChange as any}
      />
    );
  }

  if (type === 'date') {
    return (
      <SmartDateInput
        label={label}
        required={required}
        defaultValue={defaultValue}
        onChange={onChange as any}
        disabled={!!disabled}
        fullWidth
      />
    );
  }


  return (
    <SmartInput
      type={type === 'textarea' ? 'text' : type}
      isTextArea={type === 'textarea'}
      label={label}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
      onChange={onChange as any}
      minLength={minLength}
      maxLength={maxLength}
      disabled={!!disabled}
      pattern={pattern}
      size="small"
      fullWidth
    />
  );
}

export default memo(FieldRendererComponent);
