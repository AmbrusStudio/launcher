import { AccountCommonProps } from '../../../types'
import { Button, Input } from '../../Forms'

export type AccountUsernameAndPasswordProps = AccountCommonProps & FogotPasswordProps

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
  const { onNextClick, onFogotPasswordClick } = props
  return (
    <div className="flex flex-col gap-24px">
      <Input id="email" label="Username/Email" placeholder="example@gmail.com" required />
      <Input
        id="password"
        type="password"
        label="Password"
        autoComplete="on"
        minLength={8}
        placeholder="Enter password here"
        labelRightElement={<FogotPassword onFogotPasswordClick={onFogotPasswordClick} />}
        required
      />
      <Button variant="primary" onClick={onNextClick}>
        Next
      </Button>
    </div>
  )
}
