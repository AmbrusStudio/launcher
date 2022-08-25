import * as Jose from 'jose'

import { AccountAccessTokenJWTPayload } from '../types'

export function getAccessTokenPayload(token: string): AccountAccessTokenJWTPayload {
  return Jose.decodeJwt(token) as AccountAccessTokenJWTPayload
}
