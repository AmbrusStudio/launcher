import { useState } from 'react'

import { numStr } from '../utils'

/**
 * useNumStrState
 * @param defaultVal
 * @returns
 */
export const useNumStrState = (defaultVal = ''): [string, (val: string) => void] => {
  const [numVal, setNumVal] = useState(defaultVal)

  const handleChange = (val: string) => {
    setNumVal(numStr(val))
  }

  return [numVal, handleChange]
}
