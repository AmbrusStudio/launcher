import { Button } from '../../Forms'
import { IconAccept } from '../../Icon'
import { AccountTips } from '../Tips'

export type AccountResetPasswordCompleteProps = {
  onCompleteClick: React.MouseEventHandler<HTMLButtonElement>
}

export function AccountResetPasswordComplete(props: AccountResetPasswordCompleteProps) {
  const { onCompleteClick } = props
  return (
    <div className="flex flex-col">
      <div className="mx-auto mb-48px">
        <IconAccept className="w-120px h-120px" />
      </div>
      <div className="flex flex-col gap-24px">
        <AccountTips className="text-center">
          <p>Your password has been reset successfully.</p>
        </AccountTips>
        <Button variant="primary" onClick={onCompleteClick}>
          Sign In
        </Button>
      </div>
    </div>
  )
}
