import { useEthers } from '@usedapp/core'
import React from 'react'

import { getDefaultChainId } from '../utils'

type UseMetamaskSign = {
  getMetamaskSignSignature: (code: string) => Promise<string | null>
}

export function useMetamaskSign(): UseMetamaskSign {
  const { account, chainId, library, switchNetwork } = useEthers()

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
      return signature
    },
    [account, chainId, library, switchNetwork]
  )

  return { getMetamaskSignSignature }
}
