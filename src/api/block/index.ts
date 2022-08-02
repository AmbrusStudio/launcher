import { serveRequest } from '../axios'

export async function getBlockInfoApi<T = unknown>(key: string) {
  return await serveRequest.get<T>(`/getBlockInfoApi?langId=14&key=${key}`)
}
