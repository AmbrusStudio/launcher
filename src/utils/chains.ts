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
