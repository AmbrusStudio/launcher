import classNames from 'classnames'
import { FC } from 'react'

import { stakeUpgrade } from '../../../data'
import { NFTE4CRanger } from '../../../types'
import Announcements from '../Announcements'
import Modal from '../Modal'

interface Props {
  readonly visible: boolean
  readonly loading?: boolean
  readonly nft: NFTE4CRanger
  close: () => void
  stake: () => void
}

const StakeInfoModal: FC<Props> = ({ visible, loading = false, nft, close, stake }) => {
  return (
    <Modal visible={visible} title={stakeUpgrade.title} close={close}>
      <div className="bg-white backdrop-blur-md px-6 pt-6 pb-27 grid gap-y-[36px]">
        <Announcements address={nft.address} />
      </div>
      <div className="bg-black backdrop-blur-md pt-6 pb-27 px-6">
        <p className="font-normal text-base leading-[30px] text-white not-italic">{stakeUpgrade.description}</p>
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
