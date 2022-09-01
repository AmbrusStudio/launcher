import { OptionsObject, useSnackbar, VariantType } from 'notistack'
import { useCallback } from 'react'

/**
 * useSnackbar top right
 * @returns
 */
export function useSnackbarTR() {
  const { enqueueSnackbar } = useSnackbar()
  const showSnackbar = useCallback(
    (message: string, variant: VariantType = 'info') => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        preventDuplicate: true,
        autoHideDuration: 3000,
      })
    },
    [enqueueSnackbar]
  )
  return showSnackbar
}

export function useTopCenterSnackbar() {
  const { enqueueSnackbar } = useSnackbar()
  const showSnackbar = useCallback(
    (message: string, variant: VariantType = 'info', options?: OptionsObject) => {
      return enqueueSnackbar(message, {
        variant,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        preventDuplicate: true,
        autoHideDuration: 3000,
        ...options,
      })
    },
    [enqueueSnackbar]
  )
  return showSnackbar
}
