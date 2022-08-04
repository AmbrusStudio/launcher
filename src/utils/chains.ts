export function getDefaultChainId(): number {
  const chainId: string | undefined = import.meta.env.VITE_CHAIN_ID
  if (!chainId) console.warn('VITE_CHAIN_ID not set')
  return Number(chainId || 4)
}
