import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'

import { getImmutableXL2OverallHiveApi } from '../api/immutableX'
import { MetadataStatus, NFTE4CRanger } from '../types'
import { ImmutableXL2Overall } from '../types/immutableX'
import { formatMetadataImmutableX } from '../utils'
import { useImmutableXWallet } from './useImmutableX'
import { useMetadataImmtableXByTokenIds } from './useMetadata'

/**
 * useImmutableXL2OverallHive
 * @param param
 * @returns
 */
export function useImmutableXL2OverallHive() {
  const { walletInfo } = useImmutableXWallet()
  const [collections, setCollections] = useState<NFTE4CRanger[]>([])

  const { data, error, isLoading } = useSWR<ImmutableXL2Overall[]>(
    { address: walletInfo?.address || '', cacheKey: 'immutableXHive' },
    getImmutableXL2OverallHiveApi
  )

  if (error) {
    console.error('useERC721ImmutableXList error', error)
  }

  const { metadata } = useMetadataImmtableXByTokenIds(data || [])

  const getNftsForUser = useCallback(() => {
    const list = formatMetadataImmutableX({
      metadata,
      stakingStatus: data || [],
      status: MetadataStatus.ImmutableX,
    })

    setCollections(list)
  }, [data, metadata])

  useEffect(() => {
    getNftsForUser()
  }, [getNftsForUser])

  return {
    nfts: collections,
    loading: isLoading,
  }
}
