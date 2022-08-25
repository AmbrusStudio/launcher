import { useFormContext } from 'react-hook-form'

import { AccountCommonProps, AccountSignInFormData } from '../../../types'
import { getFormErrorMessage } from '../../../utils'
import { Button, Input } from '../../Forms'

export type AccountUsernameAndPasswordProps = AccountCommonProps &
  FogotPasswordProps & {
    disabled?: boolean
  }

type FogotPasswordProps = {
  onFogotPasswordClick: React.MouseEventHandler<HTMLButtonElement>
}

function FogotPassword(props: FogotPasswordProps) {
  const { onFogotPasswordClick } = props
  return (
    <button className="font-normal text-rust underline uppercase" onClick={onFogotPasswordClick}>
      Forgot Password?
    </button>
  )
}

export function AccountUsernameAndPassword(props: AccountUsernameAndPasswordProps) {
  const { disabled = false, onNextButtonSubmit, onFogotPasswordClick } = props
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountSignInFormData>()

  return (
    <form className="flex flex-col gap-24px" onSubmit={onNextButtonSubmit}>
      <Input
        id="email"
        label="Username/Email"
        placeholder="example@gmail.com"
        required
        {...register('email', { required: true })}
        error={getFormErrorMessage(errors.email)}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        autoComplete="on"
        minLength={8}
        placeholder="Enter password here"
        labelRightElement={<FogotPassword onFogotPasswordClick={onFogotPasswordClick} />}
        required
        {...register('password', { required: 'You must specify a password.' })}
      />
      <Button variant="primary" type="submit" disabled={disabled}>
        Next
      </Button>
    </form>
  )
}
