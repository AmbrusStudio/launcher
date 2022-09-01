import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import BigNumber from 'bignumber.js'
import classNames from 'classnames'
import { FC, useMemo, useState } from 'react'

import { ADDRESS_E4C_Ranger } from '../../../contracts'
import { stakeAnnouncement, statusCheckData } from '../../../data'
import {
  useE4CRangerLastStakingTime,
  useE4CRangerTotalStakingTime,
  useE4CRangerUpgradeDuration,
} from '../../../hooks/useE4CRanger'
import { NFTE4CRanger } from '../../../types'
import CheckCard from '../CheckCard'
import ConfirmUnstake from '../ConfirmUnstake'
import ConfirmUpgrade from '../ConfirmUpgrade'
import NFTAnnouncement from '../NFTAnnouncement'

const WrapperInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
`
const Title = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-transform: uppercase;
  color: #ffffff;
  padding: 0;
  margin: 0;
`

interface StatusCheckProps {
  readonly unstakeLoading: boolean
  readonly nft: NFTE4CRanger
  toggle: (value: boolean) => void
  unstake: () => void
}

const StatusCheck: FC<StatusCheckProps> = ({ unstakeLoading, nft, toggle, unstake }) => {
  const [visibleUnstake, setVisibleUnstake] = useState<boolean>(false)
  const [visibleUpgrade, setVisibleUpgrade] = useState<boolean>(false)

  const upgradeDuration = useE4CRangerUpgradeDuration(ADDRESS_E4C_Ranger)
  // console.log('upgradeDuration', upgradeDuration)

  const lastStakingTime = useE4CRangerLastStakingTime(ADDRESS_E4C_Ranger, nft.tokenId)
  // 1661921882
  // console.log('lastStakingTime', lastStakingTime)
  const totalStakingTime = useE4CRangerTotalStakingTime(ADDRESS_E4C_Ranger, nft.tokenId)
  // console.log('totalStakingTime', totalStakingTime)

  // '33298'
  const stakingTime = useMemo<BigNumber>(() => {
    if (!lastStakingTime || !totalStakingTime) {
      return new BigNumber(0)
    }
    const nowTime = Math.floor(Date.now() / 1000)

    // now - lastStakingTime + totalStakingTime
    return new BigNumber(nowTime).minus(
      new BigNumber(lastStakingTime.toString()).plus(new BigNumber(totalStakingTime.toString()))
    )
  }, [lastStakingTime, totalStakingTime])
  // console.log('stakingTime', stakingTime)

  const timeLeft = useMemo<BigNumber>(() => {
    if (!upgradeDuration || !stakingTime || stakingTime.gte(new BigNumber(upgradeDuration.toString()))) {
      return new BigNumber(0)
    } else {
      return new BigNumber(upgradeDuration.toString()).minus(new BigNumber(stakingTime.toString()))
    }
  }, [upgradeDuration, stakingTime])
  // console.log('timeLeft', timeLeft)

  const stakedPercentage = useMemo<number>(() => {
    if (!upgradeDuration || !stakingTime || new BigNumber(upgradeDuration.toString()).lte(0)) {
      return 0
    } else if (stakingTime.gte(new BigNumber(upgradeDuration.toString()))) {
      return 100
    } else {
      const result = new BigNumber(stakingTime.toString()).div(new BigNumber(upgradeDuration.toString())).toNumber()
      return Math.round(result * 10000) / 100.0
    }
  }, [upgradeDuration, stakingTime])
  // console.log('stakedPercentage', stakedPercentage)

  const duration = useMemo<BigNumber>(() => {
    return upgradeDuration ? new BigNumber(upgradeDuration.toString()) : new BigNumber(0)
  }, [upgradeDuration])

  const timeStatus = useMemo<boolean>(() => {
    if (!upgradeDuration || !stakingTime) {
      return false
    } else {
      return stakingTime.gte(new BigNumber(upgradeDuration.toString()))
    }
  }, [upgradeDuration, stakingTime])
  const soulboundBadgeStatus = useMemo<boolean>(() => true, [])
  const status = useMemo<boolean>(() => timeStatus && soulboundBadgeStatus, [timeStatus, soulboundBadgeStatus])

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex">
      <div className="lg:w-[600px] lg:h-[600px] overflow-auto bg-white p-6 grid gap-y-20.5">
        {stakeAnnouncement.map((item, index) => (
          <NFTAnnouncement data={item} key={index} />
        ))}
      </div>
      <WrapperInfo>
        <Title>{statusCheckData.title}</Title>
        <p className="font-normal text-base leading-[30px] text-white not-italic mt-3 mb-auto">
          {statusCheckData.description}
        </p>

        <CheckCard
          duration={duration}
          timeLeft={timeLeft}
          stakedPercentage={stakedPercentage}
          timeStatus={timeStatus}
          soulboundBadgeStatus={soulboundBadgeStatus}
        />

        <Stack
          spacing={1.5}
          sx={{
            mt: 3,
          }}
        >
          <button
            className={classNames('u-btn', {
              'u-btn-primary': status,
              'u-btn-disabled': !status,
              loading: unstakeLoading,
            })}
            disabled={!status || unstakeLoading}
            onClick={() => setVisibleUpgrade(true)}
          >
            Upgrade
          </button>
          <button
            disabled={unstakeLoading}
            className={classNames('u-btn', {
              loading: unstakeLoading,
            })}
            onClick={() => setVisibleUnstake(true)}
          >
            Unstake
          </button>
          <button className="u-btn" onClick={() => toggle(false)}>
            Cancel
          </button>
        </Stack>

        <ConfirmUnstake
          visible={visibleUnstake}
          toggle={setVisibleUnstake}
          confirm={() => {
            setVisibleUnstake(false)
            unstake()
          }}
        />
        <ConfirmUpgrade
          visible={visibleUpgrade}
          toggle={setVisibleUpgrade}
          confirm={() => {
            setVisibleUpgrade(false)
            unstake()
          }}
        />
      </WrapperInfo>
    </div>
  )
}

export default StatusCheck
