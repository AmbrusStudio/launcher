import { Falsy, useEthers } from '@usedapp/core'
import { getAddress } from 'ethers/lib/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { E4CRanger_ImmutableX_Holder } from '../contracts'
import { MetadataStatus, NFTE4CRanger } from '../types'
import { editionPlus, formatMetadataImmutableX, formatMetadataImmutableXUser, formatMetadataNew } from '../utils'
import { useOriginalOwners, useUpgradeds } from './useE4CRanger'
import { useImmutableXStakingStatuses, useImmutableXUserNFTAssets, useImmutableXWallet } from './useImmutableX'
import { useMetadata, useMetadataByTokenIds } from './useMetadata'
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

  // NFT metadata for account
  const { metadata: metadataUser } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenId,
    baseURL: baseURL,
  })
  console.log('metadataUser', metadataUser)

  const getNftsForAccount = useCallback(async () => {
    if (tokenAddress) {
      const list = formatMetadataNew(tokenAddress, metadataUser, tokenId, upgraded, [], MetadataStatus.Ethereum)
      const nfts = await editionPlus(list, baseURL)

      setNftsForAccount(nfts)
    }
  }, [tokenAddress, metadataUser, tokenId, upgraded, baseURL])

  // NFT metadata for Contract
  const { metadata: metadataContract } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenIdForContract,
    baseURL: baseURL,
  })
  console.log('metadataContract', metadataContract)

  const getNftsForContract = useCallback(async () => {
    if (tokenAddress) {
      const list = formatMetadataNew(
        tokenAddress,
        metadataContract,
        tokenIdForContract,
        upgradedForContract,
        originalOwner,
        MetadataStatus.Ethereum
      )
      const nfts = await editionPlus(list, baseURL)

      setNftsForContract(nfts)
    }
  }, [baseURL, metadataContract, originalOwner, tokenAddress, tokenIdForContract, upgradedForContract])

  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])

  useEffect(() => {
    getNftsForAccount()
  }, [getNftsForAccount])

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

  // NFT metadata for account
  const { metadata: metadataUser } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenId,
    baseURL: baseURL,
  })
  console.log('metadataUser', metadataUser)
  const nftsForAccount = useMemo<NFTE4CRanger[]>(() => {
    if (tokenAddress) {
      return formatMetadataNew(tokenAddress, metadataUser, tokenId, [], [], MetadataStatus.Ethereum)
    } else {
      return []
    }
  }, [tokenAddress, metadataUser, tokenId])

  // NFT metadata for contract
  const { metadata: metadataContract } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenIdForContract,
    baseURL: baseURL,
  })
  console.log('metadataContract', metadataContract)

  const nftsForContract = useMemo<NFTE4CRanger[]>(() => {
    if (tokenAddress) {
      return formatMetadataNew(tokenAddress, metadataContract, tokenIdForContract, [], [], MetadataStatus.Ethereum)
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

  // NFT metadata
  const { metadata: metadataUser } = useMetadataByTokenIds({
    address: tokenAddress,
    tokenIds: tokenId,
    baseURL: baseURL,
  })
  console.log('metadataUser', metadataUser)

  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () => formatMetadataNew(tokenAddress, metadataUser, tokenId, [], [], MetadataStatus.Ethereum),
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

  const { getMetadataByAddress } = useMetadata()
  const metadata = getMetadataByAddress(collection, MetadataStatus.ImmutableX)

  // NFT metadata
  const getNftsForAccount = useCallback(async () => {
    const list = formatMetadataImmutableXUser({
      address: collection,
      metadata: metadata,
      tokenIds: tokenId,
      upgradeds: stakingStatus.map((i) => i.isUpgraded),
      stakings: stakingStatus.map((i) => i.isStaking),
      status: MetadataStatus.ImmutableX,
    })
    const nfts = await editionPlus(list, baseURL)

    setNftsForAccount(nfts)
  }, [baseURL, collection, metadata, stakingStatus, tokenId])

  const getNftsForContract = useCallback(async () => {
    const list = formatMetadataImmutableX({
      address: collection,
      metadata: metadata,
      tokenIds: tokenIdHolder,
      upgradeds: stakingStatusHolder.map((i) => i.isUpgraded),
      stakings: stakingStatusHolder.map((i) => i.isStaking),
      originalOwner: stakingStatusHolder.map((i) => i.originalOwner),
      owner: walletInfo?.address || '',
      status: MetadataStatus.ImmutableX,
    })

    const nfts = await editionPlus(list, baseURL)

    setNftsForContract(nfts)
  }, [baseURL, collection, metadata, stakingStatusHolder, tokenIdHolder, walletInfo?.address])

  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])
  const loading = useMemo<boolean>(() => loadingAccount && loadingHolder, [loadingAccount, loadingHolder])

  useEffect(() => {
    getNftsForAccount()
  }, [getNftsForAccount])

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

  const { getMetadataByAddress } = useMetadata()
  const metadata = useMemo(
    () => getMetadataByAddress(collection, MetadataStatus.ImmutableX),
    [collection, getMetadataByAddress]
  )

  // NFT metadata for User
  const { metadata: metadataUser } = useMetadataByTokenIds({
    address: collection,
    tokenIds: tokenId,
    baseURL: baseURL,
  })
  console.log('metadataUser', metadataUser)

  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () =>
      formatMetadataNew(
        collection,
        metadataUser,
        tokenId,
        tokenId.map(() => false),
        [],
        MetadataStatus.ImmutableX
      ),
    [collection, metadataUser, tokenId]
  )

  // NFT metadata for Contract
  const nftsForContract = useMemo<NFTE4CRanger[]>(
    () =>
      formatMetadataImmutableX({
        address: collection,
        metadata: metadata,
        tokenIds: tokenIdHolder,
        upgradeds: stakingStatusHolder.map((i) => i.isUpgraded),
        stakings: stakingStatusHolder.map((i) => i.isStaking),
        originalOwner: stakingStatusHolder.map((i) => i.originalOwner),
        owner: walletInfo?.address || '',
        status: MetadataStatus.ImmutableX,
      }),
    [collection, metadata, stakingStatusHolder, tokenIdHolder, walletInfo?.address]
  )

  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])
  const loading = useMemo<boolean>(() => loadingAccount && loadingHolder, [loadingAccount, loadingHolder])

  return {
    nfts,
    loading,
  }
}
