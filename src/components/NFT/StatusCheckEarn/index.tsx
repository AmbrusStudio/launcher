import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC, useContext, useState } from 'react'

import { StakeCtx } from '../../../context'
import { confirmUnstakeEarnData } from '../../../data'
import { useStatusCheck } from '../../../hooks/useStatusCheck'
import { NFTE4CRanger, NFTImmutableX } from '../../../types'
import ConfirmModal from '../../ConfirmModal'
import Announcements from '../Announcements'
import CheckCardEarn from '../CheckCardEarn'
import StakeInfoDetail from '../StakeInfoDetail'

const WrapperInfo = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
`

interface Props {
  readonly unstakeLoading: boolean
  readonly nft: NFTE4CRanger | NFTImmutableX
  toggle: (value: boolean) => void
  unstake: () => void
}

const StatusCheckEarn: FC<Props> = ({ unstakeLoading, nft, toggle, unstake }) => {
  const [visibleUnstake, setVisibleUnstake] = useState<boolean>(false)
  const [visibleUpgrade, setVisibleUpgrade] = useState<boolean>(false)

  const { timeLeft, stakedPercentage, duration, timeStatus, soulboundBadgeStatus, status } = useStatusCheck(nft)

  const stakeCtx = useContext(StakeCtx)

  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex">
        <div className="w-[47.6%] overflow-auto float-left bg-white p-6 grid gap-y-20.5">
          <Announcements address={'0x714a090F35a1f1fC9BAa65059b28939DD0F5A196'} />
        </div>
        <WrapperInfo className="w-[52.4%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0 overflow-auto">
          <StakeInfoDetail
            title={stakeCtx?.checkAnnouncement.title || ''}
            description={stakeCtx?.checkAnnouncement.description || ''}
          />

          <div className="mt-auto">
            <CheckCardEarn
              duration={duration}
              timeLeft={timeLeft}
              stakedPercentage={stakedPercentage}
              timeStatus={timeStatus}
              soulboundBadgeStatus={soulboundBadgeStatus}
            />
          </div>

          <Stack
            spacing={1.5}
            sx={{
              mt: 3,
            }}
          >
            <button className="u-btn" onClick={() => setVisibleUnstake(true)}>
              {status ? 'Unstake' : 'Unstake & Earn'}
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
        title={confirmUnstakeEarnData.title}
        description={confirmUnstakeEarnData.description}
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
