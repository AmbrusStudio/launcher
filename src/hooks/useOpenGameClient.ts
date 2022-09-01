import React from 'react'

import { downloadFileFromUrl, openFallenArenaClient } from '../utils'

type Options = {
  path: string
  query?: Record<string, string | string[]> | undefined
}

type UseGameClient = {
  openGameClient: (options: Options, delay?: number) => void
  downloadGameClient: (url: string, filename?: string) => void
}

export function useGameClient(): UseGameClient {
  const delayOpenGameClientTimerRef = React.useRef<ReturnType<typeof setTimeout>>()

  const openGameClient = React.useCallback<UseGameClient['openGameClient']>((options, delay = 0) => {
    if (delayOpenGameClientTimerRef.current) clearTimeout(delayOpenGameClientTimerRef.current)
    delayOpenGameClientTimerRef.current = setTimeout(() => {
      const { path, query } = options
      openFallenArenaClient(path, query)
      clearTimeout(delayOpenGameClientTimerRef.current)
    }, delay)
  }, [])

  const downloadGameClient = React.useCallback<UseGameClient['downloadGameClient']>((url, filename) => {
    downloadFileFromUrl(url, filename)
  }, [])

  return { openGameClient, downloadGameClient }
}
