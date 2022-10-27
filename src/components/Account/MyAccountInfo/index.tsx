import { useFormContext } from 'react-hook-form'

import { AccountInfoFormData } from '../../../types'
import {
  getFormErrorMessage,
  getMaxLengthValidationRule,
  getMinLengthValidationRule,
  getPasswordValidationPattern,
  getRequiredValidationRule,
  getUsernameValidationPattern,
} from '../../../utils'
import { Button, Input } from '../../Forms'
import { AccountCard } from '../Card'
import { AccountTips } from '../Tips'

type AccountMyAccountProps = {
  disabled?: boolean
  onSaveButtonSubmit: React.FormEventHandler<HTMLFormElement>
}

export function AccountMyAccountInfo(props: AccountMyAccountProps) {
  const { disabled, onSaveButtonSubmit } = props
  const {
    watch,
    register,
    formState: { errors, dirtyFields },
  } = useFormContext<AccountInfoFormData>()

  const usernameMinLength = getMinLengthValidationRule('Username', 5)
  const usernameMaxLength = getMaxLengthValidationRule('Username', 20)
  const usernamePattern = getUsernameValidationPattern()

  const oldPassword = watch('oldPassword', '')
  const newPassword = watch('newPassword', '')
  const confirmNewPassword = watch('confirmNewPassword', '')
  const isPasswordHasValue = Boolean(oldPassword || newPassword || confirmNewPassword)
  const isPasswordFieldsDirty = Boolean(
    dirtyFields.oldPassword || dirtyFields.newPassword || dirtyFields.confirmNewPassword
  )
  const isPasswordRequired = Boolean(isPasswordHasValue && isPasswordFieldsDirty)
  const isPasswordHasError = Boolean(errors.newPassword || errors.confirmNewPassword)
  const oldPasswordRequired = getRequiredValidationRule(isPasswordRequired, 'You must specify a password.')
  const newPasswordRequired = getRequiredValidationRule(isPasswordRequired, 'You must specify a new password.')
  const newPasswordMinLength = getMinLengthValidationRule('Password', 8)
  const newPasswordMaxLength = getMaxLengthValidationRule('Password', 20)
  const newPasswordPattern = getPasswordValidationPattern()
  const newPasswordValidator = (value: string) => {
    if (!newPasswordRequired) return undefined
    if (value !== oldPassword) return true
    return 'The new password cannot be the old one.'
  }

  return (
    <AccountCard title="E4C Account" className="md:min-w-350px xl:min-w-600px gap-24px">
      <form className="flex flex-col gap-24px" onSubmit={onSaveButtonSubmit}>
        <Input
          variant="dark"
          id="username"
          label="Username"
          placeholder="Username"
          autoComplete="username"
          required
          disabled
          {...register('username', {
            required: 'You must specify an username.',
            minLength: usernameMinLength,
            maxLength: usernameMaxLength,
            pattern: usernamePattern,
          })}
          error={getFormErrorMessage(errors.username)}
        />
        <div className="flex flex-col gap-12px">
          <Input
            variant="dark"
            id="old-password"
            type="password"
            label="Change Password"
            placeholder="Old Password"
            autoComplete="current-password"
            {...register('oldPassword', { required: oldPasswordRequired })}
            error={getFormErrorMessage(errors.oldPassword)}
          />
          <Input
            variant="dark"
            id="new-password"
            type="password"
            placeholder="New Password"
            autoComplete="new-password"
            {...register('newPassword', {
              required: newPasswordRequired,
              minLength: newPasswordMinLength,
              maxLength: newPasswordMaxLength,
              pattern: newPasswordPattern,
              validate: newPasswordValidator,
            })}
            error={getFormErrorMessage(errors.newPassword)}
          />
          <Input
            variant="dark"
            id="confirm-new-password"
            type="password"
            placeholder="Confirm New Password"
            autoComplete="new-password"
            {...register('confirmNewPassword', {
              validate: (value) => value === newPassword || 'The new passwords does not match.',
            })}
            error={getFormErrorMessage(errors.confirmNewPassword)}
          />
          {isPasswordRequired && isPasswordHasError && (
            <AccountTips className="!text-white">
              <ul>
                <li>Must contain at least 1 letter and 1 number.</li>
                <li>Password is at least 8 characters and cannot be longer than 20 characters.</li>
              </ul>
            </AccountTips>
          )}
        </div>
        <Button variant="primary" type="submit" disabled={disabled}>
          Save
        </Button>
      </form>
    </AccountCard>
  )
}
