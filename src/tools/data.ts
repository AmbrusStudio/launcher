import { assign, cloneDeep, concat } from 'lodash'

import { NFTE4CRanger } from '../types'

/**
 * CollectionKey
 * @param data
 * @returns
 */
const collectionKey = (data: NFTE4CRanger): string => `${data.address}:${data.tokenId}:${data.name}:${data.status}`

/**
 * CollectionArrayObjectConvertedToMap
 * @param data
 * @returns
 */
const collectionArrayObjectConvertedToMap = (data: NFTE4CRanger[]): Map<string, NFTE4CRanger> => {
  const _data = new Map()

  data.forEach((item) => {
    _data.set(collectionKey(item), item)
  })

  return _data
}

/**
 * Merged Collections
 * @param oldData
 * @param newData
 * @returns
 */
export const mergedCollections = (oldData: NFTE4CRanger[], newData: NFTE4CRanger[]): NFTE4CRanger[] => {
  const oldDataCloneDeep = cloneDeep(oldData)
  const newDataMap = collectionArrayObjectConvertedToMap(newData)

  oldDataCloneDeep.forEach((item) => {
    const key = collectionKey(item)
    const result = newDataMap.get(key)

    if (result) {
      item = assign(item, result)
      newDataMap.delete(key)
    }
  })

  return concat(oldDataCloneDeep, [...newDataMap.values()])
}
