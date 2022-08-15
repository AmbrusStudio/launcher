import Dialog from '@mui/material/Dialog'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FC, ReactNode } from 'react'

import Close from '../Icon/Close'

interface ModalGalleryProps {
  readonly visible: boolean
  readonly title: string
  readonly close?: boolean
  readonly id?: number
  children: ReactNode
  toggle: (value: boolean) => void
}

const ModalGallery: FC<ModalGalleryProps> = ({ visible, title, toggle, close = true, id, children }) => {
  const matchesSM = useMediaQuery('(min-width:1024px)')

  return (
    <Dialog
      fullScreen={!matchesSM}
      open={visible}
      onClose={() => toggle(false)}
      sx={{
        '.MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
        '.MuiDialog-container': {
          '.MuiPaper-root': {
            width: '100%',
            maxWidth: '1264px',
            // boxShadow: 'none',
            borderRadius: 0,
            backgroundColor: 'transparent',
          },
        },
      }}
    >
      <div className="w-full flex items-center justify-between text-white bg-[#2A2A2A] lg:bg-[rgba(42, 42, 42, 0.8)] p-x-4 p-y-4 lg:p-y-6">
        <span className="font-bold not-italic uppercase text-base leading-5 lg:text-4xl lg:leading-11">
          {title}
          <span className="ml-0 lg:ml-9 block lg:inline">#{id}</span>
        </span>
        {close && <Close onClick={() => toggle(false)} className="!text-2xl !lg:text-4xl cursor-pointer" />}
      </div>
      {children}
    </Dialog>
  )
}

export default ModalGallery
