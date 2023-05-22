import React from 'react'
import { FieldError } from 'react-hook-form'

export const FormError = ({ error }: { error: FieldError | undefined }) => {
  return (
    <p className="text-xs italic text-red-500">
      {error && `* ${error?.message}`}
    </p>
  )
}
