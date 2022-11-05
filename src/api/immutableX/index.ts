import { unstakeBackendRequest } from '../axios'

/**
 * ImmutableX unstake
 * @param param
 * @returns
 */
export async function immutableXUnstakeApi<T = unknown>({
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
  return await unstakeBackendRequest.post<T>(`/unstake`, { owner, tokenAddress, tokenId, signature })
}

/**
 * Get ImmutableX StakingStatus Api
 * @param tokenAddress
 * @param tokenId
 * @returns
 */
export async function getImmutableXStakingStatusApi<T = unknown>(tokenAddress: string, tokenId: string) {
  console.log('getImmutableXStakingStatusApi', tokenAddress, tokenId)
  return await unstakeBackendRequest.get<T>(`/stakingStatus`, {
    params: {
      tokenAddress,
      tokenId,
    },
  })
}
