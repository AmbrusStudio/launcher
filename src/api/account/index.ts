import { AccountAccessToken, AccountApiResult, EmailVerificationTypes } from '../../types'
import { accountBackendRequest } from '../axios'

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

export async function bindMetamaskAddress(address: string, signature: string): Promise<AccountApiResult<void>> {
  const res = await accountBackendRequest.post<void>('/metamask/bind', { address, signature })
  if (res.status === 200) return { isOk: true, data: res.data, error: null }
  if (res.status === 400) return { isOk: false, data: null, error: new Error('No preceding code request') }
  if (res.status === 401) return { isOk: false, data: null, error: new Error('Unauthorized or Invalid signature') }
  if (res.status === 409) return { isOk: false, data: null, error: new Error('Wallet used') }
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

type EmailRegister = AccountAccessToken

type RegisterWithEmailParams = {
  address: string
  password: string
  code: string
  nickname: string
}

export async function registerWithEmail(params: RegisterWithEmailParams): Promise<AccountApiResult<EmailRegister>> {
  const res = await accountBackendRequest.post<EmailRegister>('/email/register', params)
  if (res.status === 201) return { isOk: true, data: res.data, error: null }
  if (res.status === 400) return { isOk: false, data: null, error: new Error('Email mismatch') }
  if (res.status === 404) return { isOk: false, data: null, error: new Error('Verification code expired') }
  if (res.status === 409) return { isOk: false, data: null, error: new Error('Email used') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}

type EmailLogin = AccountAccessToken

export async function doEmailLogin(address: string, password: string): Promise<AccountApiResult<EmailLogin>> {
  const res = await accountBackendRequest.post<MetamaskLogin>('/email/login', { address, password })
  if (res.status === 200) return { isOk: true, data: res.data, error: null }
  if (res.status === 401) return { isOk: false, data: null, error: new Error('Incorrect email or password') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}
