import Dialog from '@mui/material/Dialog'
import { FC, ReactNode } from 'react'

import Close from '../Icon/Close'

interface ModalCustomProps {
  readonly visible: boolean
  readonly title: string
  readonly close?: boolean
  children: ReactNode
  toggle: (value: boolean) => void
}

const ModalCustom: FC<ModalCustomProps> = ({ visible, title, toggle, close = true, children }) => {
  return (
    <Dialog
      open={visible}
      onClose={() => toggle(false)}
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
        {close && (
          <Close
            onClick={() => toggle(false)}
            sx={{
              fontSize: '36px',
              cursor: 'pointer',
            }}
          />
        )}
      </div>
      {children}
    </Dialog>
  )
}

export default ModalCustom
