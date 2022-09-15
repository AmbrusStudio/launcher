import { useFormContext } from 'react-hook-form'

import { AccountCommonProps, AccountSignUpFormData } from '../../../types'
import {
  getFormErrorMessage,
  getMaxLengthValidationRule,
  getMinLengthValidationRule,
  getUsernameValidationPattern,
} from '../../../utils'
import { Button, Input } from '../../Forms'
import { AccountTips } from '../Tips'

export type AccountUsernameInputProps = AccountCommonProps & {
  disabled?: boolean
}

export function AccountUsernameInput(props: AccountUsernameInputProps) {
  const { disabled, onNextButtonSubmit } = props
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountSignUpFormData>()
  const minLength = getMinLengthValidationRule('Username', 5)
  const maxLength = getMaxLengthValidationRule('Username', 20)
  const pattern = getUsernameValidationPattern()

  return (
    <form className="flex flex-col gap-24px" onSubmit={onNextButtonSubmit}>
      <AccountTips>
        <p>Used to sign in and add friends. You cannot change your username later.</p>
      </AccountTips>
      <Input
        id="username"
        label="Username"
        required
        {...register('username', { required: 'You must specify an username.', minLength, maxLength, pattern })}
        error={getFormErrorMessage(errors.username)}
      />
      <Button variant="primary" type="submit" disabled={disabled}>
        Next
      </Button>
    </form>
  )
}
