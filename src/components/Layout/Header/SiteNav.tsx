import React from 'react'

import { classNames, getMainSiteLink } from '../../../utils'
import { IconArrowDown } from '../../Icon'
import { ExternalLink } from '../../Link'
import { GamesNav } from './GamesNav'
import { SiteNavItem } from './SiteNavItem'

type SiteNavProps = {
  onGamesNavClick: (open: boolean) => void
}

export function SiteNav(props: SiteNavProps) {
  const [gamesOpen, setGamesOpen] = React.useState(false)
  const handleGamesNavClick = React.useCallback(() => {
    const newState = !gamesOpen
    setGamesOpen(newState)
    props.onGamesNavClick(newState)
  }, [gamesOpen, props])
  return (
    <nav className="flex flex-col xl:flex-row items-center gap-0 xl:gap-24px px-24px xl:p-0 h-full" title="Site Nav">
      <ExternalLink to={getMainSiteLink('/')} title="Home">
        <SiteNavItem>Home</SiteNavItem>
      </ExternalLink>
      <SiteNavItem active={gamesOpen} onSiteNavItemClick={handleGamesNavClick}>
        E4C: Games
        <IconArrowDown className={classNames('ml-8px transition-all', gamesOpen && 'rotate-180')} />
      </SiteNavItem>
      <div className="flex w-full xl:!hidden">
        <GamesNav open={gamesOpen} />
      </div>
      <ExternalLink to={getMainSiteLink('/worldview')} title="World View">
        <SiteNavItem>E4C: Verse</SiteNavItem>
      </ExternalLink>
      <ExternalLink to={getMainSiteLink('/aboutus')} title="About Us">
        <SiteNavItem>About Us</SiteNavItem>
      </ExternalLink>
    </nav>
  )
}
