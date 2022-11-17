import { Goerli, Mainnet } from '@usedapp/core'
import { getAddress } from 'ethers/lib/utils'

import {
  E4CRanger_GoldEdition,
  E4CRanger_ImmutableX_GoldEdition,
  E4CRanger_ImmutableX_RangersEdition,
  E4CRanger_RangersEdition,
  E4CRanger_UltimateEdition,
} from '../contracts'
import { MetadataStatus } from '../types'
import { getDefaultChainId } from './chains'

/**
 * getExplorerAddressLink
 * @param address
 * @returns
 */
export const getExplorerAddressLink = (address: string): string => {
  const defaultChainId = getDefaultChainId()

  if (defaultChainId === Mainnet.chainId) {
    return Mainnet.getExplorerAddressLink(address) || ''
  } else if (defaultChainId === Goerli.chainId) {
    return Goerli.getExplorerAddressLink(address) || ''
  } else {
    return Mainnet.getExplorerAddressLink(address) || ''
  }
}

export const getRaribleLink = (address: string, status: MetadataStatus): string => {
  if (!address) {
    return ''
  }

  if (status === MetadataStatus.Ethereum) {
    if (
      getAddress(address) === getAddress(E4CRanger_GoldEdition) ||
      getAddress(address) === getAddress(E4CRanger_ImmutableX_GoldEdition)
    ) {
      return 'https://rarible.com/e4cgold'
    } else if (
      getAddress(address) === getAddress(E4CRanger_RangersEdition) ||
      getAddress(address) === getAddress(E4CRanger_ImmutableX_RangersEdition)
    ) {
      return 'https://rarible.com/e4crangers'
    } else if (getAddress(address) === getAddress(E4CRanger_UltimateEdition)) {
      return 'https://rarible.com/e4c'
    } else {
      console.error(`rarible link not found, Ethereum status: ${status}`)
      return ''
    }
  } else if (status === MetadataStatus.ImmutableX) {
    if (getAddress(address) === getAddress(E4CRanger_ImmutableX_GoldEdition)) {
      return 'https://rarible.com/e4crangersgold'
    } else if (getAddress(address) === getAddress(E4CRanger_ImmutableX_RangersEdition)) {
      return 'https://rarible.com/e4crangersrangers'
    } else {
      console.error(`rarible link not found, ImmutableX status: ${status}`)
      return ''
    }
  } else {
    console.error(`metadata status not found, status: ${status}`)
    return ''
  }
}
