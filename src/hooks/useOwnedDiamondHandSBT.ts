import { useEthers } from '@usedapp/core'
import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState } from 'react'

/**
 * Init Alchemy
 * @returns
 */
const initAlchemy = (): Alchemy => {
  const ALCHEMY_API_KEY: string | undefined = import.meta.env.VITE_ALCHEMY_POLYGON_API_KEY
  if (!ALCHEMY_API_KEY) throw new TypeError('VITE_ALCHEMY_POLYGON_API_KEY not set')
  const IS_POLYGON_MAINNET: string | undefined = import.meta.env.VITE_IS_POLYGON_MAINNET
  const settings = {
    apiKey: ALCHEMY_API_KEY,
    network: IS_POLYGON_MAINNET ? Network.MATIC_MAINNET : Network.MATIC_MUMBAI,
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

    const DIAMOND_HAND_CONTRACT_ADDRESS: string | undefined = import.meta.env.VITE_DIAMOND_HAND_CONTRACT_ADDRESS
    if (!DIAMOND_HAND_CONTRACT_ADDRESS) throw new TypeError('VITE_DIAMOND_HAND_CONTRACT_ADDRESS not set')

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
