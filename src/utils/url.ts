import path from 'path'

import { getViteEnv } from './env'

export function getMainSiteLink(path: string): string {
  const baseUrl = getViteEnv('VITE_MAIN_SITE_URL')
  return new URL(path, baseUrl).href
}

export function buildQuerySting(query: Record<string, string | string[]> = {}): string {
  const _query = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'string') _query.append(key, value)
    if (Array.isArray(value)) value.forEach((v) => _query.append(key, v))
  }
  const queryStr = _query.toString()
  return queryStr ? `?${queryStr}` : ''
}

export function openFallenArenaClient(path: string, query?: Record<string, string | string[]>): void {
  const _query = buildQuerySting(query)
  const _url = `fallenarena://${path}${_query}`
  if (window) window.location.assign(_url)
}

export function downloadFileFromUrl(url: string, filename?: string): void {
  if (!document) return
  // new URL('https://example.com/game/client.exe') => URL { href: "https://example.com/game/client.exe", pathname: "/game/client.exe", ... }
  const fileUrl = new URL(url)
  if (!filename) filename = path.basename(fileUrl.pathname)
  const anchor = document.createElement('a')
  anchor.style.display = 'none'
  anchor.href = fileUrl.href
  anchor.download = filename || ''
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

export function redirectToSignIn(): void {
  if (window) {
    if (window.location.href.includes('/account/signin')) return
    const url = new URL('/account/signin', window.location.href)
    window.location.replace(url)
  }
}
