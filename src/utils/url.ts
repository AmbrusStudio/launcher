export function getMainSiteLink(path: string): string {
  const baseUrl: string | undefined = import.meta.env.VITE_MAIN_SITE_URL
  if (!baseUrl) throw new TypeError('VITE_MAIN_SITE_URL not set')
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
