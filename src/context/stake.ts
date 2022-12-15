import { createContext } from 'react'

import { StakeCtxInformation } from '../types'

export const StakeCtx = createContext<StakeCtxInformation | null>(null)
