import { AccountCommonProps, ReactInputProps } from '../../../types'
import { classNames } from '../../../utils'
import { Button } from '../../Forms'
import { AccountTips } from '../Tips'

type InputProps = ReactInputProps & { error?: string }

function Input(props: InputProps) {
  const { className, error, ...others } = props
  return (
    <input
      type="text"
      inputMode="numeric"
      className={classNames(
        'flex flex-row flex-nowrap items-center box-border',
        'w-60px h-60px border-1px bg-white rounded-4px',
        'font-semibold text-32px leading-32px text-grey-dark text-center',
        'placeholder:text-grey-medium hover:outline-none focus:outline-none',
        error && 'border-rust',
        !error && 'border-grey-medium hover:border-ligntGreen focus:border-ligntGreen',
        className
      )}
      {...others}
    />
  )
}

function DigitInputs() {
  return (
    <div className="grid grid-cols-6 gap-24px px-24px">
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </div>
  )
}

export type AccountEmailVerifyProps = AccountCommonProps

export function AccountEmailVerify(props: AccountEmailVerifyProps) {
  const { onNextClick } = props

  return (
    <div className="flex flex-col gap-36px">
      <AccountTips>
        <p>We have sent a verification code to your email address. Please enter it below.</p>
      </AccountTips>
      <DigitInputs />
      <div className="flex flex-col gap-24px">
        <Button variant="primary" onClick={onNextClick}>
          Next
        </Button>
        <Button variant="secondary" disabled>
          Send again (52s)
        </Button>
      </div>
    </div>
  )
}
