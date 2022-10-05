import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

import { ADDRESS_E4CRanger_Gold_Holder } from '../contracts'
import { useE4CRangerTotalStakingTime, useE4CRangerUpgradeDuration } from './useE4CRanger'

/**
 * Staking status
 * @param tokenId
 * @returns
 */
export function useStatusCheck(tokenId: string) {
  const upgradeDuration = useE4CRangerUpgradeDuration(ADDRESS_E4CRanger_Gold_Holder)
  // console.log('upgradeDuration', upgradeDuration)

  // totalStakingTime
  const totalStakingTime = useE4CRangerTotalStakingTime(ADDRESS_E4CRanger_Gold_Holder, tokenId)
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
  const soulboundBadgeStatus = useMemo<boolean>(() => false, [])

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
