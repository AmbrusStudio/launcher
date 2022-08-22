import { mainBackendRequest } from '../axios'

export async function getBlockInfoApi<T = unknown>(key: string) {
  return await mainBackendRequest.get<T>(`/getBlockInfoApi?langId=14&key=${key}`)
}
