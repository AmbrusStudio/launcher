import { ERC721TokenType } from '@imtbl/imx-sdk'
import BigNumber from 'bignumber.js'

/**
 * usedapp TransactionState
 * export type TransactionState = 'None' | 'PendingSignature' | 'Mining' | 'Success' | 'Fail' | 'Exception'
 */
export enum TransactionStateImmutableX {
  None = 'None',
  PendingSignature = 'PendingSignature',
  Mining = 'Mining',
  Success = 'Success',
  Fail = 'Fail',
  Exception = 'Exception',
}

export interface TransactionStatusImmutableX {
  status: TransactionStateImmutableX
  errorMessage?: string
}

/**
 * https://github.com/immutable/imx-core-sdk/blob/6253059d42da3746c9f6ca00b1cbfe8887df541f/src/api/domain/transfers-api.ts#L450
 */
export type ImmutableXStatus = 'success' | 'failure'

export type ImmutableXStakingStatus = {
  isStaking: boolean
  originalOwner: string
  stakingDuration: number
  totalStakingTime: number
  isUpgraded: boolean
}

export type ImmutableXUnstake = {
  transaction_id: number
  status: ImmutableXStatus
  user: string
  receiver: string
  token: {
    type: ERC721TokenType.ERC721
    data: {
      token_id: string
      id: string
      token_address: string
      decimals: number
      quantity: BigNumber
      quantity_with_fees: string
    }
  }
  timestamp: string
}

export type ImmutableXL2Overall = {
  tokenAddress: string
  tokenId: string
  isStaking: boolean
  originalOwner: string
  stakingDuration: number
  totalStakingTime: number
  isUpgraded: boolean
  earnedDgc: string
}

export type EarnedItem = {
  time: string
  amount: string
  id: string
}

export type EarnedHistory = {
  history: EarnedItem[]
  amount: string
  symbol: string
}
