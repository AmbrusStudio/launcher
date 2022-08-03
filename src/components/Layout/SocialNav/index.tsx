import React from 'react'

import { getHeaderLinks, HeaderLink } from '../../../api'
import { classNames } from '../../../utils'
import { SocialNavItem } from './SocialNavItem'

type SocialNavProps = {
  className?: string
}

export function SocialNav(props: SocialNavProps) {
  const [headers, setHeaders] = React.useState<HeaderLink[]>([])
  const fetchHeaders = React.useCallback(async () => {
    const headers = await getHeaderLinks()
    setHeaders(headers)
  }, [])

  React.useEffect(() => {
    fetchHeaders()
  }, [fetchHeaders])
  return (
    <nav
      className={classNames('flex flex-row flex-nowrap items-center gap-24px text-white', props.className)}
      title="Social Nav"
    >
      {headers.map((header) => (
        <SocialNavItem to={header.url} img={header.img} key={header.url} title="Social Link" />
      ))}
    </nav>
  )
}
