'use client'

import React, {
  useRef,
  useCallback,
  useMemo
} from 'react';
import {
  Typography,
  Divider,
  Stack
} from '@mui/material';

import Grid from '@mui/material/GridLegacy';

import Modal from '../Modal';
import SmartButton from '../SmartButton';
import FieldRenderer from './FieldRenderer';

import { SmartInputRef } from '../SmartInput';
import { SmartSelectRef } from '../SmartSelect';
import { SmartFileInputRef } from '../SmartFileInput';

import { ModalFormProps, FieldSchema } from './types';

export default function ModalForm({
  isOpen,
  onClose,
  onSubmit,
  title = 'Formulario',
  description,
  confirmText = 'Guardar',
  cancelText = 'Cerrar',
  loading = false,
  schema,
  data = {}
}: ModalFormProps) {
  const refs = useRef<Record<string, SmartInputRef | SmartSelectRef | SmartFileInputRef>>({});

  const handleFieldRef = useCallback(
    (key: string, ref: any) => {
      if (ref) refs.current[key] = ref;
    },
    []
  );

  function getValueFromPath(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj)
  };

  function setValueToPath(obj: Record<string, any>, path: string, value: any) {
    const parts = path.split('.');
    let current = obj;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = value;
      } else {
        current[part] = current[part] ?? {};
        current = current[part];
      }
    });
  }


  const handleSubmit = useCallback(() => {
    let isValid = true;
    const values: Record<string, any> = {};

    for (const key of Object.keys(refs.current)) {
      const fieldRef = refs.current[key];
      const valid = fieldRef?.validate();
      if (!valid) isValid = false;

      const value = fieldRef?.getValue();
      setValueToPath(values, key, value);
    }

    if (!isValid) return;

    onSubmit(values);
  }, [onSubmit]);

  const visibleFields = useMemo(() => (
    schema.filter((field) => {
      if (typeof field.hidden === 'function') {
        return !field.hidden(data);
      }
      return !field.hidden;
    })
  ), [schema, data]);

  const gridFields = useMemo(() => (
    visibleFields.map((field: FieldSchema) => {
      const { breakpoint = { xs: 12 } } = field;

      const evaluatedField: FieldSchema = {
        ...field,
        disabled: typeof field.disabled === 'function'
          ? field.disabled(data)
          : field.disabled
      };

      return (
        <Grid item {...breakpoint} key={field.key}>
          <FieldRenderer
            field={evaluatedField}
            defaultValue={getValueFromPath(data, field.key) ?? ''}
            onRef={(ref) => handleFieldRef(field.key, ref)}
          />
        </Grid>
      );
    })
  ), [visibleFields, data, handleFieldRef]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" noIconClose>
      <Typography variant="h5" color="text.primary" fontWeight={700} mb={2}>
        {title}
        {description && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            {description}
          </Typography>
        )}
      </Typography>

      <Grid container spacing={2}>
        {gridFields}
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end">
        <SmartButton
          label={cancelText}
          variant="outlined"
          onClick={onClose}
          sx={{ flex: 1, padding: '0 38px' }}
          loading={loading}
        />
        <SmartButton
          label={confirmText}
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          loading={loading}
        />
      </Stack>
    </Modal>
  );
}
