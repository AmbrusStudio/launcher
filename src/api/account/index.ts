import { AccountAccessToken, AccountApiResult } from '../../types'
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
  if (res.status === 401) return { isOk: false, data: null, error: new Error('Invalid signature') }
  if (res.status === 409) return { isOk: false, data: null, error: new Error('Wallet used') }
  return { isOk: false, data: null, error: new Error('Unkonwn error') }
}
