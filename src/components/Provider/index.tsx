import { Config, DAppProvider, Mainnet, Rinkeby } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

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
  const formMethods = useForm()
  return (
    <DAppProvider config={config}>
      <FormProvider {...formMethods}>{children}</FormProvider>
    </DAppProvider>
  )
}
