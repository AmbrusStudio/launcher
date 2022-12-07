import React from 'react'
import ReactDom from 'react-dom'

import { usePortal } from '../../../hooks'
import { ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'
import { Button } from '../../Forms'
import { IconMetamack } from '../../Icon'
import { AccountCard } from '../Card'
import { AccountWalletButtonPopover } from '../WalletButtonPopover'

type MetamaskButtonProps = ReactButtonProps

function MetamaskButton(props: MetamaskButtonProps) {
  const { className, children, disabled, ...others } = props
  return (
    <AccountWalletButtonPopover disabled={disabled}>
      <Button
        variant="metamask"
        className={classNames('flex flex-row items-center relative', className)}
        disabled={disabled}
        {...others}
      >
        <IconMetamack className="absolute w-36px h-auto" />
        <span className="w-full">{children}</span>
      </Button>
    </AccountWalletButtonPopover>
  )
}

type AccountConnectWalletModalProps = {
  walletAccount?: string
  metamaskButtonDisabled?: boolean
  modalOpen: boolean
  onMetamaskClick: () => Promise<void>
  onModalClose: () => void
}

function AccountConnectWalletModal(props: AccountConnectWalletModalProps) {
  const { walletAccount, metamaskButtonDisabled, modalOpen, onMetamaskClick, onModalClose } = props
  const target = usePortal('account-connect-wallet-modal')
  const buttonText = walletAccount ? `Connect To ${walletAccount}` : 'Connect Wallet'

  const handleMetamaskClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.stopPropagation()
      await onMetamaskClick()
    },
    [onMetamaskClick]
  )
  const handleModalClose = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.stopPropagation()
      onModalClose()
    },
    [onModalClose]
  )

  return ReactDom.createPortal(
    <div
      className={classNames(
        'fixed top-0 left-0 z-40 overflow-auto',
        'w-full h-full transition-all opacity-0',
        !modalOpen && 'hidden',
        modalOpen && 'opacity-100'
      )}
    >
      <div className="w-full h-full xl:h-auto xl:mt-92px">
        <div className="flex flex-col drop-shadow-nft-modal w-full h-full xl:w-600px xl:mx-auto">
          <div className="flex flex-row flex-nowrap justify-between items-center p-24px xl:py-16px text-white bg-black-bg/80">
            <h4 className="font-bold text-16px xl:text-36px leading-20px xl:leading-44px uppercase">Connect Wallet</h4>
          </div>
          <div className="flex-1 bg-white/80">
            <div className="flex flex-col backdrop-blur-10px h-full p-24px xl:p-36px gap-24px">
              <p className="font-normal text-16px leading-30px text-tips">
                All your on-chain assets will be stored in your wallet. You can change your wallet connected to your E4C
                Account in the future.
              </p>
              <MetamaskButton disabled={metamaskButtonDisabled} onClick={handleMetamaskClick}>
                {buttonText}
              </MetamaskButton>
              <Button variant="secondary" type="button" onClick={handleModalClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    target
  )
}

type MyWalletProps = {
  bindAccount?: string
  walletAccount?: string
  metamaskButtonDisabled?: boolean
  disconnectButtonDisabled?: boolean
  onConnectWalletClick?: () => Promise<true | void>
  onDisconnectClick?: () => Promise<void>
}

export function AccountMyWallet(props: MyWalletProps) {
  const { bindAccount, walletAccount, metamaskButtonDisabled, disconnectButtonDisabled } = props
  const { onConnectWalletClick, onDisconnectClick } = props
  const [modalOpen, setModalOpen] = React.useState(false)
  const buttonText = bindAccount ? bindAccount : 'Connect Wallet'

  const handleMetamaskClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.stopPropagation()
      if (bindAccount || modalOpen) return
      setModalOpen(true)
    },
    [bindAccount, modalOpen]
  )
  const handleModalClose = React.useCallback(() => setModalOpen(false), [])
  const handleConnectWalletClick = React.useCallback(async () => {
    if (!onConnectWalletClick || !modalOpen) return
    const status = await onConnectWalletClick()
    if (status) setModalOpen(false)
  }, [modalOpen, onConnectWalletClick])
  const handleDisconnectClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.stopPropagation()
      if (!bindAccount || !onDisconnectClick) return
      await onDisconnectClick()
    },
    [bindAccount, onDisconnectClick]
  )

  return (
    <React.Fragment>
      <AccountCard title="My Wallet" className="gap-24px">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_624px] gap-36px">
          <p className="font-normal text-16px leading-30px text-greyMedium">
            To play with your rangers and weapons in games, or to set your E4C Rangers NFT as your avatar, please
            connect to your wallet. Each account can be connected to one wallet.
          </p>
          <div className="flex flex-col md:flex-row flex-nowrap items-center gap-12px md:gap-0">
            <MetamaskButton disabled={!!bindAccount || metamaskButtonDisabled} onClick={handleMetamaskClick}>
              {buttonText}
            </MetamaskButton>
            {bindAccount && (
              <Button
                variant="primary"
                className="md:w-233px hover:!bg-rust/85 hover:!text-white"
                disabled={disconnectButtonDisabled}
                onClick={handleDisconnectClick}
              >
                Disconnect
              </Button>
            )}
          </div>
        </div>
      </AccountCard>
      <AccountConnectWalletModal
        walletAccount={walletAccount}
        metamaskButtonDisabled={metamaskButtonDisabled}
        modalOpen={modalOpen}
        onModalClose={handleModalClose}
        onMetamaskClick={handleConnectWalletClick}
      />
    </React.Fragment>
  )
}
