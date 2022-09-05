import React from 'react'

import { classNames } from '../../../utils'

type Variants = 'rounded' | 'transparent'

type SideNavItemProps = {
  name: string
  className?: string
  active?: boolean
  disabled?: boolean
  variant?: Variants
}

const normalVariants: Record<Variants, string> = {
  rounded: 'rounded-12px bg-black/10 text-white',
  transparent: 'bg-transparent text-grey-medium',
}

const activeVariants: Record<Variants, string> = {
  rounded: 'bg-black/50',
  transparent: '!text-white',
}

const hoverVariants: Record<Variants, string> = {
  rounded: 'hover:bg-white hover:text-rust',
  transparent: 'hover:text-white',
}

export function SideNavItem(props: React.PropsWithChildren<SideNavItemProps>) {
  const { active, className, children, disabled, name, variant = 'rounded' } = props
  return (
    <div
      className={classNames(
        'flex flex-row flex-nowrap justify-center items-center',
        'w-60px h-60px rounded-12px relative z-30 group',
        normalVariants[variant],
        active && activeVariants[variant],
        disabled && '!cursor-not-allowed',
        !disabled && hoverVariants[variant],
        className
      )}
      role="button"
      aria-label={name}
    >
      {children}
      <div
        className={classNames(
          'hidden group-hover:flex items-center absolute left-72px',
          'p-20px font-semibold text-16px leading-20px text-white uppercase whitespace-nowrap',
          'bg-black/50 rounded-12px shadow-sidebar-nav-item'
        )}
      >
        {name}
      </div>
    </div>
  )
}
