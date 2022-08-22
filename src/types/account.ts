export type StepInfo = {
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

type ResultOk<T = unknown> = { isOk: true; data: T; error: null }
type ResultErr<E = unknown> = { isOk: false; data: null; error: E }

export type AccountApiResult<T = unknown, E = Error> = ResultOk<T> | ResultErr<E>

export type AccountAccessToken = {
  accessToken: string
}
