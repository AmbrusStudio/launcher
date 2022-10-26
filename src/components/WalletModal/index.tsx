import Dialog from '@mui/material/Dialog'
import { useEthers } from '@usedapp/core'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { FC, useCallback } from 'react'

import { WALLET_LIST } from '../../data'
import { WALLET_NAME } from '../../types'
import { getDefaultChainId, getViteEnv } from '../../utils'

interface WalletModalProps {
  readonly visible: boolean
  onModalClose: () => void
}

const WalletModal: FC<WalletModalProps> = ({ visible, onModalClose }) => {
  const { activateBrowserWallet, switchNetwork, chainId, activate } = useEthers()

  /**
   * MetaMask
   */
  const handleWalletConnect = useCallback(async () => {
    activateBrowserWallet()
    const defaultChainId = getDefaultChainId()
    if (chainId !== defaultChainId) {
      await switchNetwork(defaultChainId)
    }
    onModalClose()
  }, [activateBrowserWallet, chainId, onModalClose, switchNetwork])

  /**
   * WalletConnect
   */
  const walletConnectFn = useCallback(async () => {
    try {
      const infuraId = getViteEnv('VITE_INFURA_API_KEY')
      const provider = new WalletConnectProvider({ infuraId: infuraId })
      await provider.enable()
      await activate(provider)

      onModalClose()
    } catch (error) {
      console.error(error)
      alert('An error occurred, please refresh and try again.')
    }
  }, [activate, onModalClose])

  /**
   * Wallet select
   */
  const walletSelect = useCallback(
    (key: string) => {
      if (key === WALLET_NAME.MetaMask) {
        handleWalletConnect()
      } else if (key === WALLET_NAME.WalletConnect) {
        walletConnectFn()
      }
    },
    [walletConnectFn, handleWalletConnect]
  )

  return (
    <Dialog open={visible} onClose={() => onModalClose()}>
      <div className="max-w-[400px]">
        {WALLET_LIST.map((wallet, index) => (
          <div
            className="rounded-none border-solid border flex flex-col items-center justify-center p-2 w-full border-[#c3c3c3]/14 text-center"
            key={index}
            onClick={() => walletSelect(wallet.name)}
          >
            <div className="w-full bg-white hover-bg-[#c3c3c3]/14 cursor-pointer rounded-xl flex flex-col items-center justify-center px-4 py-4 transition-[bg] duration-200 ease-in-out delay-0">
              <div className="flex items-center justify-center overflow-visible shadow-none w-[45px] h-[45px]">
                <img src={wallet.logo} alt={wallet.name} />
              </div>
              <div className="font-bold text-2xl mt-3 text-[#0c0c0d]">{wallet.name}</div>
              <div className="text-lg mx-0 my-[6px] w-full text-[#a9a9bc]">{wallet.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Dialog>
  )
}

export default WalletModal
