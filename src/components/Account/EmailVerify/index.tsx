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
        'w-48px h-48px md:w-60px md:h-60px border-1px bg-white rounded-4px',
        'font-semibold text-24px md:text-32px leading-24px md:leading-32px text-grey-dark text-center',
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

type DigitInputsHandle = {
  handleCodeReset: () => void
}

const DigitInputs = React.forwardRef(function useDigitInputs(_, ref) {
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

  const handleCodeReset = React.useCallback(() => {
    setCode('')
    setValue('verifyCode', '')
  }, [setValue])

  React.useImperativeHandle<unknown, DigitInputsHandle>(ref, () => ({ handleCodeReset }), [handleCodeReset])

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
})

const resendTime = 60

export type AccountEmailVerifyProps = AccountCommonProps & {
  onResendClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function AccountEmailVerify(props: AccountEmailVerifyProps) {
  const { onNextButtonSubmit, onResendClick } = props
  const [timeLeft, setTimeLeft] = React.useState(resendTime)
  const intervalRef = React.useRef<ReturnType<typeof setInterval>>()
  const digitInputsRef = React.useRef<DigitInputsHandle>()

  const canResend = timeLeft <= 0

  const stopTimer = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const handleResendEmail = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      if (digitInputsRef.current) digitInputsRef.current.handleCodeReset()
      if (onResendClick) onResendClick(e)
      setTimeLeft(resendTime)
    },
    [onResendClick]
  )

  React.useEffect(() => {
    if (timeLeft <= 0) stopTimer()
    intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(intervalRef.current)
  }, [stopTimer, timeLeft])

  return (
    <form className="flex flex-col gap-36px" onSubmit={onNextButtonSubmit}>
      <AccountTips>
        <p>We have sent a verification code to your email address. Please enter it below.</p>
      </AccountTips>
      <DigitInputs ref={digitInputsRef} />
      <div className="flex flex-col gap-24px">
        <Button variant="primary" type="submit">
          Next
        </Button>
        <Button variant="secondary" disabled={!canResend} onClick={handleResendEmail}>
          Send again{!canResend && ` (${timeLeft}s)`}
        </Button>
      </div>
    </form>
  )
}
