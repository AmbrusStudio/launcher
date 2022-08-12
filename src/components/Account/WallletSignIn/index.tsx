import { AccountContinueWithMetamask } from '../ContinueWithMetamask'
import { AccountTips } from '../Tips'

export type AccountWallletSignInProps = {
  brandName: string
  onMetamaskClick: React.MouseEventHandler<HTMLButtonElement>
}

export function AccountWallletSignIn(props: AccountWallletSignInProps) {
  const { brandName, onMetamaskClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountTips>
        <p>
          Please click the button below and follow the steps on your browser wallet addon to sign in to {brandName}.
        </p>
      </AccountTips>
      <AccountContinueWithMetamask onClick={onMetamaskClick} />
    </div>
  )
}
