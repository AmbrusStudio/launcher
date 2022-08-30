import { useFormContext } from 'react-hook-form'

import { AccountCommonProps, AccountForgotPasswordFormData } from '../../../types'
import { getFormErrorMessage } from '../../../utils'
import { Button, Input } from '../../Forms'

export type AccountForgotPasswordProps = AccountCommonProps & {
  disabled?: boolean
}

export function AccountForgotPassword(props: AccountForgotPasswordProps) {
  const { disabled, onNextButtonSubmit } = props
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountForgotPasswordFormData>()
  return (
    <form className="flex flex-col gap-24px" onSubmit={onNextButtonSubmit}>
      <Input
        id="email"
        label="Email"
        placeholder="example@gmail.com"
        required
        {...register('email', { required: true })}
        error={getFormErrorMessage(errors.email)}
      />
      <Button variant="primary" type="submit" disabled={disabled}>
        Next
      </Button>
    </form>
  )
}
