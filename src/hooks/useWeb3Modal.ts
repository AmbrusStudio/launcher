import { useEthers } from '@usedapp/core'
import { useMount } from 'ahooks'
import React from 'react'
import store from 'store'
import Web3Modal from 'web3modal'

import { web3ModalProviderOptions } from '../contracts'
import { getDefaultChainId } from '../utils'

const defaultChainId = getDefaultChainId()

type UseWeb3Modal = {
  readonly chainIdMismatch: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  switchNetwork: () => Promise<void>
}

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: web3ModalProviderOptions,
})

export function useWeb3Modal(): UseWeb3Modal {
  const { chainId, activate, switchNetwork: dappSwitchNetwork, deactivate } = useEthers()

  const chainIdMismatch = chainId !== defaultChainId

  const connect = async () => {
    if (web3Modal.cachedProvider === 'walletconnect' && !store.get('walletconnect')) {
      await web3Modal.clearCachedProvider()
    }
    deactivate()
  }

    const provider = await web3Modal.connect()
    await activate(provider)
  }

  const disconnect = async () => {
    if (web3Modal.cachedProvider) {
      if (web3Modal.cachedProvider === 'walletconnect') {
        store.remove('walletconnect')
      }
      await web3Modal.clearCachedProvider()
    }
    deactivate()
  }

  const switchNetwork = React.useCallback(async () => {
    if (chainIdMismatch) await dappSwitchNetwork(defaultChainId)
    console.log('switch network')
    window.location.reload()
  }, [chainIdMismatch, dappSwitchNetwork])

  useMount(() => {
    if (web3Modal.cachedProvider) {
      if (web3Modal.cachedProvider === 'walletconnect' && !store.get('walletconnect')) {
        return
      }
      connect()
    }
  })

  return {
    get chainIdMismatch() {
      return chainIdMismatch
    },
    connect,
    disconnect,
    switchNetwork,
  }
}
