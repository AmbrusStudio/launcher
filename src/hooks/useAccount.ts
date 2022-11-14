import { ImmutableMethodResults } from '@imtbl/imx-sdk'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { getAddress, isAddress } from 'ethers/lib/utils'
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
import {
  E4CRanger_GoldEdition,
  E4CRanger_NftKindMap,
  E4CRanger_RangersEdition,
  E4CRanger_UltimateEdition,
} from '../contracts'
import {
  AccountAccessToken,
  AccountAccessTokenJWTPayload,
  AccountApiResult,
  AccountAvatarInfo,
  EmailVerificationTypes,
} from '../types'
import { getAccessTokenPayload, getDefaultChainId, isAccountTokenExpired } from '../utils'
import { useImmutableXWallet } from './useImmutableX'

async function getWalletSignCode(account: string): Promise<string | null> {
  if (!account) return null
  const res = await getMetamaskCode(account)
  if (res.isOk) return res.data.code
  return null
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
  }, [account, getWalletSignSignature, setAccessToken])

  const walletBind = React.useCallback<UseMetamaskAccount['walletBind']>(async () => {
    if (!account) return { isOk: false, data: null, error: new Error('No wallet address.') }
    const code = await getWalletSignCode(account)
    if (!code) return { isOk: false, data: null, error: new Error('No signature code.') }
    const sig = await getWalletSignSignature(code)
    if (!sig) return { isOk: false, data: null, error: new Error('No sign signature.') }
    const res = await bindMetamaskAddress(account, sig)
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [account, getWalletSignSignature, setAccessToken])

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
  }, [getWalletSignSignature, setAccessToken, walletInfo])

  const walletBind = React.useCallback<UseImmutableXAccount['walletBind']>(async () => {
    if (!walletInfo) return { isOk: false, data: null, error: new Error('No wallet address.') }
    const code = await getWalletSignCode(walletInfo.address)
    if (!code) return { isOk: false, data: null, error: new Error('No signature code.') }
    const sig = await getWalletSignSignature(code)
    if (!sig) return { isOk: false, data: null, error: new Error('No sign signature.') }
    const res = await bindMetamaskAddress(walletInfo.address, sig)
    if (res.isOk) setAccessToken(res.data.accessToken)
    return res
  }, [getWalletSignSignature, setAccessToken, walletInfo])

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
  const value = React.useMemo<string>(() => {
    if (!username) return 'Name'
    // ethers.utils.isAddress doesn't throw error and returns true if address is valid
    if (username.startsWith('0x') && isAddress(username)) return shortenIfAddress(username)
    return username
  }, [username])

  return value
}

type UseAccountEmailParams = {
  email: string | null | undefined
  wallet: string | null | undefined
}

export function useAccountEmail({ email, wallet }: UseAccountEmailParams) {
  const value = React.useMemo<string>(() => {
    if (email) return email
    // ethers.utils.isAddress doesn't throw error and returns true if address is valid
    if (wallet && isAddress(wallet)) return shortenIfAddress(wallet)
    return '-'
  }, [email, wallet])

  return value
}

type AccountAvatarInfoImageNullable = Omit<AccountAvatarInfo, 'imageUrl'> & {
  imageUrl: string | null
}

function avatarInfoImageFilter(info: AccountAvatarInfoImageNullable): info is AccountAvatarInfo {
  return info.imageUrl !== null && info.imageUrl !== undefined && !info.imageUrl.toLowerCase().includes('blindbox')
}

function assetToAvatarInfo(
  assets: PromiseSettledResult<ImmutableMethodResults.ImmutableGetAssetsResult['result']>
): AccountAvatarInfo[] {
  if (assets.status === 'rejected') return []
  if (!Array.isArray(assets.value)) return []

  console.debug('Asset to avatar info', 'assets result', assets.value)

  const allAssets = assets.value.map(({ token_address, token_id, image_url }) => ({
    kind: E4CRanger_NftKindMap[getAddress(token_address)],
    id: token_id,
    imageUrl: image_url,
  }))

  const filtered = allAssets.filter(avatarInfoImageFilter)
  return filtered
}

export function useAccountAvatarInfos() {
  const { imxClient } = useImmutableXWallet()
  const { account } = useAccountInfo()
  const [avatarInfos, setAvatarInfos] = React.useState<AccountAvatarInfo[]>([])

  const getUserAllAssets = React.useCallback(
    async (
      user: string,
      collection: string,
      result: ImmutableMethodResults.ImmutableGetAssetsResult['result'] = [],
      cursor?: string
    ) => {
      if (!imxClient) return []

      const assets = await imxClient.getAssets({ user, collection, cursor })
      result.push(...assets.result)
      console.debug(
        `Get user all assets user ${user} collection ${collection} assets length`,
        assets.result.length,
        'remaining',
        assets.remaining
      )

      if (assets.remaining) await getUserAllAssets(user, collection, result, assets.cursor)

      return result
    },
    [imxClient]
  )

  const fetchAccountAvatarInfos = React.useCallback(
    async (account: string) => {
      if (!imxClient || !account) return

      const getUserAllEditionsAssetsPromises = [
        getUserAllAssets(account, E4CRanger_UltimateEdition),
        getUserAllAssets(account, E4CRanger_GoldEdition),
        getUserAllAssets(account, E4CRanger_RangersEdition),
      ]
      const allResult = await Promise.allSettled(getUserAllEditionsAssetsPromises)

      console.debug('Fetch account avatar infos', 'account', account, 'all result', allResult)

      const allInfos = allResult.flatMap(assetToAvatarInfo)

      setAvatarInfos(allInfos)
    },
    [getUserAllAssets, imxClient]
  )

  React.useEffect(() => {
    if (account && account.wallet) fetchAccountAvatarInfos(account.wallet)
  }, [account, fetchAccountAvatarInfos])

  return avatarInfos
}
