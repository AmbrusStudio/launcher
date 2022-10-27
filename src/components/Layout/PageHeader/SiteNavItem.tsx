import styled from '@emotion/styled'
import React from 'react'

import { classNames } from '../../../utils'

type SiteNavItemProps = {
  className?: string
  active?: boolean
  soon?: boolean
  onSiteNavItemClick?: () => void
}

const NavItemLine = styled.div`
  transform-origin: left;
  transition: width 0.25s ease-in-out;
`

export function SiteNavItem(props: React.PropsWithChildren<SiteNavItemProps>) {
  const { className, children, active, soon } = props

  const handleNavClick = React.useCallback(() => {
    if (props.soon) return
    props.onSiteNavItemClick && props.onSiteNavItemClick()
  }, [props])

  return (
    <div
      className={classNames(
        'relative flex flex-row flex-nowrap justify-center items-center h-80px xl:h-auto px-24px cursor-pointer',
        soon && 'soon',
        className
      )}
      onClick={handleNavClick}
    >
      <NavItemLine className={classNames('navItem__line absolute left-0 h-2px w-0 bg-rust', active && 'w-full')} />
      <span
        className={classNames(
          'flex flex-row flex-nowrap items-center text-14px text-white text-center uppercase',
          !soon && 'hover:font-semibold hover:text-rust',
          active && 'font-semibold text-white hover:text-white'
        )}
      >
        {children}
      </span>
      {soon && (
        <span className="absolute top-60px xl:top-30px font-medium text-8px leading-14px text-white uppercase bg-white/60 rounded-4px px-12px">
          Soon
        </span>
      )}
    </div>
  )
}
