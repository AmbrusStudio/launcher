import React from 'react'

import { getHeaderLinks, HeaderLink } from '../../../api'
import { SocialNavItem } from './SocialNavItem'

export function SocialNav() {
  const [headers, setHeaders] = React.useState<HeaderLink[]>([])
  const fetchHeaders = React.useCallback(async () => {
    const headers = await getHeaderLinks()
    setHeaders(headers)
  }, [])

  React.useEffect(() => {
    fetchHeaders()
  }, [fetchHeaders])
  return (
    <nav className="flex flex-row flex-nowrap items-center gap-24px text-white" title="Social Nav">
      {headers.map((header) => (
        <SocialNavItem to={header.url} img={header.img} key={header.url} title="Social Link" />
      ))}
    </nav>
  )
}
