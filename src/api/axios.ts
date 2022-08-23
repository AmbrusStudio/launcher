import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Axios, { AxiosError } from 'axios'

import { LSK_ACCESS_TOKEN } from '../constants'

class MainBackendRequest {
  public readonly client: AxiosInstance

  constructor(private readonly baseURL: string) {
    if (!baseURL) throw new TypeError('baseURL is required.')
    this.client = Axios.create({
      baseURL: this.baseURL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 60 * 1000,
    })
    this.client.interceptors.request.use(this.onRequestFulfilled.bind(this), this.onRejected.bind(this))
    this.client.interceptors.response.use(this.onResponseFulfilled.bind(this), this.onRejected.bind(this))
  }

  private async onRequestFulfilled(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    return config
  }

  private async onResponseFulfilled(response: AxiosResponse): Promise<AxiosResponse> {
    const res = response.data
    if (res.code !== 200) {
      if (res.code === 500) {
        console.info(`服务请求出错: ${res.msg}`, 3)
      } else {
        console.info(`服务请求失败，请联系管理员：${res.msg}`, 3)
      }
      return Promise.reject(res.msg)
    }
    return response.data
  }

  private async onRejected(error: AxiosError<Error>): Promise<AxiosResponse> {
    if (error.response) {
      console.info('接口响应失败，请联系管理员', 5)
    }
    if (String(error).includes('timeout')) {
      console.info('请求超时', 5)
    }
    return Promise.reject(error)
  }
}

class AccountBackendRequest {
  public readonly client: AxiosInstance

  constructor(private readonly baseURL: string) {
    if (!baseURL) throw new TypeError('baseURL is required.')
    this.client = Axios.create({
      baseURL: this.baseURL,
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true,
    })
    this.client.interceptors.request.use(this.onRequestFulfilled.bind(this))
  }

  private async onRequestFulfilled(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    if (localStorage) {
      const token = localStorage.getItem(LSK_ACCESS_TOKEN)
      if (token) {
        config.headers = Object.assign({}, config.headers, { Authorization: token })
      }
    }
    return config
  }
}

function getAPIBaseUrl(path: string): string {
  const baseUrl: string | undefined = import.meta.env.VITE_BACKEND_API_URL
  if (!baseUrl) throw new TypeError('VITE_BACKEND_API_URL not set')
  return new URL(path, baseUrl).href
}

const _mainBackendRequest = new MainBackendRequest(getAPIBaseUrl('/api/v1'))
export const mainBackendRequest = _mainBackendRequest.client

const _accountBackendRequest = new AccountBackendRequest(getAPIBaseUrl('/account-dev'))
export const accountBackendRequest = _accountBackendRequest.client
