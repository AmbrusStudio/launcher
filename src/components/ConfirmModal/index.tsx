import { Stack } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import React, { FC, MouseEvent } from 'react'

import Close from '../Icon/Close'

interface Props {
  readonly visible: boolean
  readonly title: string
  readonly description: string
  readonly okText?: string
  readonly cancelText?: string
  readonly showCancel?: boolean
  onConfirm: (e?: MouseEvent<HTMLButtonElement>) => void
  onCancel: (e?: MouseEvent<HTMLButtonElement>) => void
}

const ConfirmModal: FC<Props> = ({
  visible,
  title,
  description,
  okText = 'OK',
  cancelText = 'Cancel',
  showCancel = true,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      open={visible}
      onClose={() => onCancel()}
      sx={{
        '.MuiDialog-container': {
          '.MuiPaper-root': {
            width: '100%',
            maxWidth: '600px',
            // boxShadow: 'none',
            borderRadius: 0,
          },
        },
        '.MuiBackdrop-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
        },
      }}
    >
      <div className="flex items-center justify-between px-4 py-6 text-white bg-[#2a2a2a]/80">
        <span className="font-bold text-4xl not-italic uppercase leading-44px">{title}</span>
        {showCancel && (
          <Close
            onClick={() => onCancel()}
            sx={{
              fontSize: '36px',
              cursor: 'pointer',
            }}
          />
        )}
      </div>
      <Stack
        spacing={3}
        sx={{
          p: 4.5,
          overflow: 'auto',
        }}
      >
        <p className="m-0 p-0 font-normal text-base leading-[30px] not-italic text-[#4a4a4a]">{description}</p>
        <button className="u-btn" onClick={onConfirm}>
          {okText}
        </button>
        <button className="u-btn" onClick={onCancel}>
          {cancelText}
        </button>
      </Stack>
    </Dialog>
  )
}

export default ConfirmModal
