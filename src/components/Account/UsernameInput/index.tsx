import { AccountCommonProps } from '../../../types'
import { Button, Input } from '../../Forms'
import { AccountTips } from '../Tips'

export type AccountUsernameInputProps = AccountCommonProps

export function AccountUsernameInput(props: AccountUsernameInputProps) {
  const { onNextClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountTips>
        <p>Used to sign in and add friends. You cannot change your username later.</p>
      </AccountTips>
      <Input id="username" label="Username" required />
      <Button variant="primary" onClick={onNextClick}>
        Next
      </Button>
    </div>
  )
}
