import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC, useState } from 'react'

import { stakeAnnouncement, statusCheckData } from '../../../data'
import { useStatusCheck } from '../../../hooks/useStatusCheck'
import { NFTE4CRanger } from '../../../types'
import { ArrowUp } from '../../Icon'
import CheckCard from '../CheckCard'
import Modal from '../Modal'
import NFTAnnouncement from '../NFTAnnouncement'

interface Props {
  readonly visible: boolean
  readonly loading?: boolean
  readonly nft: NFTE4CRanger
  toggle: (value: boolean) => void
  stake: () => void
}

const StatusCheckModal: FC<Props> = ({ visible, loading = false, toggle, stake, nft }) => {
  const [drawer, setDrawer] = useState<boolean>(false)
  const { timeLeft, stakedPercentage, duration, timeStatus, soulboundBadgeStatus, status } = useStatusCheck(nft.tokenId)

  return (
    <Modal visible={visible} title={statusCheckData.title} close={() => toggle(false)}>
      <div className="bg-white backdrop-blur-md px-6 pt-6 pb-[109px] grid gap-y-[36px]">
        {stakeAnnouncement.map((item, index) => (
          <NFTAnnouncement data={item} key={index} />
        ))}
      </div>
      <div className="bg-black backdrop-blur-md p-6"></div>
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
            <CheckCard
              duration={duration}
              timeLeft={timeLeft}
              stakedPercentage={stakedPercentage}
              timeStatus={timeStatus}
              soulboundBadgeStatus={soulboundBadgeStatus}
            />
            <Stack spacing={1.5} className="mt-3">
              <button
                className={classNames('u-btn', {
                  'u-btn-primary': status,
                  'u-btn-disabled': !status,
                  loading: loading,
                })}
                disabled={!status || loading}
                onClick={() => stake()}
              >
                Upgrade
              </button>
              <button
                disabled={loading}
                className={classNames('u-btn', {
                  loading: loading,
                })}
                onClick={() => stake()}
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
