import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC } from 'react'

import { confirmUnstakeData } from '../../../data'
import Modal from '../Modal'

interface ConfirmUnstakeModalProps {
  readonly visible: boolean
  readonly loading?: boolean
  close: () => void
  confirm: () => void
}

const ConfirmUnstakeModal: FC<ConfirmUnstakeModalProps> = ({ visible, loading = false, close, confirm }) => {
  return (
    <Modal title="Are you sure?" visible={visible} close={close}>
      <div className="bg-white backdrop-blur-md p-6 h-full">
        <Stack spacing={3}>
          <p className="m-0 p-0 font-normal text-base leading-[30px] not-italic text-[#4a4a4a]">
            {confirmUnstakeData.description}
          </p>
          <button
            disabled={loading}
            className={classNames('u-btn', {
              loading: loading,
            })}
            onClick={() => confirm()}
          >
            Yes, Reset upgrading status
          </button>
          <button className="u-btn" onClick={() => close()}>
            Cancel
          </button>
        </Stack>
      </div>
    </Modal>
  )
}

export default ConfirmUnstakeModal
