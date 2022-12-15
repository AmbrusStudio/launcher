import { Falsy, useEthers } from '@usedapp/core'
import { useDeepCompareEffect } from 'ahooks'
import { getAddress } from 'ethers/lib/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

import { getImmutableXL2OverallApi } from '../api/immutableX'
import { mergedCollections } from '../tools'
import { MetadataStatus, NFTE4CRanger } from '../types'
import { ImmutableXL2Overall } from '../types/immutableX'
import { formatMetadata, formatMetadataImmutableX } from '../utils'
import { useOriginalOwners, useUpgradeds } from './useE4CRanger'
import { useImmutableXWallet } from './useImmutableX'
import { useMetadataByTokenIds, useMetadataImmtableXByTokenIds } from './useMetadata'
import { useTokenIdByContract, useTokenIdByOwner } from './useTokenId'

/**
 * useERC721 List
 * Token + Contract + Contract State
 * @returns
 */
export function useERC721ListState({
  holderAddress,
  tokenAddress,
  baseURL,
}: {
  holderAddress: string | Falsy
  tokenAddress: string | Falsy
  baseURL: string
}) {
  const { account } = useEthers()
  const [nftsForAccount, setNftsForAccount] = useState<NFTE4CRanger[]>([])
  const [nftsForContract, setNftsForContract] = useState<NFTE4CRanger[]>([])

  const [collections, setCollections] = useState<NFTE4CRanger[]>([])

  // tokenId for owner
  const { tokenId, loading } = useTokenIdByOwner({ tokenAddress })

  // tokenId by contract
  const { tokenId: tokenIdByContract } = useTokenIdByContract({
    holderAddress,
    tokenAddress,
  })

  const upgraded = useUpgradeds(holderAddress, tokenId)

  // tokenId original owner
  // originalOwner replaces ownerOf to judge staking state
  const originalOwner = useOriginalOwners(holderAddress, tokenIdByContract)

  const tokenIdForContract = useMemo(() => {
    const list: string[] = []
    // Determine the NFT that the current user has staked based on the "originalOwner"
    originalOwner.forEach((item, index) => {
      if (account && item && getAddress(item) === getAddress(account)) {
        list.push(tokenIdByContract[index])
      }
    })

    return list
  }, [account, originalOwner, tokenIdByContract])

  const upgradedForContract = useUpgradeds(holderAddress, tokenIdForContract)

  // User
  const { metadata: metadataUser } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenId,
    baseURL: baseURL,
  })

  const getNftsForUser = useCallback(() => {
    if (tokenAddress) {
      const list = formatMetadata(tokenAddress, metadataUser, tokenId, upgraded, [], MetadataStatus.Ethereum)
      setNftsForAccount(list)
    }
  }, [tokenAddress, metadataUser, tokenId, upgraded])

  // Contract
  const { metadata: metadataContract } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenIdForContract,
    baseURL: baseURL,
  })

  const getNftsForContract = useCallback(() => {
    if (tokenAddress) {
      const list = formatMetadata(
        tokenAddress,
        metadataContract,
        tokenIdForContract,
        upgradedForContract,
        originalOwner,
        MetadataStatus.Ethereum
      )

      setNftsForContract(list)
    }
  }, [metadataContract, originalOwner, tokenAddress, tokenIdForContract, upgradedForContract])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsForAccount))
  }, [nftsForAccount])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsForContract))
  }, [nftsForContract])

  useEffect(() => {
    getNftsForUser()
  }, [getNftsForUser])

  useEffect(() => {
    getNftsForContract()
  }, [getNftsForContract])

  return {
    nfts: collections,
    loading,
  }
}

/**
 * useERC721 List
 * Token + Contract
 * @param param
 * @returns
 */
export function useERC721List({
  holderAddress,
  tokenAddress,
  baseURL,
}: {
  holderAddress: string | Falsy
  tokenAddress: string | Falsy
  baseURL: string
}) {
  const { account } = useEthers()
  const [collections, setCollections] = useState<NFTE4CRanger[]>([])

  // TokenId for owner
  const { tokenId, loading } = useTokenIdByOwner({
    tokenAddress,
  })

  // TokenId by contract
  const { tokenId: tokenIdByContract } = useTokenIdByContract({
    holderAddress,
    tokenAddress,
  })

  // TokenId original owner
  // originalOwner replaces ownerOf to judge staking state
  const originalOwner = useOriginalOwners(holderAddress, tokenIdByContract)

  const tokenIdForContract = useMemo(() => {
    const list: string[] = []
    // Determine the NFT that the current user has staked based on the "originalOwner"
    originalOwner.forEach((item, index) => {
      if (account && item && getAddress(item) === getAddress(account)) {
        list.push(tokenIdByContract[index])
      }
    })

    return list
  }, [account, originalOwner, tokenIdByContract])

  // User
  const { metadata: metadataUser } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenId,
    baseURL: baseURL,
  })

  const nftsForAccount = useMemo<NFTE4CRanger[]>(() => {
    if (tokenAddress) {
      return formatMetadata(tokenAddress, metadataUser, tokenId, [], [], MetadataStatus.Ethereum)
    } else {
      return []
    }
  }, [tokenAddress, metadataUser, tokenId])

  // Contract
  const { metadata: metadataContract } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenIdForContract,
    baseURL: baseURL,
  })

  const nftsForContract = useMemo<NFTE4CRanger[]>(() => {
    if (tokenAddress) {
      return formatMetadata(tokenAddress, metadataContract, tokenIdForContract, [], [], MetadataStatus.Ethereum)
    } else {
      return []
    }
  }, [tokenAddress, metadataContract, tokenIdForContract])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsForAccount))
  }, [nftsForAccount])

  useDeepCompareEffect(() => {
    setCollections((data) => mergedCollections(data, nftsForContract))
  }, [nftsForContract])

  return {
    nfts: collections,
    loading,
  }
}

/**
 * ERC721 Ultimate Edition List
 * Token
 * @param param
 * @returns
 */
export function useERC721UltimateEditionList({ tokenAddress, baseURL }: { tokenAddress: string; baseURL: string }) {
  // TokenId for owner
  const { tokenId, loading } = useTokenIdByOwner({
    tokenAddress,
  })

  // User
  const { metadata: metadataUser } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenId,
    baseURL: baseURL,
  })

  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () => formatMetadata(tokenAddress, metadataUser, tokenId, [], [], MetadataStatus.Ethereum),
    [tokenAddress, metadataUser, tokenId]
  )

  return {
    nfts: nftsForAccount,
    loading,
  }
}

/**
 * useERC721ImmutableXList
 * @param param
 * @returns
 */
export function useERC721ImmutableXList() {
  const { walletInfo } = useImmutableXWallet()
  const [collections, setCollections] = useState<NFTE4CRanger[]>([])

  const { data, error, isLoading } = useSWR<ImmutableXL2Overall[]>(
    { address: walletInfo?.address || '', cacheKey: 'immutableX' },
    getImmutableXL2OverallApi
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
