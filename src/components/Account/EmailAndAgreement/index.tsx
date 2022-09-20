import { useFormContext } from 'react-hook-form'

import { AccountCommonProps, AccountSignUpFormData } from '../../../types'
import { getEmailValidationPattern, getFormErrorMessage, getMaxLengthValidationRule } from '../../../utils'
import { Button, Checkbox, Input } from '../../Forms'
import { ExternalLink } from '../../Link'

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
          Check this box after you read and agree to our{' '}
          <ExternalLink to="https://docs.ambrus.studio/terms/" blank>
            Terms & Conditions
          </ExternalLink>
        </Checkbox>
        <Checkbox
          id="newsletter"
          {...register('newsletter', { value: false })}
          error={getFormErrorMessage(errors.newsletter)}
        >
          Check this box to subscribe to our newsletter
        </Checkbox>
      </div>
      <Button variant="primary" type="submit" disabled={disabled}>
        Next
      </Button>
    </form>
  )
}
