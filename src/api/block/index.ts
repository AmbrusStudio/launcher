import { mainBackendRequest, unstakeBackendRequest } from '../axios'

export async function getBlockInfoApi<T = unknown>(key: string) {
  return await mainBackendRequest.get<T>(`/getBlockInfoApi?langId=14&key=${key}`)
}

/**
 * unstake
 * @param param
 * @returns
 */
export async function unstakeApi<T = unknown>({
  owner,
  tokenAddress,
  tokenId,
  signature,
}: {
  owner: string
  tokenAddress: string
  tokenId: string
  signature: string
}) {
  return await unstakeBackendRequest.post<T>(`/nft-holder`, {
    data: { owner, tokenAddress, tokenId, signature },
  })
}
