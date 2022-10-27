import React from 'react'

import { classNames } from '../../../utils'

type GameNavTitleProps = {
  className?: string
}

export function GameNavTitle(props: React.PropsWithChildren<GameNavTitleProps>) {
  return (
    <div className={classNames('font-medium text-grey-medium text-14px leading-18px uppercase', props.className)}>
      {props.children}
    </div>
  )
}
