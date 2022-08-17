export enum WALLET_NAME {
  MetaMask = 'MetaMask',
  WalletConnect = 'WalletConnect',
}

export type WALLET = {
  logo: string
  name: WALLET_NAME
  description: string
}
