import React from 'react'

import { classNames } from '../../../utils'

type AccountPopupProps = {
  className?: string
  title: string
  showBack?: boolean
  onNavBackClick?: () => void
}

export function AccountPopup(props: React.PropsWithChildren<AccountPopupProps>) {
  const { children, className, title } = props
  return (
    <div className="flex flex-col drop-shadow-nft-modal">
      <div className="flex flex-row flex-nowrap items-center p-24px xl:py-16px text-white bg-black-bg/80">
        <h4 className="font-bold text-16px xl:text-36px leading-20px xl:leading-44px uppercase">{title}</h4>
      </div>
      <div className={classNames('flex flex-col p-24px xl:p-36px bg-white/80 backdrop-blur-20px', className)}>
        {children}
      </div>
    </div>
  )
}