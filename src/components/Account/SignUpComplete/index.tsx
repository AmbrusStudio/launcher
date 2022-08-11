import { Button } from '../../Forms'
import { IconAccept } from '../../Icon'
import { AccountTips } from '../Tips'

export type AccountSignUpCompleteProps = {
  onCompleteClick: React.MouseEventHandler<HTMLButtonElement>
}

export function AccountSignUpComplete(props: AccountSignUpCompleteProps) {
  const { onCompleteClick } = props
  return (
    <div className="flex flex-col">
      <div className="mx-auto mb-48px">
        <IconAccept className="w-120px h-120px" />
      </div>
      <div className="flex flex-col gap-24px">
        <AccountTips className="text-center">
          <p>Your account has been successfully created!</p>
        </AccountTips>
        <Button variant="primary" onClick={onCompleteClick}>
          Go to Account Center
        </Button>
      </div>
    </div>
  )
}
