import React, { memo, forwardRef } from 'react';
import SmartInput from '../SmartInput';
import SmartSelect from '../SmartSelect';
import SmartFileInput from '../SmartFileInput';
import SmartDateInput from '../SmartDatePicker';

import { Checkbox, FormControlLabel } from '@mui/material';

import { FieldSchema } from './types';

interface FieldRendererProps {
  field: FieldSchema;
  defaultValue: any;
  onRef: (ref: any) => void;
}

function FieldRendererComponent({ field, defaultValue, onRef }: FieldRendererProps) {
  const {
    label,
    type = 'text',
    required,
    placeholder,
    onChange,
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
        control={<Checkbox defaultChecked={!!defaultValue} disabled={!!disabled} onChange={onChange} />}
        label={label}
      />
    );
  }

  if (type === 'select') {
    return (
      <SmartSelect
        ref={(el) => onRef(el)}
        label={label}
        required={required}
        multiple={multiple}
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={!!disabled}
        size="small"
        fullWidth
      />
    );
  }

  if (type === 'file') {
    return (
      <SmartFileInput
        ref={(el) => onRef(el)}
        label={label}
        allowedTypes={allowedFormats}
        maxSizeMb={maxFileSizeMB}
        required={required}
        disabled={!!disabled}
        multiple={multiple}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    );
  }

  if (type === 'date') {
    return (
      <SmartDateInput
        ref={(el) => onRef(el)}
        label={label}
        required={required}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={!!disabled}
        fullWidth
      />
    );
  }


  return (
    <SmartInput
      ref={(el) => onRef(el)}
      type={type === 'textarea' ? 'text' : type}
      isTextArea={type === 'textarea'}
      label={label}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
      onChange={onChange}
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
