import React from 'react'

import { openFallenArenaClient } from '../utils'

type Options = {
  path: string
  query?: Record<string, string | string[]> | undefined
}

type UseOpenGameClient = {
  openGameClient: (options: Options, delay?: number) => void
}

export function useOpenGameClient(): UseOpenGameClient {
  const delayOpenGameClientTimerRef = React.useRef<ReturnType<typeof setTimeout>>()

  const openGameClient = React.useCallback<UseOpenGameClient['openGameClient']>((options, delay = 0) => {
    if (delayOpenGameClientTimerRef.current) clearTimeout(delayOpenGameClientTimerRef.current)
    delayOpenGameClientTimerRef.current = setTimeout(() => {
      const { path, query } = options
      openFallenArenaClient(path, query)
      clearTimeout(delayOpenGameClientTimerRef.current)
    }, delay)
  }, [])

  return { openGameClient }
}
