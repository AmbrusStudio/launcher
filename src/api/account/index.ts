import { AccountAccessToken, AccountApiResult, EmailVerificationTypes } from '../../types'
import { accountBackendRequest } from '../axios'

type AccountResponseError = {
  statusCode: number
  message: string
  error?: string
}

type MetamaskCode = {
  code: string
}

export async function getMetamaskCode(address: string): Promise<AccountApiResult<MetamaskCode>> {
  const res = await accountBackendRequest.post<MetamaskCode>('/metamask/code', { address })
  if (res.status === 200) return { isOk: true, data: res.data, error: null }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

type MetamaskLogin = AccountAccessToken

export async function doMetamaskLogin(address: string, signature: string): Promise<AccountApiResult<MetamaskLogin>> {
  const res = await accountBackendRequest.post<MetamaskLogin>('/metamask/login', { address, signature })
  if (res.status === 200) return { isOk: true, data: res.data, error: null }
  if (res.status === 400) return { isOk: false, data: null, error: new Error('No preceding code request') }
  if (res.status === 401) return { isOk: false, data: null, error: new Error('Invalid signature') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

export async function bindMetamaskAddress(
  address: string,
  signature: string
): Promise<AccountApiResult<MetamaskLogin>> {
  const res = await accountBackendRequest.post<MetamaskLogin>('/metamask/bind', { address, signature })
  if (res.status === 201) return { isOk: true, data: res.data, error: null }
  if (res.status === 400) return { isOk: false, data: null, error: new Error('No preceding code request') }
  if (res.status === 401) return { isOk: false, data: null, error: new Error('Unauthorized or Invalid signature') }
  if (res.status === 409) return { isOk: false, data: null, error: new Error('Wallet used') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

export async function unbindMetamaskAddress(): Promise<AccountApiResult<MetamaskLogin>> {
  const res = await accountBackendRequest.post<MetamaskLogin>('/metamask/unbind')
  if (res.status === 201) return { isOk: true, data: res.data, error: null }
  if (res.status === 401) return { isOk: false, data: null, error: new Error('Unauthorized or Account not found') }
  if (res.status === 409) return { isOk: false, data: null, error: new Error('Not available for non email account') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

export async function sendVerifyEmail(
  type: EmailVerificationTypes,
  address: string,
  subscription = false
): Promise<AccountApiResult<void>> {
  const res = await accountBackendRequest.post<void>('/email/send-verification', { type, address, subscription })
  if (res.status === 201) return { isOk: true, data: res.data, error: null }
  if (res.status === 409) return { isOk: false, data: null, error: new Error('Requests too often') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

export async function verifyVerificationCode(code: string, address: string): Promise<AccountApiResult<void>> {
  const res = await accountBackendRequest.post<void>('/email/verification-code/verify', { code, address })
  if (res.status === 200) return { isOk: true, data: res.data, error: null }
  // Verification code not found & Verification code for this address not found
  if (res.status === 404) return { isOk: false, data: null, error: new Error('Verification code expired') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

type EmailRegister = AccountAccessToken

type RegisterWithEmailParams = {
  address: string
  password: string
  code: string
  username: string
}

export async function registerWithEmail(params: RegisterWithEmailParams): Promise<AccountApiResult<EmailRegister>> {
  const res = await accountBackendRequest.post<EmailRegister | AccountResponseError>('/email/register', params)
  if (res.status === 201) return { isOk: true, data: res.data as EmailRegister, error: null }
  if (res.status === 400) return { isOk: false, data: null, error: new Error('Email mismatch') }
  if (res.status === 403) return { isOk: false, data: null, error: new Error('Username contains illegal characters') }
  if (res.status === 404) return { isOk: false, data: null, error: new Error('Verification code expired') }
  if (res.status === 409)
    return {
      isOk: false,
      data: null,
      error: new Error((res.data as AccountResponseError).message || 'Email or Username used'),
    }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

type EmailLogin = AccountAccessToken

export async function doEmailLogin(address: string, password: string): Promise<AccountApiResult<EmailLogin>> {
  const res = await accountBackendRequest.post<EmailLogin>('/email/login', { address, password })
  if (res.status === 200) return { isOk: true, data: res.data, error: null }
  if (res.status === 401) return { isOk: false, data: null, error: new Error('Incorrect email or password') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

export async function resetPassword(code: string, address: string, password: string): Promise<AccountApiResult<void>> {
  const res = await accountBackendRequest.post<void>('/email/reset-password', { code, address, password })
  if (res.status === 200) return { isOk: true, data: res.data, error: null }
  if (res.status === 400) return { isOk: false, data: null, error: new Error('Email mismatch') }
  if (res.status === 401) return { isOk: false, data: null, error: new Error('Account not found') }
  if (res.status === 404) return { isOk: false, data: null, error: new Error('Verification code expired') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

export async function updatePassword(oldPassword: string, newPassword: string): Promise<AccountApiResult<void>> {
  const res = await accountBackendRequest.put<void>('/email/password', { oldPassword, newPassword })
  if (res.status === 200) return { isOk: true, data: res.data, error: null }
  if (res.status === 401) return { isOk: false, data: null, error: new Error('Incorrect old password') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

export async function checkUsername(username: string): Promise<AccountApiResult<void>> {
  const res = await accountBackendRequest.post<void>('/account/username/is-available', { username })
  if (res.status === 201) return { isOk: true, data: res.data, error: null }
  if (res.status === 403) return { isOk: false, data: null, error: new Error('Username contains illegal characters') }
  if (res.status === 409) return { isOk: false, data: null, error: new Error('Username not available') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}
