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
  return await unstakeBackendRequest.post<T>(`/nft-holder/unstake`, {
    data: { owner, tokenAddress, tokenId, signature },
  })
}

/**
 * Get ImmutableX OriginalOwner Api
 * @param param
 * @returns
 */
export async function getImmutableXOriginalOwnerApi<T = unknown>(tokenId: string) {
  console.log('getImmutableXOriginalOwnerApi', tokenId)
  return await unstakeBackendRequest.post<T>(`/nft-holder/originalOwner`, {
    data: { tokenId },
  })
}

/**
 * Get ImmutableX Upgraded Api
 * @param tokenId
 * @returns
 */
export async function getImmutableXUpgradedApi<T = unknown>(tokenId: string) {
  console.log('getImmutableXUpgradedApi', tokenId)
  return await unstakeBackendRequest.post<T>(`/nft-holder/upgraded`, {
    data: { tokenId },
  })
}
