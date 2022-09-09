import { useEthers } from '@usedapp/core'
import React from 'react'
import Web3Modal from 'web3modal'

import { web3ModalProviderOptions } from '../components/Provider'
import { getDefaultChainId } from '../utils'

const defaultChainId = getDefaultChainId()

type UseWeb3Modal = {
  readonly chainIdMismatch: boolean
  connect: () => Promise<void>
  switchNetwork: () => Promise<void>
}

export function useWeb3Modal(): UseWeb3Modal {
  const { chainId, activate, switchNetwork: dappSwitchNetwork } = useEthers()

  const chainIdMismatch = chainId !== defaultChainId

  const connect = React.useCallback(async () => {
    const web3Modal = new Web3Modal({
      providerOptions: web3ModalProviderOptions,
    })

    // remove historical influence
    if (web3Modal.cachedProvider) {
      web3Modal.clearCachedProvider()
    }

    const provider = await web3Modal.connect()
    await activate(provider)
  }, [activate])

  const switchNetwork = React.useCallback(async () => {
    if (chainIdMismatch) await dappSwitchNetwork(defaultChainId)
  }, [chainIdMismatch, dappSwitchNetwork])

  return {
    get chainIdMismatch() {
      return chainIdMismatch
    },
    connect,
    switchNetwork,
  }
}
