/**
 * only number
 * @param val
 * @returns
 */
export const numStr = (val: string) => val.replace(/[^\d]/g, '')

/**
 * Is Pure Gold
 * @param val
 * @returns
 */
export const isPureGold = (val: string): boolean => {
  const reg = /(^|\s)Gold(\s|$)/g
  return reg.test(val)
}
