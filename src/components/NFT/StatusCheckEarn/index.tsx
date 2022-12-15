import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC, useMemo, useState } from 'react'

import { confirmUnstakeEarnData, confirmUpgradeEarnData, stakeCheckEarn } from '../../../data'
import { useStatusCheckHive } from '../../../hooks/useStatusCheckHive'
import { NFTImmutableX } from '../../../types'
import ConfirmModal from '../../ConfirmModal'
import Announcements from '../Announcements'
import CheckCardEarnAmount from '../CheckCardEarnAmount'
import CheckCardEarnClaimed from '../CheckCardEarnClaimed'
import CheckCardStakedDay from '../CheckCardStakedDay'
import StakeInfoDetail from '../StakeInfoDetail'

const WrapperInfo = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
`

interface Props {
  readonly unstakeLoading: boolean
  readonly nft: NFTImmutableX
  toggle: (value: boolean) => void
  unstake: () => void
}

const StatusCheckEarn: FC<Props> = ({ unstakeLoading, nft, toggle, unstake }) => {
  const [visibleUnstake, setVisibleUnstake] = useState<boolean>(false)
  const [visibleUpgrade, setVisibleUpgrade] = useState<boolean>(false)

  const { soulboundBadgeStatus, status } = useStatusCheckHive(nft)

  const unstakeAndEarnState = useMemo<boolean>(() => {
    return status && Number(nft?.l2Overall?.earnedDgc || 0) > 0
  }, [nft?.l2Overall?.earnedDgc, status])

  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex">
        <div className="w-[47.62%] overflow-auto float-left bg-white p-6 grid gap-y-20.5">
          <Announcements address={nft.address} />
        </div>
        <WrapperInfo className="w-[52.38%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0 overflow-auto">
          <StakeInfoDetail title={stakeCheckEarn.title || ''} description={stakeCheckEarn.description || ''} />

          <div className="flex flex-row gap-2.5 mt-auto">
            <CheckCardStakedDay
              time={(nft?.l2Overall?.stakingDuration && nft?.l2Overall?.stakingDuration / 1000) || 0}
            />
            <CheckCardEarnAmount amount={nft?.l2Overall?.earnedDgc || '0'} />
            <CheckCardEarnClaimed soulboundBadgeStatus={soulboundBadgeStatus} />
          </div>

          <Stack
            spacing={1.5}
            sx={{
              mt: 3,
            }}
          >
            <button
              disabled={unstakeLoading}
              className={classNames('u-btn', {
                loading: unstakeLoading,
              })}
              onClick={() => {
                if (unstakeAndEarnState) {
                  setVisibleUpgrade(true)
                } else {
                  setVisibleUnstake(true)
                }
              }}
            >
              {unstakeAndEarnState ? 'Unstake & Earn' : 'Unstake'}
            </button>
            <button className="u-btn" onClick={() => toggle(false)}>
              Cancel
            </button>
          </Stack>
        </WrapperInfo>
      </div>
      <ConfirmModal
        title={confirmUnstakeEarnData.title}
        description={confirmUnstakeEarnData.description}
        visible={visibleUnstake}
        okText="Yes, I understand"
        onCancel={() => {
          setVisibleUnstake(false)
        }}
        onConfirm={() => {
          setVisibleUnstake(false)
          unstake()
        }}
      />
      <ConfirmModal
        title={confirmUpgradeEarnData.title}
        description={confirmUpgradeEarnData.description}
        visible={visibleUpgrade}
        okText="Yes, I understand"
        onCancel={() => {
          setVisibleUpgrade(false)
        }}
        onConfirm={() => {
          setVisibleUpgrade(false)
          unstake()
        }}
      />
    </>
  )
}

export default StatusCheckEarn
