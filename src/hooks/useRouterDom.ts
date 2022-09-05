import React from 'react'
import { useLocation } from 'react-router-dom'

export function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

type UseRouterActive = {
  isActive: (path: string) => boolean
}

export function useRouterActive(): UseRouterActive {
  const { pathname } = useLocation()
  const isActive = React.useCallback((path: string) => pathname === path, [pathname])
  return { isActive }
}
