import { ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'
import { Button } from '../../Forms'
import { IconMetamack } from '../../Icon'
import { AccountCard } from '../Card'

type MetamaskButtonProps = ReactButtonProps

function MetamaskButton(props: MetamaskButtonProps) {
  const { className, children, ...others } = props
  return (
    <Button variant="metamask" className={classNames('flex flex-row items-center relative', className)} {...others}>
      <IconMetamack className="absolute w-36px h-auto" />
      <span className="w-full">{children}</span>
    </Button>
  )
}

type MyWalletProps = {
  account?: string
  metamaskButtonDisabled?: boolean
  disconnectButtonDisabled?: boolean
  onMetamaskClick?: React.MouseEventHandler<HTMLButtonElement>
  onDisconnectClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function AccountMyWallet(props: MyWalletProps) {
  const { account, metamaskButtonDisabled, disconnectButtonDisabled } = props
  const { onMetamaskClick, onDisconnectClick } = props
  const buttonText = account ? account : 'Connect Wallet'
  return (
    <AccountCard title="My Wallet" className="gap-24px">
      <div className="grid grid-cols-[1fr_624px] gap-36px">
        <p className="font-normal text-16px leading-30px text-greyMedium">
          To play with your rangers and weapons in games, or to set your E4C Rangers NFT as your avatar, please connect
          to your wallet. Each account can be connected to one wallet.
        </p>
        <div className="flex flex-row flex-nowrap items-center">
          <MetamaskButton disabled={metamaskButtonDisabled} onClick={onMetamaskClick}>
            {buttonText}
          </MetamaskButton>
          {account && (
            <Button
              variant="primary"
              className="w-233px hover:!bg-rust/85 hover:!text-white"
              disabled={disconnectButtonDisabled}
              onClick={onDisconnectClick}
            >
              Disconnect
            </Button>
          )}
        </div>
      </div>
    </AccountCard>
  )
}
