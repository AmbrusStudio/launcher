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

export type AccountFormData = {
  email: string
  agreement: boolean
  newsletter?: boolean
  verifyCode: string
  username: string
  password: string
  confirmPassword: string
}
