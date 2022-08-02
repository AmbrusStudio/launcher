import { Config, DAppProvider, Mainnet, Rinkeby } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
}

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
  },
}

export function Provider({ children }: ProvidersProps) {
  return <DAppProvider config={config}>{children}</DAppProvider>
}
