import React from 'react'

import { GameClientDownloadLink } from '../types'
import { downloadFileFromUrl, getPlatformOs, openFallenArenaClient } from '../utils'

type Options = {
  path: string
  query?: Record<string, string | string[]> | undefined
  fallback?: () => void | Promise<void>
  fallbackDelay?: number
}

type UseGameClient = {
  openGameClient: (options: Options, delay?: number) => void
  downloadGameClient: (downloadLink: GameClientDownloadLink) => void
}

export function useGameClient(): UseGameClient {
  const delayOpenGameClientTimerRef = React.useRef<ReturnType<typeof setTimeout>>()

  const openGameClient = React.useCallback<UseGameClient['openGameClient']>((options, delay = 0) => {
    if (delayOpenGameClientTimerRef.current) clearTimeout(delayOpenGameClientTimerRef.current)
    delayOpenGameClientTimerRef.current = setTimeout(() => {
      const { path, query, fallback, fallbackDelay = delay + 1000 } = options
      let continueFallback = true
      const handleWindowBlur = () => {
        continueFallback = false
        console.debug('handleWindowBlur::continueFallback', continueFallback)
      }

      if (fallback && typeof fallback === 'function') {
        if (!window) return
        window.addEventListener('blur', handleWindowBlur)
        const delayFallbackTimer = setTimeout(async () => {
          try {
            if (continueFallback) await fallback()
          } finally {
            window.removeEventListener('blur', handleWindowBlur)
            clearTimeout(delayFallbackTimer)
          }
        }, fallbackDelay)
      }

      openFallenArenaClient(path, query)

      clearTimeout(delayOpenGameClientTimerRef.current)
    }, delay)
  }, [])

  const downloadGameClient = React.useCallback<UseGameClient['downloadGameClient']>((downloadLink) => {
    const os = getPlatformOs()
    if (!os || typeof os === 'undefined') return
    const url = downloadLink[os]
    if (!url) return
    downloadFileFromUrl(url)
  }, [])

  return { openGameClient, downloadGameClient }
}
