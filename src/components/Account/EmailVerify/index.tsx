import React from 'react'
import useDigitInput from 'react-digit-input'
import { useFormContext } from 'react-hook-form'

import { AccountCommonProps, AccountSignUpFormData, ReactInputProps } from '../../../types'
import { classNames, getFormErrorMessage } from '../../../utils'
import { Button } from '../../Forms'
import { AccountTips } from '../Tips'

type InputProps = ReactInputProps & { error?: string }

const Input = React.forwardRef<HTMLInputElement, InputProps>(function renderInput(props: InputProps, ref) {
  const { className, error, ...others } = props
  return (
    <input
      type="text"
      inputMode="numeric"
      className={classNames(
        'flex flex-row flex-nowrap items-center box-border',
        'w-48px h-48px xl:w-60px xl:h-60px border-1px bg-white rounded-4px',
        'font-semibold text-24px xl:text-32px leading-24px xl:leading-32px text-grey-dark text-center',
        'placeholder:text-grey-medium hover:outline-none focus:outline-none',
        error && 'border-rust',
        !error && 'border-grey-medium hover:border-ligntGreen focus:border-ligntGreen',
        className
      )}
      required
      {...others}
      ref={ref}
    />
  )
})

function DigitInputs() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<AccountSignUpFormData>()
  const [code, setCode] = React.useState('')
  const handleCodeChange = React.useCallback(
    (code: string) => {
      setCode(code)
      setValue('verifyCode', code)
    },
    [setValue]
  )
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 6,
    value: code,
    onChange: handleCodeChange,
  })
  const error = getFormErrorMessage(errors.verifyCode)

  return (
    <div className="flex flex-row flex-nowrap justify-between xl:px-24px">
      <Input autoFocus error={error} {...digits[0]} />
      <Input error={error} {...digits[1]} />
      <Input error={error} {...digits[2]} />
      <Input error={error} {...digits[3]} />
      <Input error={error} {...digits[4]} />
      <Input error={error} {...digits[5]} />
      <input
        id="verify-code"
        type="text"
        className="hidden"
        {...register('verifyCode', { required: true, minLength: 6, maxLength: 6, pattern: new RegExp('^[0-9]{6}$') })}
      />
    </div>
  )
}

export type AccountEmailVerifyProps = AccountCommonProps

export function AccountEmailVerify(props: AccountEmailVerifyProps) {
  const { onNextButtonSubmit } = props

  return (
    <form className="flex flex-col gap-36px" onSubmit={onNextButtonSubmit}>
      <AccountTips>
        <p>We have sent a verification code to your email address. Please enter it below.</p>
      </AccountTips>
      <DigitInputs />
      <div className="flex flex-col gap-24px">
        <Button variant="primary" type="submit">
          Next
        </Button>
        <Button variant="secondary" disabled>
          Send again (52s)
        </Button>
      </div>
    </form>
  )
}
