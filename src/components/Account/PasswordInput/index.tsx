import { useFormContext } from 'react-hook-form'

import { AccountCommonProps, AccountSignUpFormData } from '../../../types'
import {
  getFormErrorMessage,
  getMaxLengthValidationRule,
  getMinLengthValidationRule,
  getPasswordValidationPattern,
} from '../../../utils'
import { Button, Input } from '../../Forms'
import { AccountTips } from '../Tips'

export type AccountPasswordInputProps = AccountCommonProps & {
  isNew?: boolean
}

export function AccountPasswordInput(props: AccountPasswordInputProps) {
  const { isNew, onNextButtonSubmit } = props
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<AccountSignUpFormData>()
  const currentPassword = watch('password', '')
  const minLength = getMinLengthValidationRule('Password', 8)
  const maxLength = getMaxLengthValidationRule('Password', 20)
  const pattern = getPasswordValidationPattern()

  return (
    <form className="flex flex-col gap-24px" onSubmit={onNextButtonSubmit}>
      <AccountTips>
        <ul>
          <li>Must contain at least 1 letter and 1 number.</li>
          <li>Password is at least 8 characters and cannot be longer than 20 characters.</li>
        </ul>
      </AccountTips>
      <Input
        id={isNew ? 'new-password' : 'password'}
        type="password"
        label={isNew ? 'New Password' : 'Password'}
        autoComplete="on"
        minLength={8}
        required
        {...register('password', { required: 'You must specify a password.', minLength, maxLength, pattern })}
        error={getFormErrorMessage(errors.password)}
      />
      <Input
        id="confirm-password"
        type="password"
        label={isNew ? 'Confirm New Password' : 'Confirm Password'}
        autoComplete="current-password"
        minLength={8}
        required
        {...register('confirmPassword', {
          validate: (value) => value === currentPassword || 'The passwords does not match.',
        })}
        error={getFormErrorMessage(errors.confirmPassword)}
      />
      <Button variant="primary" type="submit">
        Next
      </Button>
    </form>
  )
}
