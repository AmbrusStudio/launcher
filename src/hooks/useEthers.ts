import { useEthers } from '@usedapp/core'
import React from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { bindMetamaskAddress, doMetamaskLogin, getMetamaskCode } from '../api'
import { LSK_ACCESS_TOKEN } from '../constants'
import { AccountAccessToken, AccountApiResult } from '../types'
import { getDefaultChainId } from '../utils'

type UseMetamaskAccount = {
  walletLogin: () => Promise<AccountApiResult<AccountAccessToken>>
  walletBind: () => Promise<AccountApiResult<void>>
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
    return await bindMetamaskAddress(account, sig)
  }, [account, getMetamaskSignCode, getMetamaskSignSignature])

  return { walletLogin, walletBind }
}
