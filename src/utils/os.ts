import UAParser from 'ua-parser-js'

import { PlatformOs } from '../types'

export function getPlatformOs(): PlatformOs | undefined {
  const parser = new UAParser()
  const os = parser.getOS()
  if (os.name?.includes('Windows')) return 'win'
  if (os.name?.includes('Mac')) return 'mac'
  return undefined
}
