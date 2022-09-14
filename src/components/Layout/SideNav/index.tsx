import { Link } from 'react-router-dom'

import { useRouterActive } from '../../../hooks'
import { getMainSiteLink } from '../../../utils'
import { IconAccount, IconAmbrus2, IconESports, IconExit, IconHome, IconSettings, IconWidgets } from '../../Icon'
import { ExternalLink } from '../../Link'
import { SideNavItem } from './SideNavItem'

export function SideNav() {
  const { isActive } = useRouterActive()

  return (
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
        <SideNavItem name="My NFTs">
          <IconAccount className="w-36px h-36px" />
        </SideNavItem>
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
        <SideNavItem name="Log Out" variant="transparent">
          <IconExit className="w-36px h-36px" />
        </SideNavItem>
      </div>
    </nav>
  )
}
