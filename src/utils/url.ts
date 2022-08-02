export function getMainSiteLink(path: string): string {
  const baseUrl: string | undefined = import.meta.env.VITE_MAIN_SITE_URL
  if (!baseUrl) throw new TypeError('VITE_MAIN_SITE_URL not set')
  return new URL(path, baseUrl).href
}
