import { useMemo } from 'react'

import { NFTImmutableX } from '../types'
import { useOwnedDiamondHandSBT } from './useOwnedDiamondHandSBT'

/**
 * Staking status Hive
 * @returns
 */
export function useStatusCheckHive(nft: NFTImmutableX) {
  // Soulbound Badge Status
  const { owned: soulboundBadgeStatus } = useOwnedDiamondHandSBT()

  const status = useMemo<boolean>(() => !!soulboundBadgeStatus, [soulboundBadgeStatus])

  return {
    soulboundBadgeStatus,
    status,
  }
}
