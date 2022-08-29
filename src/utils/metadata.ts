/**
 * parse tokenId by name
 * @param name
 * @returns
 */
export const parseTokenId = (name: string): number => {
  // E4C_Rangers_1
  return Number(name.split('_')?.[2] || 0)
}
