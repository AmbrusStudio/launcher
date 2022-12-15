import { isAddress } from 'ethers/lib/utils'
import { DateTime } from 'luxon'

import { EarnedHistory, ImmutableXL2Overall } from '../../types/immutableX'
import { sleep } from '../../utils'
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

  const response = await nftHiveBackendRequest.get<T>(`/l2Overall`, {
    params: {
      address,
    },
  })

  const mockData = [
    {
      tokenAddress: '0x2b79919a89ffa96d98ac126ff244a662f77fdc19',
      tokenId: '3',
      isStaking: false,
      originalOwner: '',
      stakingDuration: 0,
      totalStakingTime: 3024000000,
      isUpgraded: false,
      earnedDgc: '0',
    },
    {
      tokenAddress: '0x2b79919a89ffa96d98ac126ff244a662f77fdc19',
      tokenId: '4',
      isStaking: true,
      originalOwner: '',
      stakingDuration: 1709940710,
      totalStakingTime: 3024000000,
      isUpgraded: false,
      earnedDgc: '0',
    },
    {
      tokenAddress: '0x2b79919a89ffa96d98ac126ff244a662f77fdc19',
      tokenId: '5',
      isStaking: true,
      originalOwner: '',
      stakingDuration: 3024000000,
      totalStakingTime: 3024000000,
      isUpgraded: false,
      earnedDgc: '10',
    },
    {
      tokenAddress: '0x2b79919a89ffa96d98ac126ff244a662f77fdc19',
      tokenId: '6',
      isStaking: true,
      originalOwner: '',
      stakingDuration: 3024000000,
      totalStakingTime: 3024000000,
      isUpgraded: true,
      earnedDgc: '100',
    },
  ]

  return mockData
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

  const history = [
    {
      time: new Date(2022, 11, 16, 12, 1, 1),
      earnedDgc: '6.9',
      nftId: '8888',
    },
    {
      time: new Date(2022, 11, 15),
      earnedDgc: '2.987654',
      nftId: '8999',
    },
    {
      time: new Date(2022, 11, 11),
      earnedDgc: '16.9',
      nftId: '9999',
    },
    {
      time: new Date(2022, 11, 5),
      earnedDgc: '86.9876543212345678',
      nftId: '8888',
    },
    {
      time: new Date(2022, 11, 1),
      earnedDgc: '86.9',
      nftId: '8999',
    },
    {
      time: new Date(2022, 11, 8),
      earnedDgc: '8.9',
      nftId: '9999',
    },
  ] as EarnedHistory[]

  await sleep(3000)

  return history.sort((a, b) => {
    const aDt = DateTime.fromJSDate(a.time)
    const bDt = DateTime.fromJSDate(b.time)

    return aDt > bDt ? -1 : 1
  }) as T
}
