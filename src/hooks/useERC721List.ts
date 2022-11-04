import { useEthers } from '@usedapp/core'
import { constants } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { useMemo } from 'react'

import { ADDRESS_ImmutableX_Holder } from '../contracts'
import { MetadataStatus, NFTE4CRanger } from '../types'
import { formatMetadata } from '../utils'
import { useOriginalOwners, useUpgradeds } from './useE4CRanger'
import { useImmutableXUserNFTAssets, useImmutableXWallet } from './useImmutableX'
import { useMetadata } from './useMetadata'
import { useTokenIdByContract, useTokenIdByOwner } from './useTokenId'

/**
 * useERC721 List
 * Token + Contract + Contract State
 * @returns
 */
export function useERC721ListState({ holderAddress, tokenAddress }: { holderAddress: string; tokenAddress: string }) {
  const { account } = useEthers()

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
  // console.log('upgraded', upgraded)
  // console.log('tokenIdByContract', tokenIdByContract)
  // console.log('originalOwner', originalOwner)
  // console.log('tokenIdForContract', tokenIdForContract)
  // console.log('upgradedForContract', upgradedForContract)

  const { getMetadataByAddress } = useMetadata()
  const metadata = getMetadataByAddress(tokenAddress, MetadataStatus.Ethereum)

  // NFT metadata for account
  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () => formatMetadata(tokenAddress, metadata, tokenId, upgraded, [], MetadataStatus.Ethereum),
    [tokenId, upgraded, tokenAddress, metadata]
  )
  // console.log('nftsForAccount', nftsForAccount)

  // NFT metadata for contract
  const nftsForContract = useMemo<NFTE4CRanger[]>(
    () =>
      formatMetadata(
        tokenAddress,
        metadata,
        tokenIdForContract,
        upgradedForContract,
        originalOwner,
        MetadataStatus.Ethereum
      ),
    [tokenIdForContract, upgradedForContract, originalOwner, tokenAddress, metadata]
  )
  // console.log('nftsForContract', nftsForContract)
  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])
  // console.log('nfts', nfts)

  return {
    nfts,
    loading: loading,
  }
}

/**
 * useERC721 List
 * Token + Contract
 * @param param
 * @returns
 */
export function useERC721List({ holderAddress, tokenAddress }: { holderAddress: string; tokenAddress: string }) {
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

  const { getMetadataByAddress } = useMetadata()
  const metadata = getMetadataByAddress(tokenAddress, MetadataStatus.Ethereum)

  // NFT metadata for account
  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () => formatMetadata(tokenAddress, metadata, tokenId, [], [], MetadataStatus.Ethereum),
    [tokenId, tokenAddress, metadata]
  )

  // NFT metadata for contract
  const nftsForContract = useMemo<NFTE4CRanger[]>(
    () => formatMetadata(tokenAddress, metadata, tokenIdForContract, [], [], MetadataStatus.Ethereum),
    [tokenIdForContract, tokenAddress, metadata]
  )

  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])
  // console.log('nfts', nfts)

  return {
    nfts,
    loading: loading,
  }
}

/**
 * ERC721 Ultimate Edition List
 * Token
 * @param param
 * @returns
 */
export function useERC721UltimateEditionList({ tokenAddress }: { tokenAddress: string }) {
  // TokenId for owner
  const { tokenId, loading } = useTokenIdByOwner({
    tokenAddress,
  })

  const { getMetadataByAddress } = useMetadata()
  const metadata = getMetadataByAddress(tokenAddress, MetadataStatus.Ethereum)

  // NFT metadata
  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () => formatMetadata(tokenAddress, metadata, tokenId, [], [], MetadataStatus.Ethereum),
    [tokenId, tokenAddress, metadata]
  )

  return {
    nfts: nftsForAccount,
    loading: loading,
  }
}

/**
 * useERC721ImmutableXList
 * @param param
 * @returns
 */
export function useERC721ImmutableXList({ collection }: { collection: string }) {
  const { walletInfo } = useImmutableXWallet()

  // console.log('walletInfo', walletInfo)

  // User
  const { immutableXAssets, loading } = useImmutableXUserNFTAssets({
    user: walletInfo?.address || '',
    collection,
  })

  // Holder
  const { immutableXAssets: immutableXAssetsHolder, loading: loadingHolder } = useImmutableXUserNFTAssets({
    user: ADDRESS_ImmutableX_Holder,
    collection,
  })

  const tokenId = immutableXAssets.map((asset) => asset.token_id)
  const tokenIdHolder = immutableXAssetsHolder.map((asset) => asset.token_id)

  const { getMetadataByAddress } = useMetadata()
  const metadata = getMetadataByAddress(collection, MetadataStatus.ImmutableX)

  // NFT metadata
  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () =>
      formatMetadata(
        collection,
        metadata,
        tokenId,
        tokenId.map(() => false),
        [],
        MetadataStatus.ImmutableX
      ),
    [tokenId, collection, metadata]
  )

  const nftsForAccountHolder = useMemo<NFTE4CRanger[]>(
    () =>
      formatMetadata(
        collection,
        metadata,
        tokenIdHolder,
        tokenIdHolder.map(() => false),
        immutableXAssetsHolder.map((i) => i.user || constants.AddressZero),
        MetadataStatus.ImmutableX
      ),
    [collection, immutableXAssetsHolder, metadata, tokenIdHolder]
  )

  return {
    nfts: [...nftsForAccount, ...nftsForAccountHolder],
    loading: loading && loadingHolder,
  }
}
