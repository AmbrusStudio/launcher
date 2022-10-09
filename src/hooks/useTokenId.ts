import { useEthers } from '@usedapp/core'
import { Alchemy } from 'alchemy-sdk'
import { getAddress } from 'ethers/lib/utils'
import { useCallback, useEffect, useState } from 'react'

import { ALCHEMY_NETWORK } from '../contracts'

const initAlchemy = (): Alchemy => {
  const ALCHEMY_API_KEY: string | undefined = import.meta.env.VITE_ALCHEMY_API_KEY
  if (!ALCHEMY_API_KEY) throw new TypeError('VITE_ALCHEMY_API_KEY not set')
  const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: ALCHEMY_NETWORK,
  }

  return new Alchemy(settings)
}

/**
 * Get NFT tokenId
 * @returns
 */
export function useTokenId({ tokenAddress }: { tokenAddress: string }) {
  const [tokenId, setTokenId] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { account } = useEthers()

  // Fetch nfts for owner
  const getNftsForOwner = useCallback(async () => {
    if (!account) {
      setLoading(false)
      return
    }

    const alchemy = initAlchemy()

    setLoading(true)

    const nftsForOwnerResult = await alchemy.nft.getNftsForOwner(account)
    console.log('nftsForOwnerResult', nftsForOwnerResult)

    const list = nftsForOwnerResult.ownedNfts
      .filter((item) => getAddress(item.contract.address) === getAddress(tokenAddress))
      .map((item) => item.tokenId)

    // console.log('list', list)

    setTokenId(list)
    setLoading(false)
  }, [account, tokenAddress])

  useEffect(() => {
    getNftsForOwner()
  }, [getNftsForOwner])

  return {
    tokenId,
    loading,
  }
}

/**
 * Get NFT tokenId By Contract
 * @returns
 */
export function useTokenIdByContract({ holderAddress, tokenAddress }: { holderAddress: string; tokenAddress: string }) {
  const [tokenId, setTokenId] = useState<string[]>([])

  // Fetch nfts for owner
  const getNftsForOwner = useCallback(async () => {
    if (!holderAddress) {
      return
    }
    const alchemy = initAlchemy()

    const nftsForOwnerResult = await alchemy.nft.getNftsForOwner(holderAddress)
    console.log('nftsForOwnerResult by contract', nftsForOwnerResult)

    const list = nftsForOwnerResult.ownedNfts
      .filter((item) => getAddress(item.contract.address) === getAddress(tokenAddress))
      .map((item) => item.tokenId)

    setTokenId(list)
  }, [holderAddress, tokenAddress])

  useEffect(() => {
    getNftsForOwner()
  }, [getNftsForOwner])

  return tokenId
}
