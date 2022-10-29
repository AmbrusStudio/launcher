import React from 'react'

import { classNames } from '../../../utils'
import { AccountInfo } from './AccountInfo'
import { AccountNav } from './AccountNav'
import { AccountTitie } from './AccountTitie'

type AccountHeaderProps = {
  title: string
  subtitle: string
  sessionExpiredNavigateTo: string
}

export function AccountHeader(props: AccountHeaderProps) {
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false)
  const [accountNavOpen, setAccountNavOpen] = React.useState(false)

  const toggleAccountMenuOpen = React.useCallback(() => {
    setAccountNavOpen(false)
    setAccountMenuOpen((o) => !o)
  }, [])
  const toggleAccountNavOpen = React.useCallback(() => {
    setAccountMenuOpen(false)
    setAccountNavOpen((o) => !o)
  }, [])

  const handleMaskClick = React.useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    e.stopPropagation()
    setAccountMenuOpen(false)
    setAccountNavOpen(false)
  }, [])

  const showMask = accountMenuOpen || accountNavOpen

  return (
    <header
      id="account-center-header"
      className={classNames(
        'flex flex-col-reverse gap-24px max-w-1332px z-30 relative',
        'lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between',
        'lg:ml-108px lg:pt-36px lg:px-36px lg:gap-0'
      )}
    >
      {showMask && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/30 lg:hidden" onClick={handleMaskClick} />
      )}
      <AccountTitie title={props.title} subtitle={props.subtitle} />
      <div
        className={classNames(
          'flex flex-row flex-nowrap justify-between items-center',
          'p-12px md:p-24px bg-black/40 backdrop-blur-6px',
          'lg:p-0 lg:bg-transparent lg:backdrop-blur-0'
        )}
      >
        <AccountInfo
          sessionExpiredNavigateTo={props.sessionExpiredNavigateTo}
          menuOpen={accountMenuOpen}
          onAvatarClick={toggleAccountMenuOpen}
        />
        <AccountNav navOpen={accountNavOpen} onNavClick={toggleAccountNavOpen} />
      </div>
    </header>
  )
}
