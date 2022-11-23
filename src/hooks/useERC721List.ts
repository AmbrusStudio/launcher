import { Falsy, useEthers } from '@usedapp/core'
import { getAddress } from 'ethers/lib/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { E4CRanger_ImmutableX_Holder } from '../contracts'
import { MetadataStatus, NFTE4CRanger } from '../types'
import { formatMetadata, formatMetadataImmutableX, formatMetadataImmutableXUser } from '../utils'
import { useOriginalOwners, useUpgradeds } from './useE4CRanger'
import { useImmutableXStakingStatuses, useImmutableXUserNFTAssets, useImmutableXWallet } from './useImmutableX'
import { useMetadataByTokenIds } from './useMetadata'
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

  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])

  useEffect(() => {
    getNftsForUser()
  }, [getNftsForUser])

  useEffect(() => {
    getNftsForContract()
  }, [getNftsForContract])

  return {
    nfts,
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

  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])

  return {
    nfts,
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
 * useERC721ImmutableXListState
 * @param param
 * @returns
 */
export function useERC721ImmutableXListState({ collection, baseURL }: { collection: string; baseURL: string }) {
  const { walletInfo } = useImmutableXWallet()
  const [nftsForAccount, setNftsForAccount] = useState<NFTE4CRanger[]>([])
  const [nftsForContract, setNftsForContract] = useState<NFTE4CRanger[]>([])

  // User
  const { immutableXAssets, loading: loadingAccount } = useImmutableXUserNFTAssets({
    user: walletInfo?.address || '',
    collection,
  })

  // Holder
  const { immutableXAssets: immutableXAssetsHolder, loading: loadingHolder } = useImmutableXUserNFTAssets({
    user: E4CRanger_ImmutableX_Holder,
    collection,
  })

  const tokenId = useMemo(() => immutableXAssets.map((asset) => asset.token_id), [immutableXAssets])
  const tokenIdHolder = useMemo(() => immutableXAssetsHolder.map((asset) => asset.token_id), [immutableXAssetsHolder])

  const stakingStatus = useImmutableXStakingStatuses(collection, tokenId)
  const stakingStatusHolder = useImmutableXStakingStatuses(collection, tokenIdHolder)

  // User
  const { metadata: metadataUser } = useMetadataByTokenIds({
    address: collection,
    tokenIds: tokenId,
    baseURL: baseURL,
  })

  const getNftsForUser = useCallback(() => {
    const list = formatMetadataImmutableXUser({
      address: collection,
      metadata: metadataUser,
      tokenIds: tokenId,
      upgradeds: stakingStatus.map((i) => i.isUpgraded),
      stakings: stakingStatus.map((i) => i.isStaking),
      status: MetadataStatus.ImmutableX,
    })

    setNftsForAccount(list)
  }, [collection, metadataUser, stakingStatus, tokenId])

  // Contract
  const { metadata: metadataContract } = useMetadataByTokenIds({
    address: collection,
    tokenIds: tokenIdHolder,
    baseURL: baseURL,
  })

  const getNftsForContract = useCallback(async () => {
    const list = formatMetadataImmutableX({
      address: collection,
      metadata: metadataContract,
      tokenIds: tokenIdHolder,
      upgradeds: stakingStatusHolder.map((i) => i.isUpgraded),
      stakings: stakingStatusHolder.map((i) => i.isStaking),
      originalOwner: stakingStatusHolder.map((i) => i.originalOwner),
      owner: walletInfo?.address || '',
      status: MetadataStatus.ImmutableX,
    })

    setNftsForContract(list)
  }, [collection, metadataContract, stakingStatusHolder, tokenIdHolder, walletInfo?.address])

  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])
  const loading = useMemo<boolean>(() => loadingAccount && loadingHolder, [loadingAccount, loadingHolder])

  useEffect(() => {
    getNftsForUser()
  }, [getNftsForUser])

  useEffect(() => {
    getNftsForContract()
  }, [getNftsForContract])

  return {
    nfts,
    loading,
  }
}

/**
 * useERC721ImmutableXList
 * @param param
 * @returns
 */
export function useERC721ImmutableXList({ collection, baseURL }: { collection: string; baseURL: string }) {
  const { walletInfo } = useImmutableXWallet()

  // User
  const { immutableXAssets, loading: loadingAccount } = useImmutableXUserNFTAssets({
    user: walletInfo?.address || '',
    collection,
  })

  // Holder
  const { immutableXAssets: immutableXAssetsHolder, loading: loadingHolder } = useImmutableXUserNFTAssets({
    user: E4CRanger_ImmutableX_Holder,
    collection,
  })

  const tokenId = useMemo(() => immutableXAssets.map((asset) => asset.token_id), [immutableXAssets])
  const tokenIdHolder = useMemo(() => immutableXAssetsHolder.map((asset) => asset.token_id), [immutableXAssetsHolder])

  const stakingStatusHolder = useImmutableXStakingStatuses(collection, tokenIdHolder)

  // User
  const { metadata: metadataUser } = useMetadataByTokenIds({
    address: collection,
    tokenIds: tokenId,
    baseURL: baseURL,
  })

  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () =>
      formatMetadata(
        collection,
        metadataUser,
        tokenId,
        tokenId.map(() => false),
        [],
        MetadataStatus.ImmutableX
      ),
    [collection, metadataUser, tokenId]
  )

  // Contract
  const { metadata: metadataContract } = useMetadataByTokenIds({
    address: collection,
    tokenIds: tokenIdHolder,
    baseURL: baseURL,
  })

  const nftsForContract = useMemo<NFTE4CRanger[]>(
    () =>
      formatMetadataImmutableX({
        address: collection,
        metadata: metadataContract,
        tokenIds: tokenIdHolder,
        upgradeds: stakingStatusHolder.map((i) => i.isUpgraded),
        stakings: stakingStatusHolder.map((i) => i.isStaking),
        originalOwner: stakingStatusHolder.map((i) => i.originalOwner),
        owner: walletInfo?.address || '',
        status: MetadataStatus.ImmutableX,
      }),
    [collection, metadataContract, stakingStatusHolder, tokenIdHolder, walletInfo?.address]
  )

  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])
  const loading = useMemo<boolean>(() => loadingAccount && loadingHolder, [loadingAccount, loadingHolder])

  return {
    nfts,
    loading,
  }
}
