import { isAddress } from 'ethers/lib/utils'
import { DateTime } from 'luxon'

import { EarnedHistory, ImmutableXL2Overall } from '../../types/immutableX'
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
 * ImmutableX unstake Hive
 * @param param
 * @returns
 */
export async function immutableXUnstakeHiveApi<T = unknown>({
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
  return await nftHiveBackendRequest.post<T>(`/unstake`, { owner, tokenAddress, tokenId, signature })
}

/**
 * ImmutableX Transfer Confirm
 * @param param id: number
 * @returns
 */
export async function immutableXTransferConfirmApi<T = unknown>({ id }: { id: number }) {
  return await nftHolderBackendRequest.post<T>(`/transferConfirm`, { id })
}

/**
 * ImmutableX Transfer Confirm Hive
 * @param param id: number
 * @returns
 */
export async function immutableXTransferConfirmHiveApi<T = unknown>({ id }: { id: number }) {
  return await nftHiveBackendRequest.post<T>(`/transferConfirm`, { id })
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

  const response = await nftHiveBackendRequest.get<T>(`/l2Overall`, {
    params: {
      address,
    },
  })

  return response.data
}

/**
 * Get DGC Earned
 * @param param assress: wallet address
 * @returns
 */
export async function getEarnedApi<T>({ address }: { address: string }) {
  if (!address) {
    console.error('address is required')
    return []
  }

  if (!isAddress(address)) {
    console.error('not a valid address')
    return []
  }

  const response = await nftHiveBackendRequest.get<T>(`/dgcHistory`, {
    params: {
      address,
    },
  })

  const list: EarnedHistory[] = (response.data as EarnedHistory[]) || []

  return list.sort((a, b) => {
    try {
      const aDt = DateTime.fromISO(a.time)
      const bDt = DateTime.fromISO(b.time)

      return aDt > bDt ? -1 : 1
    } catch (error) {
      console.log('dgcHistory sort error', error)
      return 0
    }
  }) as T
}
