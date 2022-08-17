import React from 'react'

import { ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'
import { IconMetamack } from '../../Icon'

type AccountContinueWithMetamaskProps = ReactButtonProps & {
  account?: string
}

export function AccountContinueWithMetamask(props: AccountContinueWithMetamaskProps) {
  const { className, account, ...others } = props
  return (
    <button
      className={classNames(
        'flex flex-row items-center box-border uppercase w-full px-24px py-20px relative',
        'font-semibold text-16px leading-20px text-center text-black bg-white',
        'hover:bg-metamask hover:text-white',
        'disabled:bg-grey-medium disabled:text-white',
        'disabled:hover:bg-grey-medium disabled:hover:text-white',
        'disabled:cursor-not-allowed',
        className
      )}
      {...others}
    >
      <IconMetamack className="absolute w-36px h-auto" />
      {!account && (
        <React.Fragment>
          <span className="w-full hidden xl:inline-block">Continue with Metamask</span>
          <span className="w-full xl:hidden">Metamask</span>
        </React.Fragment>
      )}
      {account && <span className="w-full">{account}</span>}
    </button>
  )
}
