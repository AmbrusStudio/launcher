import { assign, cloneDeep, concat, remove } from 'lodash'

import { NFTE4CRanger } from '../types'

/**
 * Merged Collections
 * @param oldData
 * @param newData
 * @returns
 */
export const mergedCollections = (oldData: NFTE4CRanger[], newData: NFTE4CRanger[]) => {
  const oldDataCloneDeep = cloneDeep(oldData)
  const newDataCloneDeep = cloneDeep(newData)

  for (let i = 0; i < oldDataCloneDeep.length; i++) {
    const item = oldDataCloneDeep[i]
    // console.log('oldDataCloneDeep', oldDataCloneDeep)
    // console.log('newDataCloneDeep', newDataCloneDeep)
    const idx = newDataCloneDeep.findIndex(
      (e) =>
        item.address === e.address && item.tokenId === e.tokenId && item.name === e.name && item.status === e.status
    )
    if (~idx) {
      oldDataCloneDeep[i] = assign(item, newDataCloneDeep[idx])
      remove(newDataCloneDeep, (_, index) => idx === index)
    }
  }

  return concat(oldDataCloneDeep, newDataCloneDeep)
}
