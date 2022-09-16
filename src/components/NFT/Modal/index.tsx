import { FC, ReactNode } from 'react'

import Close from '../../Icon/Close'

interface Props {
  readonly visible: boolean
  readonly title: string
  readonly closable?: boolean
  close: () => void
  children: ReactNode
}

const Modal: FC<Props> = ({ visible, title, close, closable = true, children }) => {
  return (
    <>
      {visible && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col z-11">
          <div className="bg-black/70 backdrop-blur-md drop-shadow-statusCheck-head-modal text-white p-6 flex items-center justify-between z-12">
            <span className="font-bold text-2xl leading-[29px] text-white not-italic uppercase">{title}</span>
            {closable && (
              <Close
                onClick={() => close()}
                sx={{
                  fontSize: '22px',
                  cursor: 'pointer',
                }}
              />
            )}
          </div>
          <div className="overflow-auto bg-black flex-1">{children}</div>
        </div>
      )}
    </>
  )
}

export default Modal
