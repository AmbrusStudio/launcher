import detectEthereumProvider from '@metamask/detect-provider'
import { useEthers as useDAppEthers, Web3Ethers } from '@usedapp/core'
import { ethers } from 'ethers'
import React from 'react'

import { getDefaultChainId } from '../utils'

type UseWeb3Ethers = Omit<Web3Ethers, 'activateBrowserWallet'> & {
  activateBrowserWallet: () => Promise<void>
}

export function useEthers(): UseWeb3Ethers {
  const { activate, ...others } = useDAppEthers()

  const activateBrowserWallet = async () => {
    const provider = await detectEthereumProvider()
    if (provider) await activate(provider as ethers.providers.ExternalProvider)
  }

  return { ...others, activate, activateBrowserWallet }
}

type UseMetamaskSign = {
  getMetamaskSignSignature: (code: string) => Promise<string | null>
}

export function useMetamaskSign(): UseMetamaskSign {
  const { account, chainId, library, activateBrowserWallet, switchNetwork } = useEthers()

  const getMetamaskSignSignature = React.useCallback(
    async (code: string) => {
      await activateBrowserWallet()
      const defaultChainId = getDefaultChainId()
      // Don't know why cause UseDApp throw 'underlying network changed' error.
      if (chainId !== defaultChainId) await switchNetwork(defaultChainId)
      if (!(account && library)) return null
      const signer = library.getSigner()
      const signature = await signer.signMessage(
        `\x19Ethereum Signed Message:\n Code Length: ${code.length}; Code: ${code}`
      )
      return signature
    },
    [account, activateBrowserWallet, chainId, library, switchNetwork]
  )

  return { getMetamaskSignSignature }
}
