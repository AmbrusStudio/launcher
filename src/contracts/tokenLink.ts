import { Goerli, Mainnet } from '@usedapp/core'

import { MetadataStatus } from '../types'
import { E4CRanger_GoldEditions, E4CRanger_RangersEditions, E4CRanger_UltimateEditions } from './ethereum'
import { E4CRanger_ImmutableX_GoldEditions, E4CRanger_ImmutableX_RangersEditions } from './immutableX'

/**
 * Rarible Link
 */
export const RaribleLink = {
  [Mainnet.chainId]: {
    [MetadataStatus.Ethereum]: {
      GoldEdition: 'https://rarible.com/e4cgold',
      RangersEdition: 'https://rarible.com/e4crangers',
      UltimateEdition: 'https://rarible.com/e4c',
    },
    [MetadataStatus.ImmutableX]: {
      GoldEdition: 'https://rarible.com/e4crangersgold',
      RangersEdition: 'https://rarible.com/e4crangersrangers',
    },
  },
  [Goerli.chainId]: {
    [MetadataStatus.Ethereum]: {
      GoldEdition: 'https://testnet.rarible.com/collection/' + E4CRanger_GoldEditions[Goerli.chainId],
      RangersEdition: 'https://testnet.rarible.com/collection/' + E4CRanger_RangersEditions[Goerli.chainId],
      UltimateEdition: 'https://testnet.rarible.com/collection/' + E4CRanger_UltimateEditions[Goerli.chainId],
    },
    [MetadataStatus.ImmutableX]: {
      GoldEdition:
        'https://testnet.rarible.com/collection/immutablex/' + E4CRanger_ImmutableX_GoldEditions[Goerli.chainId],
      RangersEdition:
        'https://testnet.rarible.com/collection/immutablex/' + E4CRanger_ImmutableX_RangersEditions[Goerli.chainId],
    },
  },
}

// Rarible Collection Link
export const MainnetRaribleCollection = 'https://rarible.com/collection/'
export const TestnetRaribleCollection = 'https://testnet.rarible.com/collection/'
