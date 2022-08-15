import { cloneDeep } from 'lodash'

import { Filter } from '../types/gallery'

// modify filter checked
export const ToggleFilterCheckedFn = (filter: Filter[], parentIndex: number, childrenIndex: number): Filter[] => {
  const list = cloneDeep(filter)
  list[parentIndex].list[childrenIndex].is_checked = !list[parentIndex].list[childrenIndex].is_checked
  return list
}
