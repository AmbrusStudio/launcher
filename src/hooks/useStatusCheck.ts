import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { MetadataStatus } from '../types'
import { useE4CRangerTotalStakingTime, useE4CRangerUpgradeDuration } from './useE4CRanger'
import { useImmutableXStakingStatus } from './useImmutableX'
import { useOwnedDiamondHandSBT } from './useOwnedDiamondHandSBT'

/**
 * Staking status
 * @param tokenId
 * @returns
 */
export function useStatusCheck(tokenId: string, address: string, metadataStatus: MetadataStatus, tokenAddress: string) {
  // upgradeDuration
  const upgradeDurationEthereum = useE4CRangerUpgradeDuration(address)

  // totalStakingTime
  const totalStakingTimeEthereum = useE4CRangerTotalStakingTime(address, tokenId)

  // ImmutableX StakingStatus
  const stakingStatus = useImmutableXStakingStatus(
    metadataStatus === MetadataStatus.ImmutableX ? tokenAddress : '',
    tokenId
  )

  const upgradeDuration = useMemo(() => {
    if (metadataStatus === MetadataStatus.Ethereum) {
      return upgradeDurationEthereum
    } else if (metadataStatus === MetadataStatus.ImmutableX) {
      return stakingStatus?.stakingDuration ? stakingStatus?.stakingDuration / 1000 : 0
    } else {
      return 0
    }
  }, [metadataStatus, upgradeDurationEthereum, stakingStatus?.stakingDuration])

  const totalStakingTime = useMemo(() => {
    if (metadataStatus === MetadataStatus.Ethereum) {
      return totalStakingTimeEthereum
    } else if (metadataStatus === MetadataStatus.ImmutableX) {
      return stakingStatus?.totalStakingTime ? stakingStatus?.totalStakingTime / 1000 : 0
    } else {
      return 0
    }
  }, [metadataStatus, totalStakingTimeEthereum, stakingStatus?.totalStakingTime])

  const stakingTime = useMemo<BigNumber>(
    () => (totalStakingTime ? new BigNumber(totalStakingTime.toString()) : new BigNumber(0)),
    [totalStakingTime]
  )
  // console.log('stakingTime', stakingTime)

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
  // console.log('stakedPercentage', stakedPercentage)

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
