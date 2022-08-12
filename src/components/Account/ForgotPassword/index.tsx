import { AccountCommonProps } from '../../../types'
import { Button, Input } from '../../Forms'

export type AccountForgotPasswordProps = AccountCommonProps

export function AccountForgotPassword(props: AccountForgotPasswordProps) {
  const { onNextClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <Input id="email" label="Email" placeholder="example@gmail.com" required />
      <Button variant="primary" onClick={onNextClick}>
        Next
      </Button>
    </div>
  )
}
