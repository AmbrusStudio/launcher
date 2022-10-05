import { useEthers } from '@usedapp/core'
import { getAddress } from 'ethers/lib/utils'
import { useMemo } from 'react'

import { NFTE4CRanger } from '../types'
import { nftsForOwner } from '../utils'
import { useOriginalOwners, useUpgradeds } from './useE4CRanger'
import { useTokenId, useTokenIdByContract } from './useTokenId'

/**
 * useERC721 List
 * @returns
 */
export function useERC721ListState({ holderAddress, tokenAddress }: { holderAddress: string; tokenAddress: string }) {
  const { account } = useEthers()

  // tokenId for owner
  const { tokenId, loading } = useTokenId({ tokenAddress })

  // tokenId by contract
  const tokenIdByContract = useTokenIdByContract({
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
      // if (account && item) {
      //   list.push(tokenIdByContract[index])
      // }
    })

    return list
  }, [account, originalOwner, tokenIdByContract])

  const upgradedForContract = useUpgradeds(holderAddress, tokenIdForContract)
  // console.log('upgraded', upgraded)
  // console.log('tokenIdByContract', tokenIdByContract)
  // console.log('originalOwner', originalOwner)
  // console.log('tokenIdForContract', tokenIdForContract)
  // console.log('upgradedForContract', upgradedForContract)

  // Nfts for account
  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () => nftsForOwner(tokenAddress, tokenId, upgraded, []),
    [tokenId, upgraded, tokenAddress]
  )
  // console.log('nftsForAccount', nftsForAccount)

  // Nfts for contract
  const nftsForContract = useMemo<NFTE4CRanger[]>(
    () => nftsForOwner(tokenAddress, tokenIdForContract, upgradedForContract, originalOwner),
    [tokenIdForContract, upgradedForContract, originalOwner, tokenAddress]
  )
  // console.log('nftsForContract', nftsForContract)
  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])
  // console.log('nfts', nfts)

  return {
    nfts,
    loading: loading,
  }
}

export function useERC721List({ holderAddress, tokenAddress }: { holderAddress: string; tokenAddress: string }) {
  const { account } = useEthers()

  // TokenId for owner
  const { tokenId, loading } = useTokenId({
    tokenAddress,
  })

  // TokenId by contract
  const tokenIdByContract = useTokenIdByContract({
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

  // Nfts for account
  const nftsForAccount = useMemo<NFTE4CRanger[]>(
    () => nftsForOwner(tokenAddress, tokenId, [], []),
    [tokenId, tokenAddress]
  )

  // Nfts for contract
  const nftsForContract = useMemo<NFTE4CRanger[]>(
    () => nftsForOwner(tokenAddress, tokenIdForContract, [], []),
    [tokenIdForContract, tokenAddress]
  )

  const nfts = useMemo<NFTE4CRanger[]>(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])
  // console.log('nfts', nfts)

  return {
    nfts,
    loading: loading,
  }
}
