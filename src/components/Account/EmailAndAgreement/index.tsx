import { useFormContext } from 'react-hook-form'

import { AccountCommonProps, AccountSignUpFormData } from '../../../types'
import { getEmailValidationPattern, getFormErrorMessage, getMaxLengthValidationRule } from '../../../utils'
import { Button, Checkbox, Input } from '../../Forms'

export type AccountEmailAndAgreementProps = AccountCommonProps & {
  disabled?: boolean
}

export function AccountEmailAndAgreement(props: AccountEmailAndAgreementProps) {
  const { disabled, onNextButtonSubmit } = props
  const {
    register,
    formState: { errors },
  } = useFormContext<AccountSignUpFormData>()
  const maxLength = getMaxLengthValidationRule('Email', 255)
  const pattern = getEmailValidationPattern()

  return (
    <form className="flex flex-col gap-24px" onSubmit={onNextButtonSubmit}>
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="example@gmail.com"
        required
        {...register('email', { required: true, maxLength, pattern })}
        error={getFormErrorMessage(errors.email)}
      />
      <div className="flex flex-col gap-12px">
        <Checkbox
          id="agreement"
          {...register('agreement', { required: true })}
          error={getFormErrorMessage(errors.agreement)}
        >
          Check this box after you read and agree to our <a href="#">Privacy Policy</a> and{' '}
          <a href="#">User Agreement</a>
        </Checkbox>
        <Checkbox
          id="newsletter"
          {...register('newsletter', { value: false })}
          error={getFormErrorMessage(errors.newsletter)}
        >
          Check this box to subscribe to your newsletter
        </Checkbox>
      </div>
      <Button variant="primary" type="submit" disabled={disabled}>
        Next
      </Button>
    </form>
  )
}
