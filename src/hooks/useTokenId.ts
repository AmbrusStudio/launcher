import { useEthers } from '@usedapp/core'
import { Alchemy } from 'alchemy-sdk'
import { getAddress } from 'ethers/lib/utils'
import { useCallback, useEffect, useState } from 'react'

import { ADDRESS_ASR, AlchemyNetwork } from '../contracts'

/**
 * Get NFT tokenId
 * @returns
 */
export function useTokenId() {
  const [tokenId, setTokenId] = useState<string[]>([])
  const { account } = useEthers()

  // Fetch nfts for owner
  const nftsForOwner = useCallback(async () => {
    if (!account) {
      return
    }
    const ALCHEMY_API_KEY: string | undefined = import.meta.env.VITE_ALCHEMY_API_KEY
    if (!ALCHEMY_API_KEY) throw new TypeError('VITE_ALCHEMY_API_KEY not set')
    const settings = {
      apiKey: ALCHEMY_API_KEY,
      network: AlchemyNetwork,
    }

    const alchemy = new Alchemy(settings)

    const nftsForOwnerResult = await alchemy.nft.getNftsForOwner(account)
    console.log('...', nftsForOwnerResult)

    const list = nftsForOwnerResult.ownedNfts
      .filter((item) => getAddress(item.contract.address) === getAddress(ADDRESS_ASR))
      .map((item) => item.tokenId)

    console.log('list', list)

    setTokenId(list)
  }, [account])

  useEffect(() => {
    nftsForOwner()
  }, [nftsForOwner])

  return tokenId
}
