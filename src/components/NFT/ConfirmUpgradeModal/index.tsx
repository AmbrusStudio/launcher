import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC } from 'react'

import { confirmUpgradeData } from '../../../data'
import Modal from '../Modal'

interface ConfirmUpgradeModalProps {
  readonly visible: boolean
  readonly loading?: boolean
  close: () => void
  confirm: () => void
}

const ConfirmUpgradeModal: FC<ConfirmUpgradeModalProps> = ({ visible, loading = false, close, confirm }) => {
  return (
    <Modal title="Upgrade your NFT?" visible={visible} close={close}>
      <div className="bg-white backdrop-blur-md p-6 h-full">
        <Stack spacing={3}>
          <p className="m-0 p-0 font-normal text-base leading-[30px] not-italic text-[#4a4a4a]">
            {confirmUpgradeData.description}
          </p>
          <button
            disabled={loading}
            className={classNames('u-btn u-btn-primary', {
              loading: loading,
            })}
            onClick={() => confirm()}
          >
            Upgrade and unstake
          </button>
          <button className="u-btn" onClick={() => close()}>
            Cancel
          </button>
        </Stack>
      </div>
    </Modal>
  )
}

export default ConfirmUpgradeModal
