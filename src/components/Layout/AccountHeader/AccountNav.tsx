import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAccountInfo, useImmutableXWallet } from '../../../hooks'
import { classNames, getMainSiteLink } from '../../../utils'
import { IconAccount, IconAmbrus2, IconESports, IconExit, IconHome, IconSettings, IconWidgets } from '../../Icon'
import { IconHeaderClose, IconHeaderMenu } from '../../Icon'
import { ExternalLink } from '../../Link'

type AccountNavButtonProps = {
  navOpen: boolean
  onNavClick: () => void
}

function AccountNavButton(props: AccountNavButtonProps) {
  const { navOpen, onNavClick } = props
  const handleNavClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.stopPropagation()
      onNavClick()
    },
    [onNavClick]
  )

  return (
    <button className="text-rust mr-12px md:mr-0" onClick={handleNavClick} title="Nav Toggle" type="button">
      {navOpen && <IconHeaderClose className="w-24px h-24px md:w-44px md:h-44px" />}
      {!navOpen && <IconHeaderMenu className="w-24px h-24px md:w-44px md:h-44px" />}
    </button>
  )
}

type AccountNavItemVariants = 'nav' | 'tool'

type AccountNavItemProps = {
  name: string
  className?: string
  variant?: AccountNavItemVariants
  onNavClick?: React.MouseEventHandler<HTMLButtonElement>
}

const accountNavItemIconNormalV: Record<AccountNavItemVariants, string> = {
  nav: 'bg-black/10 text-white',
  tool: 'bg-white/20 text-grey-medium',
}

function AccountNavItem(props: React.PropsWithChildren<AccountNavItemProps>) {
  const { className, children, name, variant = 'nav' } = props
  return (
    <button
      className={classNames(
        'flex flex-row flex-nowrap items-center rounded-12px',
        'backdrop-blur-6px drop-shadow-account-nav overflow-hidden',
        className
      )}
      type="button"
      title={name}
    >
      <div
        className={classNames(
          'px-20px py-14px font-semibold text-16px leading-20px text-white',
          'uppercase bg-black/50 whitespace-nowrap backdrop-blur-6px'
        )}
      >
        {name}
      </div>
      <div
        className={classNames(
          'flex flex-row flex-nowrap items-center',
          'p-6px w-48px h-48px backdrop-blur-6px',
          accountNavItemIconNormalV[variant]
        )}
      >
        {children}
      </div>
    </button>
  )
}

type AccountNavListProps = {
  navOpen: boolean
}

function AccountNavList(props: AccountNavListProps) {
  const { navOpen } = props
  const navigate = useNavigate()
  const { remove: removeAccount } = useAccountInfo()
  const { walletLogout } = useImmutableXWallet()

  const handleSignOutClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.stopPropagation()
      await walletLogout()
      removeAccount()
      navigate('/account/signin', { replace: true })
    },
    [navigate, removeAccount, walletLogout]
  )

  return (
    <nav
      className={classNames(
        'hidden flex-col items-end gap-16px',
        'absolute transition-all h-0 opacity-0',
        'top-full right-0 mt-40px',
        navOpen && 'h-auto opacity-100 flex'
      )}
    >
      <ExternalLink to={getMainSiteLink('/')} title="Official Website">
        <AccountNavItem name="Official Website">
          <IconAmbrus2 className="text-rust" />
        </AccountNavItem>
      </ExternalLink>
      <Link to="/account/home">
        <AccountNavItem name="Account Center">
          <IconHome className="w-36px h-36px" />
        </AccountNavItem>
      </Link>
      <Link to="/account/games">
        <AccountNavItem name="Games">
          <IconESports className="w-36px h-36px" />
        </AccountNavItem>
      </Link>
      <Link to="/account/nft">
        <AccountNavItem name="My NFTs">
          <IconAccount className="w-36px h-36px" />
        </AccountNavItem>
      </Link>
      <AccountNavItem name="My Game Assets">
        <IconWidgets className="w-36px h-36px" />
      </AccountNavItem>
      <Link to="/account/settings">
        <AccountNavItem name="Settings" variant="tool">
          <IconSettings className="w-36px h-36px" />
        </AccountNavItem>
      </Link>
      <AccountNavItem name="Log Out" variant="tool" onNavClick={handleSignOutClick}>
        <IconExit className="w-36px h-36px" />
      </AccountNavItem>
    </nav>
  )
}

type AccountNavProps = AccountNavButtonProps

export function AccountNav(props: AccountNavProps) {
  const { navOpen, onNavClick } = props

  return (
    <div id="account-nav-menu" className="flex relative lg:hidden">
      <AccountNavButton navOpen={navOpen} onNavClick={onNavClick} />
      <AccountNavList navOpen={navOpen} />
    </div>
  )
}
