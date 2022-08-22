import { Button } from '../../Forms'
import { AccountContinueWithMetamask } from '../ContinueWithMetamask'
import { AccountTips } from '../Tips'

export type AccountConnectWalletProps = {
  account?: string
  metamaskButtonDisabled?: boolean
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
  onSkipClick: React.MouseEventHandler<HTMLButtonElement>
}

export function AccountConnectWallet(props: AccountConnectWalletProps) {
  const { account, metamaskButtonDisabled = false, onMetamaskClick, onSkipClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountTips>
        <p>
          All your on-chain assets will be stored in your wallet. You can change your wallet connected to your E4C
          Account in the future.
        </p>
      </AccountTips>
      <AccountContinueWithMetamask account={account} disabled={metamaskButtonDisabled} onClick={onMetamaskClick} />
      <Button variant="secondary" onClick={onSkipClick}>
        Skip for now
      </Button>
    </div>
  )
}
