import { AccountContinueWithMetamask } from '../ContinueWithMetamask'
import { AccountTips } from '../Tips'

export type AccountWallletSignInProps = {
  brandName: string
  account?: string
  disabled?: boolean
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
}

export function AccountWallletSignIn(props: AccountWallletSignInProps) {
  const { account, brandName, disabled = false, onMetamaskClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountTips>
        <p>
          Please click the button below and follow the steps on your browser wallet addon to sign in to {brandName}.
        </p>
      </AccountTips>
      <AccountContinueWithMetamask account={account} disabled={disabled} onClick={onMetamaskClick} />
    </div>
  )
}
