import { isAddress } from 'ethers/lib/utils'

import { ImmutableXL2Overall } from '../../types/immutableX'
import { nftHiveBackendRequest, nftHolderBackendRequest } from '../axios'

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
  return await nftHolderBackendRequest.post<T>(`/unstake`, { owner, tokenAddress, tokenId, signature })
}

/**
 * Get ImmutableX StakingStatus Api
 * @param tokenAddress
 * @param tokenId
 * @returns
 */
export async function getImmutableXStakingStatusApi<T = unknown>(tokenAddress: string, tokenId: string) {
  return await nftHolderBackendRequest.get<T>(`/stakingStatus`, {
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

  if (!isAddress(address)) {
    console.error('not a valid address')
    return []
  }

  const result = await nftHolderBackendRequest.get<T>(`/l2Overall`, {
    params: {
      address,
    },
  })

  return result.data
}

/**
 * Get ImmutableX L2 Overall Hive
 * @param param assress: wallet address
 * @returns
 */
export async function getImmutableXL2OverallHiveApi<T = ImmutableXL2Overall[]>({ address }: { address: string }) {
  if (!address) {
    console.error('address is required')
    return []
  }

  if (!isAddress(address)) {
    console.error('not a valid address')
    return []
  }

  const result = await nftHiveBackendRequest.get<T>(`/l2Overall`, {
    params: {
      address,
    },
  })

  return [
    {
      tokenAddress: '0x2b79919a89ffa96d98ac126ff244a662f77fdc19',
      tokenId: '3',
      isStaking: false,
      originalOwner: '',
      stakingDuration: 0,
      totalStakingTime: 3024000000,
      isUpgraded: false,
    },
    {
      tokenAddress: '0x2b79919a89ffa96d98ac126ff244a662f77fdc19',
      tokenId: '4',
      isStaking: true,
      originalOwner: '',
      stakingDuration: 0,
      totalStakingTime: 3024000000,
      isUpgraded: false,
    },
    {
      tokenAddress: '0x2b79919a89ffa96d98ac126ff244a662f77fdc19',
      tokenId: '5',
      isStaking: true,
      originalOwner: '',
      stakingDuration: 0,
      totalStakingTime: 3024000000,
      isUpgraded: true,
    },
  ]
}
