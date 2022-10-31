import type { JWTPayload } from 'jose'

import type { RemoveIndex } from './utils'

export type AccountStepInfo = {
  title: string
  navBack: boolean
}

export type AccountCommonProps = {
  onNextButtonSubmit: React.FormEventHandler<HTMLFormElement>
}

export type AccountStepCommonProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export type AccountSignUpFormData = {
  email: string
  agreement: boolean
  newsletter?: boolean
  verifyCode: string
  username: string
  password: string
  confirmPassword: string
}

export type AccountSignInFormData = {
  email: string
  password: string
}

export type AccountForgotPasswordFormData = {
  email: string
  verifyCode: string
  password: string
  confirmPassword: string
}

export type AccountInfoFormData = {
  username: string
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export type AccountWithdrawModalFormData = {
  withdrawAmount: string
}

type ResultOk<T = unknown> = { isOk: true; data: T; error: null }
type ResultErr<E = unknown> = { isOk: false; data: null; error: E }

export type AccountApiResult<T = unknown, E = Error> = ResultOk<T> | ResultErr<E>

export type AccountAccessToken = {
  accessToken: string
}

export type AccountAccessTokenJWTPayload = RemoveIndex<JWTPayload> & {
  id: number
  email: string | null
  wallet: string | null
  username: string | null
}

export enum EmailVerificationTypes {
  Registration = 'registration',
  Recovery = 'recovery',
}

export type AccountAvatarInfo = {
  id: number
  image: string
}
