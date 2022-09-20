import { useEthers } from '@usedapp/core'
import React from 'react'
import useLocalStorageState from 'use-local-storage-state'

import {
  bindMetamaskAddress,
  checkUsername,
  doEmailLogin,
  doMetamaskLogin,
  getMetamaskCode,
  registerWithEmail,
  resetPassword,
  sendVerifyEmail,
  unbindMetamaskAddress,
  updatePassword,
  verifyVerificationCode,
} from '../api'
import { LSK_ACCESS_TOKEN } from '../constants'
import { AccountAccessToken, AccountAccessTokenJWTPayload, AccountApiResult, EmailVerificationTypes } from '../types'
import { getAccessTokenPayload, getDefaultChainId, isAccountTokenExpired } from '../utils'

type UseMetamaskAccount = {
  walletLogin: () => Promise<AccountApiResult<AccountAccessToken>>
  walletBind: () => Promise<AccountApiResult<AccountAccessToken>>
  walletUnbind: () => Promise<AccountApiResult<AccountAccessToken>>
}

export function useMetamaskAccount(): UseMetamaskAccount {
  const { account, chainId, library, switchNetwork } = useEthers()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAccessToken] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const getMetamaskSignCode = React.useCallback(async () => {
    if (!account) return null
    const res = await getMetamaskCode(account)
    if (res.isOk) return res.data.code
    return null
  }, [account])

  const getMetamaskSignSignature = React.useCallback(
    async (code: string) => {
      const defaultChainId = getDefaultChainId()
      // Don't know why cause UseDApp throw 'underlying network changed' error.
      if (chainId !== defaultChainId) await switchNetwork(defaultChainId)
      if (!(account && library)) return null
      const signer = library.getSigner()
      const signature = await signer.signMessage(
        `\x19Ethereum Signed Message:\n Code Length: ${code.length}; Code: ${code}`
      )
      console.debug('account', account, 'signature', signature)
      return signature
    },
    [account, chainId, library, switchNetwork]
  )

  const walletLogin = React.useCallback<UseMetamaskAccount['walletLogin']>(async () => {
    if (!account) return { isOk: false, data: null, error: new Error('No wallet address.') }
    const code = await getMetamaskSignCode()
    if (!code) return { isOk: false, data: null, error: new Error('No signature code.') }
    const sig = await getMetamaskSignSignature(code)
    if (!sig) return { isOk: false, data: null, error: new Error('No sign signature.') }
    const res = await doMetamaskLogin(account, sig)
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [account, getMetamaskSignCode, getMetamaskSignSignature, setAccessToken])

  const walletBind = React.useCallback<UseMetamaskAccount['walletBind']>(async () => {
    if (!account) return { isOk: false, data: null, error: new Error('No wallet address.') }
    const code = await getMetamaskSignCode()
    if (!code) return { isOk: false, data: null, error: new Error('No signature code.') }
    const sig = await getMetamaskSignSignature(code)
    if (!sig) return { isOk: false, data: null, error: new Error('No sign signature.') }
    const res = await bindMetamaskAddress(account, sig)
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [account, getMetamaskSignCode, getMetamaskSignSignature, setAccessToken])

  const walletUnbind = React.useCallback<UseMetamaskAccount['walletUnbind']>(async () => {
    const res = await unbindMetamaskAddress()
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [setAccessToken])

  return { walletLogin, walletBind, walletUnbind }
}

type EmailRegisterParams = {
  address: string
  password: string
  code: string
  username: string
}

type UseEmailAccount = {
  emailSendVerification: (
    type: EmailVerificationTypes,
    address: string,
    subscription?: boolean
  ) => Promise<AccountApiResult<void>>
  emailVerifyVerification: (code: string, address: string) => Promise<AccountApiResult<void>>
  emailLogin: (address: string, password: string) => Promise<AccountApiResult<AccountAccessToken>>
  emailRegister: (params: EmailRegisterParams) => Promise<AccountApiResult<AccountAccessToken>>
  emailResetPassword: (code: string, address: string, password: string) => Promise<AccountApiResult<void>>
  emailUpdatePassword: (oldPassword: string, newPassword: string) => Promise<AccountApiResult<void>>
  emailCheckUsername: (username: string) => Promise<AccountApiResult<void>>
}

export function useEmailAccount(): UseEmailAccount {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAccessToken, { removeItem }] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const emailSendVerification = React.useCallback<UseEmailAccount['emailSendVerification']>(
    async (type, address, subscription = false) => {
      return await sendVerifyEmail(type, address, subscription)
    },
    []
  )

  const emailVerifyVerification = React.useCallback<UseEmailAccount['emailVerifyVerification']>(
    async (code, address) => {
      return await verifyVerificationCode(code, address)
    },
    []
  )

  const emailLogin = React.useCallback<UseEmailAccount['emailLogin']>(
    async (address, password) => {
      const res = await doEmailLogin(address, password)
      if (res.isOk) setAccessToken(res.data.accessToken)
      return res
    },
    [setAccessToken]
  )

  const emailRegister = React.useCallback<UseEmailAccount['emailRegister']>(
    async (params) => {
      const res = await registerWithEmail(params)
      if (res.isOk) setAccessToken(res.data.accessToken)
      return res
    },
    [setAccessToken]
  )

  const emailResetPassword = React.useCallback<UseEmailAccount['emailResetPassword']>(
    async (code, address, password) => {
      const res = await resetPassword(code, address, password)
      if (res.isOk) removeItem()
      return res
    },
    [removeItem]
  )

  const emailUpdatePassword = React.useCallback<UseEmailAccount['emailUpdatePassword']>(
    async (oldPassword, newPassword) => {
      return await updatePassword(oldPassword, newPassword)
    },
    []
  )

  const emailCheckUsername = React.useCallback<UseEmailAccount['emailCheckUsername']>(async (username) => {
    return await checkUsername(username)
  }, [])

  return {
    emailSendVerification,
    emailVerifyVerification,
    emailLogin,
    emailRegister,
    emailResetPassword,
    emailUpdatePassword,
    emailCheckUsername,
  }
}

type UseAccountInfo = {
  account?: AccountAccessTokenJWTPayload
  expired: boolean
  remove: () => void
}

export function useAccountInfo(): UseAccountInfo {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accessToken, _, { removeItem }] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)

  const account = React.useMemo(() => {
    if (!accessToken) return undefined
    return getAccessTokenPayload(accessToken)
  }, [accessToken])

  const expired = React.useMemo(() => {
    if (!accessToken) return true
    return isAccountTokenExpired(accessToken)
  }, [accessToken])

  const remove = React.useCallback(() => {
    removeItem()
  }, [removeItem])

  return { account, expired, remove }
}
