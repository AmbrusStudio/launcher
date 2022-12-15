import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC, useContext, useState } from 'react'

import { StakeCtx } from '../../../context'
import { confirmUnstakeData, confirmUpgradeData } from '../../../data'
import { useStatusCheck } from '../../../hooks/useStatusCheck'
import { NFTImmutableX } from '../../../types'
import ConfirmModal from '../../ConfirmModal'
import Announcements from '../Announcements'
import CheckCardClaimed from '../CheckCardClaimed'
import CheckCardCountdown from '../CheckCardCountdown'
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

const StatusCheck: FC<Props> = ({ unstakeLoading, nft, toggle, unstake }) => {
  const [visibleUnstake, setVisibleUnstake] = useState<boolean>(false)
  const [visibleUpgrade, setVisibleUpgrade] = useState<boolean>(false)

  const { timeLeft, stakedPercentage, duration, timeStatus, soulboundBadgeStatus, status } = useStatusCheck(nft)

  const stakeCtx = useContext(StakeCtx)

  return (
    <>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex">
        <div className="w-[53.5%] overflow-auto float-left bg-white p-6 grid gap-y-20.5">
          <Announcements address={nft.address} />
        </div>
        <WrapperInfo className="w-[46.5%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0 overflow-auto">
          <StakeInfoDetail
            title={stakeCtx?.checkAnnouncement.title || ''}
            description={stakeCtx?.checkAnnouncement.description || ''}
          />

          <Stack spacing={1.5} direction="row" className="mt-auto">
            <CheckCardCountdown
              duration={duration}
              timeLeft={timeLeft}
              stakedPercentage={stakedPercentage}
              timeStatus={timeStatus}
            />
            <CheckCardClaimed soulboundBadgeStatus={soulboundBadgeStatus} />
          </Stack>

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
        </WrapperInfo>
      </div>

      <ConfirmModal
        title={confirmUnstakeData.title}
        description={confirmUnstakeData.description}
        visible={visibleUnstake}
        okText="Yes, Reset upgrading status"
        onCancel={() => {
          setVisibleUnstake(false)
        }}
        onConfirm={() => {
          setVisibleUnstake(false)
          unstake()
        }}
      />
      <ConfirmModal
        title={confirmUpgradeData.title}
        description={confirmUpgradeData.description}
        visible={visibleUpgrade}
        okText="Upgrade and unstake"
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

export default StatusCheck
