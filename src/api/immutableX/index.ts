import { ImmutableXL2Overall } from '../../types/immutableX'
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
  return await unstakeBackendRequest.get<T>(`/stakingStatus`, {
    params: {
      tokenAddress,
      tokenId,
    },
  })
}

/**
 * Get ImmutableX L2 Overall
 * @param param assress: wallet address
 * @returns
 */
export async function getImmutableXL2OverallApi<T = ImmutableXL2Overall[]>({ address }: { address: string }) {
  if (!address) {
    console.error('address is required')
    return []
  }

  const result = await unstakeBackendRequest.get<T>(`/l2Overall`, {
    params: {
      address,
    },
  })

  return result.data
}
