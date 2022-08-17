import MetaMask from '../assets/images/wallet/MetaMask.svg'
import WalletConnect from '../assets/images/wallet/WalletConnect.svg'
import { WALLET, WALLET_NAME } from '../types'

export const WALLET_LIST: WALLET[] = [
  {
    logo: MetaMask,
    name: WALLET_NAME.MetaMask,
    description: 'Connect to your MetaMask Wallet',
  },
  {
    logo: WalletConnect,
    name: WALLET_NAME.WalletConnect,
    description: 'Scan with WalletConnect to connect',
  },
]
