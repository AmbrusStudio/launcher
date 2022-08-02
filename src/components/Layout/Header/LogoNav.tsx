import { getMainSiteLink } from '../../../utils'
import { IconAmbrus } from '../../Icon/Ambrus'
import { ExternalLink } from '../../Link'

export function LogoNav() {
  const to = getMainSiteLink('/')
  return (
    <ExternalLink to={to} title="Home" aria-label="Home">
      <IconAmbrus className="h-40px w-40px text-white mr-16px" />
    </ExternalLink>
  )
}
