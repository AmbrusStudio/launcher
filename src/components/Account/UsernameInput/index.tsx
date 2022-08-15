import { useFormContext } from 'react-hook-form'

import { AccountCommonProps, AccountSignUpFormData } from '../../../types'
import { getFormErrorMessage } from '../../../utils'
import { Button, Input } from '../../Forms'
import { AccountTips } from '../Tips'

export type AccountUsernameInputProps = AccountCommonProps

export function AccountUsernameInput(props: AccountUsernameInputProps) {
  const { onNextButtonSubmit } = props
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountSignUpFormData>()

  return (
    <form className="flex flex-col gap-24px" onSubmit={onNextButtonSubmit}>
      <AccountTips>
        <p>Used to sign in and add friends. You cannot change your username later.</p>
      </AccountTips>
      <Input
        id="username"
        label="Username"
        required
        {...register('username', {
          required: 'You must specify an username.',
          minLength: {
            value: 8,
            message: 'Username must have at least 8 characters.',
          },
        })}
        error={getFormErrorMessage(errors.username)}
      />
      <Button variant="primary" type="submit">
        Next
      </Button>
    </form>
  )
}
