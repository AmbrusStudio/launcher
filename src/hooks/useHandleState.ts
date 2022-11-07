import { TransactionStatus } from '@usedapp/core'
import { useCallback } from 'react'

import { TransactionStatusImmutableX } from '../types/immutableX'
import { useSnackbarTR } from './useSnackbar'

/**
 * useHandleState
 * @returns
 */
export function useHandleState() {
  const showSnackbar = useSnackbarTR()

  const handle = useCallback(
    (state: TransactionStatus) => {
      if (state.status === 'None') {
        //
      } else if (state.status === 'PendingSignature') {
        //
      } else if (state.status === 'Mining') {
        showSnackbar('Mining hash: ' + state.transaction?.hash)
      } else if (state.status === 'Success') {
        showSnackbar('Success hash: ' + state.transaction?.hash, 'success')
      } else if (state.status === 'Fail') {
        showSnackbar('Fail hash: ' + state.transaction?.hash, 'error')
      } else if (state.status === 'Exception') {
        showSnackbar(state.errorMessage || 'Exception', 'error')
      }
      console.log('state', state)
    },
    [showSnackbar]
  )
  return handle
}

/**
 * useHandleStateImmutableX
 * @returns
 */
export function useHandleStateImmutableX() {
  const showSnackbar = useSnackbarTR()

  const handle = useCallback(
    (state: TransactionStatusImmutableX) => {
      if (state.status === 'None') {
        //
      } else if (state.status === 'PendingSignature') {
        //
      } else if (state.status === 'Mining') {
        //
      } else if (state.status === 'Success') {
        showSnackbar('Success', 'success')
      } else if (state.status === 'Fail') {
        showSnackbar(state.errorMessage || 'Fail', 'error')
      } else if (state.status === 'Exception') {
        showSnackbar(state.errorMessage || 'Exception', 'error')
      }
      console.log('state', state)
    },
    [showSnackbar]
  )
  return handle
}
