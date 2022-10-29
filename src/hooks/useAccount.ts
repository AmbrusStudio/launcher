import * as Sentry from '@sentry/react'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { isAddress } from 'ethers/lib/utils'
import React, { useMemo } from 'react'
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
import { useImmutableXWallet } from './useImmutableX'

type UseCommonWalletAccount = {
  getWalletSignCode: (account: string) => Promise<string | null>
}

function useCommonWalletAccount(): UseCommonWalletAccount {
  const getWalletSignCode = React.useCallback<UseCommonWalletAccount['getWalletSignCode']>(async (account) => {
    if (!account) return null
    const res = await getMetamaskCode(account)
    if (res.isOk) return res.data.code
    return null
  }, [])

  return { getWalletSignCode }
}

type UseMetamaskAccount = {
  walletLogin: () => Promise<AccountApiResult<AccountAccessToken>>
  walletBind: () => Promise<AccountApiResult<AccountAccessToken>>
  walletUnbind: () => Promise<AccountApiResult<AccountAccessToken>>
}

export function useMetamaskAccount(): UseMetamaskAccount {
  const { account, chainId, library, switchNetwork } = useEthers()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAccessToken] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)
  const { getWalletSignCode } = useCommonWalletAccount()

  const getWalletSignSignature = React.useCallback(
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
    const code = await getWalletSignCode(account)
    if (!code) return { isOk: false, data: null, error: new Error('No signature code.') }
    const sig = await getWalletSignSignature(code)
    if (!sig) return { isOk: false, data: null, error: new Error('No sign signature.') }
    const res = await doMetamaskLogin(account, sig)
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [account, getWalletSignCode, getWalletSignSignature, setAccessToken])

  const walletBind = React.useCallback<UseMetamaskAccount['walletBind']>(async () => {
    if (!account) return { isOk: false, data: null, error: new Error('No wallet address.') }
    const code = await getWalletSignCode(account)
    if (!code) return { isOk: false, data: null, error: new Error('No signature code.') }
    const sig = await getWalletSignSignature(code)
    if (!sig) return { isOk: false, data: null, error: new Error('No sign signature.') }
    const res = await bindMetamaskAddress(account, sig)
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [account, getWalletSignCode, getWalletSignSignature, setAccessToken])

  const walletUnbind = React.useCallback<UseMetamaskAccount['walletUnbind']>(async () => {
    const res = await unbindMetamaskAddress()
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [setAccessToken])

  return { walletLogin, walletBind, walletUnbind }
}

type UseImmutableXAccount = {
  walletLogin: () => Promise<AccountApiResult<AccountAccessToken>>
  walletBind: () => Promise<AccountApiResult<AccountAccessToken>>
  walletUnbind: () => Promise<AccountApiResult<AccountAccessToken>>
}

export function useImmutableXAccount(): UseImmutableXAccount {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAccessToken] = useLocalStorageState<string>(LSK_ACCESS_TOKEN)
  const { getWalletSignCode } = useCommonWalletAccount()
  const { imxLink, walletInfo } = useImmutableXWallet()

  const getWalletSignSignature = React.useCallback(
    async (code: string) => {
      if (!imxLink || !walletInfo) return null
      const message = `\x19Ethereum Signed Message:\n Code Length: ${code.length}; Code: ${code}`
      const { result: signature } = await imxLink.sign({ message, description: message })
      console.debug('account', walletInfo.address, 'signature', signature)
      return signature
    },
    [imxLink, walletInfo]
  )

  const walletLogin = React.useCallback<UseImmutableXAccount['walletLogin']>(async () => {
    if (!walletInfo) return { isOk: false, data: null, error: new Error('No wallet address.') }
    const code = await getWalletSignCode(walletInfo.address)
    if (!code) return { isOk: false, data: null, error: new Error('No signature code.') }
    const sig = await getWalletSignSignature(code)
    if (!sig) return { isOk: false, data: null, error: new Error('No sign signature.') }
    const res = await doMetamaskLogin(walletInfo.address, sig)
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [getWalletSignCode, getWalletSignSignature, setAccessToken, walletInfo])

  const walletBind = React.useCallback<UseImmutableXAccount['walletBind']>(async () => {
    if (!walletInfo) return { isOk: false, data: null, error: new Error('No wallet address.') }
    const code = await getWalletSignCode(walletInfo.address)
    if (!code) return { isOk: false, data: null, error: new Error('No signature code.') }
    const sig = await getWalletSignSignature(code)
    if (!sig) return { isOk: false, data: null, error: new Error('No sign signature.') }
    const res = await bindMetamaskAddress(walletInfo.address, sig)
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [getWalletSignCode, getWalletSignSignature, setAccessToken, walletInfo])

  const walletUnbind = React.useCallback<UseImmutableXAccount['walletUnbind']>(async () => {
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

export function useAccountName(username: string | null | undefined) {
  const value = useMemo<string>(() => {
    try {
      return username && isAddress(username) ? shortenIfAddress(username) : username || 'Name'
    } catch (error) {
      const e = `'useAccountName error: ${error}`
      console.error(e)

      return 'Name'
    }
  }, [username])

  return value
}

export function useAccountEmail({
  email,
  wallet,
}: {
  email: string | null | undefined
  wallet: string | null | undefined
}) {
  const value = useMemo<string>(() => {
    try {
      return email || (wallet && isAddress(wallet) ? shortenIfAddress(wallet) : '-')
    } catch (error) {
      const e = `'useAccountEmail error: ${error}`
      console.error(e)
      Sentry.captureException(e)

      return '-'
    }
  }, [email, wallet])

  return value
}
