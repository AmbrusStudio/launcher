import { useEthers } from '@usedapp/core'
import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState } from 'react'

import { getViteEnv } from '../utils'

/**
 * Init Alchemy
 * @returns
 */
const initAlchemy = (): Alchemy => {
  const ALCHEMY_API_KEY = getViteEnv('VITE_ALCHEMY_POLYGON_API_KEY')
  const POLYGON_NETWORK = getViteEnv('VITE_POLYGON_NETWORK')

  const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: POLYGON_NETWORK === 'polygon-mainnet' ? Network.MATIC_MAINNET : Network.MATIC_MUMBAI,
  }

  return new Alchemy(settings)
}

/**
 * Get Diamond Hand SBT tokenId
 * @returns
 */
export function useOwnedDiamondHandSBT() {
  const [owned, setOwned] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { account } = useEthers()

  useEffect(() => {
    if (!account) {
      setLoading(false)
      return
    }

    setLoading(true)

    const alchemy = initAlchemy()

    const DIAMOND_HAND_CONTRACT_ADDRESS = getViteEnv('VITE_DIAMOND_HAND_CONTRACT_ADDRESS')

    alchemy.nft
      .getNftsForOwner(account, {
        contractAddresses: [DIAMOND_HAND_CONTRACT_ADDRESS],
      })
      .then((res) => {
        setOwned(res.totalCount > 0)
      })
  }, [account, setOwned])

  return {
    owned,
    loading,
  }
}
