import { AccountCommonProps } from '../../../types'
import { Button, Input } from '../../Forms'
import { AccountTips } from '../Tips'

export type AccountPasswordInputProps = AccountCommonProps & {
  isNew?: boolean
}

export function AccountPasswordInput(props: AccountPasswordInputProps) {
  const { isNew, onNextClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <AccountTips>
        <ul>
          <li>Must contain at least 1 letter and 1 number.</li>
          <li>Password is at least 8 characters long.</li>
        </ul>
      </AccountTips>
      <Input
        id={isNew ? 'new-password' : 'password'}
        type="password"
        label={isNew ? 'New Password' : 'Password'}
        autoComplete="on"
        minLength={8}
        required
      />
      <Input
        id="confirm-password"
        type="password"
        label={isNew ? 'Confirm New Password' : 'Confirm Password'}
        autoComplete="current-password"
        minLength={8}
        required
      />
      <Button variant="primary" onClick={onNextClick}>
        Next
      </Button>
    </div>
  )
}
