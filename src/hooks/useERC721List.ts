import { useEthers } from '@usedapp/core'
import { getAddress } from 'ethers/lib/utils'
import { useMemo } from 'react'

import { ADDRESS_E4C_Ranger } from '../contracts'
import { NFTE4CRanger } from '../types'
import { nftsForOwner } from '../utils'
import { useOriginalOwners, useUpgradeds } from './useE4CRanger'
import { useTokenId, useTokenIdByContract } from './useTokenId'

/**
 * useERC721 List
 * @returns
 */
export function useERC721List() {
  const { account } = useEthers()

  // tokenId for owner
  const tokenId = useTokenId()

  // tokenId by contract
  const tokenIdByContract = useTokenIdByContract()

  const upgraded = useUpgradeds(ADDRESS_E4C_Ranger, tokenId)

  // tokenId original owner
  // originalOwner replaces ownerOf to judge staking state
  const originalOwner = useOriginalOwners(ADDRESS_E4C_Ranger, tokenIdByContract)

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

  const upgradedForContract = useUpgradeds(ADDRESS_E4C_Ranger, tokenIdForContract)
  // console.log('upgraded', upgraded)
  // console.log('tokenIdByContract', tokenIdByContract)
  // console.log('originalOwner', originalOwner)
  // console.log('tokenIdForContract', tokenIdForContract)
  // console.log('upgradedForContract', upgradedForContract)

  // Nfts for account
  const nftsForAccount = useMemo<NFTE4CRanger[]>(() => nftsForOwner(tokenId, upgraded, []), [tokenId, upgraded])
  // console.log('nftsForAccount', nftsForAccount)

  // Nfts for contract
  const nftsForContract = useMemo<NFTE4CRanger[]>(
    () => nftsForOwner(tokenIdForContract, upgradedForContract, originalOwner),
    [tokenIdForContract, upgradedForContract, originalOwner]
  )
  // console.log('nftsForContract', nftsForContract)
  const nfts = useMemo(() => [...nftsForAccount, ...nftsForContract], [nftsForAccount, nftsForContract])
  // console.log('nfts', nfts)

  return {
    nfts,
  }
}
