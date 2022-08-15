import { FieldError } from 'react-hook-form'

export function getFormErrorMessage(error?: FieldError): string {
  if (!error) return ''
  if (error.message) return error.message
  if (error.type === 'required') return 'Field is required.'
  return 'Field error.'
}
