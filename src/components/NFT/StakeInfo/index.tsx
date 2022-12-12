import { FC } from 'react'

import { NFTE4CRanger, StakeInfoDataType } from '../../../types'
import Announcements from '../Announcements'
import StakeInfoDetail from '../StakeInfoDetail'

interface StakeInfoProps {
  readonly stakeLoading: boolean
  readonly nft: NFTE4CRanger
  readonly infoData: StakeInfoDataType
  toggle: (value: boolean) => void
  stake: () => void
}

const StakeInfo: FC<StakeInfoProps> = ({ stakeLoading, nft, infoData, toggle, stake }) => {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex">
      <div className="w-[53.5%] overflow-auto float-left bg-white p-6 grid gap-y-20.5">
        <Announcements address={'0xabd0857baad28f6c7c3814e9e70e4eb54566f3ae'} />
      </div>
      <StakeInfoDetail
        infoData={infoData}
        stakeLoading={stakeLoading}
        toggle={toggle}
        stake={stake}
        address={'0xabd0857baad28f6c7c3814e9e70e4eb54566f3ae'}
      />
    </div>
  )
}

export default StakeInfo
