import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC, useState } from 'react'

import { statusCheckData } from '../../../data'
import { useStatusCheck } from '../../../hooks/useStatusCheck'
import { NFTImmutableX } from '../../../types'
import { ArrowUp } from '../../Icon'
import Announcements from '../Announcements'
import CheckCardClaimed from '../CheckCardClaimed'
import CheckCardCountdown from '../CheckCardCountdown'
import Modal from '../Modal'

interface Props {
  readonly visible: boolean
  readonly loading?: boolean
  readonly nft: NFTImmutableX
  close: () => void
  upgrade: () => void
  unstake: () => void
}

const StatusCheckModal: FC<Props> = ({ visible, loading = false, nft, close, upgrade, unstake }) => {
  const [drawer, setDrawer] = useState<boolean>(false)
  const { timeLeft, stakedPercentage, duration, timeStatus, soulboundBadgeStatus, status } = useStatusCheck(nft)

  return (
    <Modal visible={visible} title={statusCheckData.title} close={close}>
      <div className="bg-white backdrop-blur-md px-6 pt-6 pb-27 grid gap-y-[36px]">
        <Announcements address={nft.address} />
      </div>
      <div className="bg-black backdrop-blur-md pt-6 pb-27 px-6"></div>
      <button className="u-btn u-btn-primary !w-auto fixed left-6 bottom-6 right-6" onClick={() => setDrawer(true)}>
        My Status
        <ArrowUp className="!text-base ml-3" />
      </button>

      {drawer && (
        <div className="fixed z-12 left-0 right-0 bottom-0">
          <div
            className="py-[10px] bg-black shadow-statusCheck-drawer-modal flex items-center justify-center"
            onClick={() => {
              setDrawer(false)
            }}
          >
            <ArrowUp className="!text-base rotate-180" />
          </div>
          <div className="p-6 bg-black/70 backdrop-blur-[10px] shadow-statusCheck-drawer-modal">
            <p className="font-normal text-base leading-[24px] text-white not-italic mb-3">
              {statusCheckData.description}
            </p>

            <Stack spacing={1.5} direction="row">
              <CheckCardCountdown
                duration={duration}
                timeLeft={timeLeft}
                stakedPercentage={stakedPercentage}
                timeStatus={timeStatus}
              />
              <CheckCardClaimed soulboundBadgeStatus={soulboundBadgeStatus} />
            </Stack>

            <Stack spacing={1.5} className="mt-3">
              <button
                className={classNames('u-btn', {
                  'u-btn-primary': status,
                  'u-btn-disabled': !status,
                  loading: loading,
                })}
                disabled={!status || loading}
                onClick={() => upgrade()}
              >
                Upgrade
              </button>
              <button
                disabled={loading}
                className={classNames('u-btn', {
                  loading: loading,
                })}
                onClick={() => unstake()}
              >
                Unstake
              </button>
            </Stack>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default StatusCheckModal
