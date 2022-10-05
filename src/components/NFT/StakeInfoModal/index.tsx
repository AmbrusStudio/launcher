import classNames from 'classnames'
import { FC } from 'react'

import { ADDRESS_E4C_Ranger_Gold_Edition } from '../../../contracts'
import { stakeToUpgrade } from '../../../data'
import { getStakeAnnouncement } from '../../../utils'
import Modal from '../Modal'
import NFTAnnouncement from '../NFTAnnouncement'

interface Props {
  readonly visible: boolean
  readonly loading?: boolean
  close: () => void
  stake: () => void
}

const StakeInfoModal: FC<Props> = ({ visible, loading = false, close, stake }) => {
  return (
    <Modal visible={visible} title={stakeToUpgrade.title} close={close}>
      <div className="bg-white backdrop-blur-md px-6 pt-6 pb-[109px] grid gap-y-[36px]">
        {getStakeAnnouncement(ADDRESS_E4C_Ranger_Gold_Edition).map((item, index) => (
          <NFTAnnouncement data={item} key={index} />
        ))}
      </div>
      <div className="bg-black backdrop-blur-md p-6">
        <p className="font-normal text-base leading-[30px] text-white not-italic">{stakeToUpgrade.description}</p>
      </div>
      <button
        disabled={loading}
        className={classNames('u-btn u-btn-primary !w-auto fixed left-6 bottom-6 right-6', {
          loading: loading,
        })}
        onClick={() => stake()}
      >
        Start Staking Now
      </button>
    </Modal>
  )
}

export default StakeInfoModal
