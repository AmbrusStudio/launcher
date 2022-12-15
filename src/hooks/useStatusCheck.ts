import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { MetadataStatus, NFTImmutableX } from '../types'
import { useE4CRangerTotalStakingTime, useE4CRangerUpgradeDuration } from './useE4CRanger'
import { useOwnedDiamondHandSBT } from './useOwnedDiamondHandSBT'

/**
 * Staking status
 * @returns
 */
export function useStatusCheck(nft: NFTImmutableX) {
  // Ethereum upgradeDuration
  const upgradeDurationEthereum = useE4CRangerUpgradeDuration(nft.status === MetadataStatus.Ethereum ? nft.address : '')

  // Ethereum totalStakingTime
  const totalStakingTimeEthereum = useE4CRangerTotalStakingTime(
    nft.status === MetadataStatus.Ethereum ? nft.address : '',
    nft.tokenId
  )

  // Calculate upgradeDuration
  const upgradeDuration = useMemo(() => {
    const time = {
      [MetadataStatus.Ethereum]: upgradeDurationEthereum,
      [MetadataStatus.ImmutableX]: nft?.l2Overall?.stakingDuration ? nft.l2Overall.stakingDuration / 1000 : 0,
    }

    return time[nft.status] || 0
  }, [upgradeDurationEthereum, nft?.l2Overall?.stakingDuration, nft.status])

  // Calculate totalStakingTime
  const totalStakingTime = useMemo(() => {
    const time = {
      [MetadataStatus.Ethereum]: totalStakingTimeEthereum,
      [MetadataStatus.ImmutableX]: nft?.l2Overall?.totalStakingTime ? nft.l2Overall.totalStakingTime / 1000 : 0,
    }

    return time[nft.status] || 0
  }, [totalStakingTimeEthereum, nft?.l2Overall?.totalStakingTime, nft.status])

  // stakingTime
  const stakingTime = useMemo<BigNumber>(
    () => (totalStakingTime ? new BigNumber(totalStakingTime.toString()) : new BigNumber(0)),
    [totalStakingTime]
  )

  // Staking time percentage
  const stakedPercentage = useMemo<number>(() => {
    if (!upgradeDuration || !stakingTime || new BigNumber(upgradeDuration.toString()).lte(0)) {
      return 0
    } else if (stakingTime.gte(new BigNumber(upgradeDuration.toString()))) {
      return 100
    } else {
      const result = stakingTime.div(new BigNumber(upgradeDuration.toString())).toNumber()
      return Math.round(result * 10000) / 100.0
    }
  }, [upgradeDuration, stakingTime])

  // Total duration
  const duration = useMemo<string>(() => (upgradeDuration ? upgradeDuration.toString() : '0'), [upgradeDuration])

  // Time left
  const timeLeft = useMemo<string>(() => {
    if (!upgradeDuration || !stakingTime || stakingTime.gte(new BigNumber(upgradeDuration.toString()))) {
      return '0'
    } else {
      return new BigNumber(upgradeDuration.toString()).minus(stakingTime).toString()
    }
  }, [upgradeDuration, stakingTime])
  // console.log('timeLeft', timeLeft)

  // Staking Status
  const timeStatus = useMemo<boolean>(() => {
    if (!upgradeDuration || !stakingTime) {
      return false
    } else {
      return stakingTime.gte(new BigNumber(upgradeDuration.toString()))
    }
  }, [upgradeDuration, stakingTime])

  // Soulbound Badge Status
  const { owned: soulboundBadgeStatus } = useOwnedDiamondHandSBT()

  const status = useMemo<boolean>(() => timeStatus && soulboundBadgeStatus, [timeStatus, soulboundBadgeStatus])

  return {
    timeLeft,
    stakedPercentage,
    duration,
    timeStatus,
    soulboundBadgeStatus,
    status,
  }
}
