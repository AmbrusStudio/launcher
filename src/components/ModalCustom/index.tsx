import styled from '@emotion/styled'
import Dialog from '@mui/material/Dialog'
import { FC, ReactNode } from 'react'

import Close from '../Icon/Close'

const Head = styled.div`
  width: 100%;
  background: rgba(42, 42, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  color: #ffffff;
  span {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 44px;
    text-transform: uppercase;
  }
`

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
      <Head>
        <span>{title}</span>
        {close && (
          <Close
            onClick={() => toggle(false)}
            sx={{
              fontSize: '36px',
              cursor: 'pointer',
            }}
          />
        )}
      </Head>
      {children}
    </Dialog>
  )
}

export default ModalCustom
