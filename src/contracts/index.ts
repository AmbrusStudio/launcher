import { Mainnet, Rinkeby } from '@usedapp/core'
import { Network } from 'alchemy-sdk'

export const ADDRESS_E4C_Rangers = {
  [Mainnet.chainId]: '',
  [Rinkeby.chainId]: '0x07E64dA6F2F62bc34Dcf1bb7d281c1977337d76b',
}
// AmbrusStudioRanger
export const ADDRESS_ASRS = {
  [Mainnet.chainId]: '',
  [Rinkeby.chainId]: '0x19Dd9D7899Cb03c3a0e12911121ADaED7a4648B8',
}

export const AlchemyNetworks = {
  [Mainnet.chainId]: Network.ETH_MAINNET,
  [Rinkeby.chainId]: Network.ETH_RINKEBY,
}
