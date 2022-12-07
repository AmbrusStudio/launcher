import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAccountInfo, useImmutableXWallet, useRouterActive, useWeb3Modal } from '../../../hooks'
import { classNames, getMainSiteLink } from '../../../utils'
import { IconAccount, IconAmbrus2, IconESports, IconExit, IconHome, IconSettings, IconWidgets } from '../../Icon'
import { ExternalLink } from '../../Link'
import { SideNavItem } from './SideNavItem'

type PageSidebarProps = {
  className?: string
}

export function PageSidebar(props: PageSidebarProps) {
  const { isActive } = useRouterActive()
  const navigate = useNavigate()
  const { remove: removeAccount } = useAccountInfo()
  const { walletLogout } = useImmutableXWallet()
  const { disconnect } = useWeb3Modal()

  const handleSignOutClick = React.useCallback(async () => {
    await walletLogout()
    await disconnect()
    removeAccount()
    navigate('/account/signin', { replace: true })
  }, [navigate, removeAccount, walletLogout, disconnect])

  return (
    <header
      id="sidebar"
      className={classNames(
        'hidden lg:flex flex-col fixed z-10',
        'w-108px h-screen p-24px bg-grey-dark',
        props.className
      )}
    >
      <nav className="flex flex-col justify-between h-full z-20" title="Sidebar Nav">
        <div className="flex flex-col items-center gap-24px">
          <ExternalLink to={getMainSiteLink('/')} title="Official Website">
            <SideNavItem name="Official Website">
              <IconAmbrus2 className="text-rust" />
            </SideNavItem>
          </ExternalLink>
          <Link to="/account/home">
            <SideNavItem name="Account Center" active={isActive('/account/home')}>
              <IconHome className="w-36px h-36px" />
            </SideNavItem>
          </Link>
          <Link to="/account/games">
            <SideNavItem name="Games" active={isActive('/account/games')}>
              <IconESports className="w-36px h-36px" />
            </SideNavItem>
          </Link>
          <Link to="/account/nft">
            <SideNavItem name="My NFTs" active={isActive('/account/nft')}>
              <IconAccount className="w-36px h-36px" />
            </SideNavItem>
          </Link>
          {/* <Link to="/account/assets">
            <SideNavItem name="My Game Assets">
              <IconWidgets className="w-36px h-36px" />
            </SideNavItem>
          </Link> */}
          <SideNavItem name="My Game Assets">
            <IconWidgets className="w-36px h-36px" />
          </SideNavItem>
        </div>
        <div className="flex flex-col items-center gap-24px">
          <Link to="/account/settings">
            <SideNavItem name="Settings" variant="transparent" active={isActive('/account/settings')}>
              <IconSettings className="w-36px h-36px" />
            </SideNavItem>
          </Link>
          <SideNavItem name="Log Out" variant="transparent" onNavClick={handleSignOutClick}>
            <IconExit className="w-36px h-36px" />
          </SideNavItem>
        </div>
      </nav>
    </header>
  )
}
