'use client'

import React, { useMemo, useEffect } from 'react'
import { Typography, Divider, Stack } from '@mui/material'
import Grid from '@mui/material/GridLegacy'
import { useForm, Controller } from 'react-hook-form'

import Modal from '../Modal'
import SmartButton from '../SmartButton'
import FieldRenderer from './FieldRenderer'

import { ModalFormProps, FieldSchema } from './types'

function getValueFromPath(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

export default function ModalForm({
  isOpen,
  onClose,
  onSubmit,
  title = 'Formulario',
  description,
  confirmText = 'Guardar',
  cancelText = 'Cerrar',
  loading = false,
  readOnly = false,
  schema,
  data = {}
}: ModalFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { isValid }
  } = useForm({ defaultValues: data, mode: 'onChange' })

  useEffect(() => {
    if (isOpen) {
      reset(data)
    }
  }, [isOpen, data, reset])

  const formValues = watch()

  const visibleFields = useMemo(
    () =>
      schema.filter((field) => {
        if (typeof field.hidden === 'function') {
          return !field.hidden(formValues)
        }
        return !field.hidden
      }),
    [schema, formValues]
  )

  const gridFields = useMemo(
    () =>
      visibleFields.map((field: FieldSchema) => {
        const { breakpoint = { xs: 12 } } = field

        const evaluatedField: FieldSchema = {
          ...field,
          disabled:
            readOnly ||
            (typeof field.disabled === 'function' ? field.disabled(formValues) : field.disabled)
        }

        return (
          <Grid item {...breakpoint} key={field.key}>
            <Controller
              name={field.key}
              control={control}
              defaultValue={getValueFromPath(data, field.key) ?? ''}
              rules={{
                required: field.required ? 'Campo obligatorio' : false,
                minLength: field.minLength
                  ? { value: field.minLength, message: `Mínimo ${field.minLength}` }
                  : undefined,
                maxLength: field.maxLength
                  ? { value: field.maxLength, message: `Máximo ${field.maxLength}` }
                  : undefined,
                pattern: field.pattern as any,
              }}
              render={({ field: controllerField }) => (
                <FieldRenderer
                  field={evaluatedField}
                  defaultValue={getValueFromPath(data, field.key) ?? ''}
                  value={controllerField.value}
                  onChange={(value) => {
                    controllerField.onChange(value)
                    field.onChange?.(getValues(), value)
                  }}
                />
              )}
            />
          </Grid>
        )
      }),
    [visibleFields, formValues, control, data, readOnly, getValues]
  )

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={() => { reset(); onClose() }} size='md' noIconClose>
      <Typography variant='h5' color='text.primary' fontWeight={700} mb={2}>
        {title}
        {description && (
          <Typography variant='body2' color='text.secondary' mb={2}>
            {description}
          </Typography>
        )}
      </Typography>

      <Grid container spacing={2}>
        {gridFields}
      </Grid>

      <Typography variant='caption' color='text.secondary' mt={1}>
        Los campos marcados con * son obligatorios
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent='flex-end'>
        <SmartButton
          label={cancelText}
          variant='outlined'
          onClick={() => {
            reset()
            onClose()
          }}
          sx={{ flex: 1, padding: readOnly ? '' : '0 38px' }}
          loading={loading}
        />
        {!readOnly && (
          <SmartButton
            label={confirmText}
            variant='contained'
            onClick={handleSubmit((vals) => {
              onSubmit(vals)
            })}
            fullWidth
            loading={loading}
            disabled={!isValid}
          />
        )}
      </Stack>
    </Modal>
  )
}
