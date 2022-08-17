import React from 'react'

import { classNames } from '../../../utils'
import { IconArrowLeft } from '../../Icon'

type AccountPopupProps = {
  className?: string
  title: string
  showBack: boolean
  onNavBackClick: () => void
}

export function AccountPopup(props: React.PropsWithChildren<AccountPopupProps>) {
  const { children, className, title, showBack, onNavBackClick } = props
  return (
    <div className="flex flex-col drop-shadow-nft-modal min-h-screen xl:min-h-auto">
      <div className="flex flex-row flex-nowrap items-center p-24px xl:py-16px text-white bg-black-bg/80">
        {showBack && (
          <button className="mr-12px" onClick={onNavBackClick} title="Nav back">
            <IconArrowLeft className="w-30px xl:w-44px h-auto" />
          </button>
        )}
        <h4 className="font-bold text-24px xl:text-36px leading-30px xl:leading-44px uppercase whitespace-nowrap">
          {title}
        </h4>
      </div>
      <div className={classNames('flex flex-col flex-1 p-24px xl:p-36px', 'bg-white/80 backdrop-blur-20px', className)}>
        {children}
      </div>
    </div>
  )
}
