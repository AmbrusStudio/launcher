import { Goerli } from '@usedapp/core'

/**
 * Get Default ChainId
 * @returns
 */
export function getDefaultChainId(): number {
  const chainId: string | undefined = import.meta.env.VITE_CHAIN_ID
  if (!chainId) console.warn('VITE_CHAIN_ID not set')

  return Number(chainId || Goerli.chainId)
}

/**
 * Pre-check current connection chian
 * @param chainId
 * @returns boolean
 */
export const preCheckCurrentChain = (chainId: number | undefined): boolean => {
  return chainId === getDefaultChainId()
}

/**
 * balance decimal
 * @param amount
 * @param decimal
 * @returns
 */
export const balanceDecimal = (amount: string, decimal = 6): string => {
  // utils.formatUnits 0.0
  if (amount === '0.0') return '0'

  const point = amount.indexOf('.')
  if (~point) {
    return amount.slice(0, point + 1 + decimal)
  }
  return amount
}
