import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Sentry from '@sentry/react'
import { Goerli, Mainnet } from '@usedapp/core'
import { getAddress } from 'ethers/lib/utils'

import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Gold_Editions,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4C_Ranger_Rangers_Editions,
  ADDRESS_E4C_Ranger_Ultimate_Edition,
  ADDRESS_E4C_Ranger_Ultimate_Editions,
  defaultChainId,
} from '../../contracts'
import GoldEditionJSON from '../../data/Gold_Edition/E4C_Rangers.json'
import RangersEditionJSON from '../../data/Rangers_Edition/E4C_Rangers.json'
import UltimateEditionJSON from '../../data/Ultimate_Edition/E4C_Rangers.json'
import { MetadataResponse, TokenMetadata } from '../../types'
import { parseTokenId } from '../../utils'

type MetadataEdition = {
  [key: number]: {
    lastTime: number
    url: string
    address: string
    chainId: number
    name: string // contract name
    metadata: TokenMetadata[]
  }
}

interface MetadataState {
  GoldEdition: MetadataEdition
  RangersEdition: MetadataEdition
  UltimateEdition: MetadataEdition
}

const defaultState: MetadataState = {
  GoldEdition: {
    [Mainnet.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Gold_Edition/E4C_Rangers.json',
      address: ADDRESS_E4C_Ranger_Gold_Editions[Mainnet.chainId],
      chainId: Mainnet.chainId,
      name: 'E4C Ranger Gold Edition',
      metadata: [],
    },
    [Goerli.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Gold_Edition/E4C_Rangers.json',
      address: ADDRESS_E4C_Ranger_Gold_Editions[Goerli.chainId],
      chainId: Goerli.chainId,
      name: 'E4C Ranger Gold Edition',
      metadata: [],
    },
  },
  RangersEdition: {
    [Mainnet.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Rangers_Edition/E4C_Rangers.json',
      address: ADDRESS_E4C_Ranger_Rangers_Editions[Mainnet.chainId],
      chainId: Mainnet.chainId,
      name: 'E4C Ranger Rangers Edition',
      metadata: [],
    },
    [Goerli.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Rangers_Edition/E4C_Rangers.json',
      address: ADDRESS_E4C_Ranger_Rangers_Editions[Goerli.chainId],
      chainId: Goerli.chainId,
      name: 'E4C Ranger Rangers Edition',
      metadata: [],
    },
  },
  UltimateEdition: {
    [Mainnet.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Ultimate_Edition/E4C_Rangers.json',
      address: ADDRESS_E4C_Ranger_Ultimate_Editions[Mainnet.chainId],
      chainId: Mainnet.chainId,
      name: 'E4C Ranger',
      metadata: [],
    },
    [Goerli.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Ultimate_Edition/E4C_Rangers.json',
      address: ADDRESS_E4C_Ranger_Ultimate_Editions[Goerli.chainId],
      chainId: Goerli.chainId,
      name: 'E4C Ranger Ultimate Edition',
      metadata: [],
    },
  },
}

const initialState: MetadataState = {
  GoldEdition: defaultState.GoldEdition,
  RangersEdition: defaultState.RangersEdition,
  UltimateEdition: defaultState.UltimateEdition,
}

export const fetchMetadataGoldEdition = createAsyncThunk<MetadataResponse[]>(
  'metadata/fetchMetadataGoldEdition',
  () => {
    try {
      return GoldEditionJSON as MetadataResponse[]
    } catch (error) {
      const e = `metadata/fetchMetadataGoldEdition error: ${error}`
      console.log('error', e)
      Sentry.captureException(e)

      return []
    }
  }
)

export const fetchMetadataRangersEdition = createAsyncThunk<MetadataResponse[]>(
  'metadata/fetchMetadataRangersEdition',
  () => {
    try {
      return RangersEditionJSON as MetadataResponse[]
    } catch (error) {
      const e = `metadata/fetchMetadataRangersEdition error: ${error}`
      console.log('error', e)
      Sentry.captureException(e)

      return []
    }
  }
)

export const fetchMetadataUltimateEdition = createAsyncThunk<MetadataResponse[]>(
  'metadata/fetchMetadataUltimateEdition',
  () => {
    try {
      return UltimateEditionJSON as MetadataResponse[]
    } catch (error) {
      const e = `metadata/fetchMetadataUltimateEdition error: ${error}`
      console.log('error', e)
      Sentry.captureException(e)

      return []
    }
  }
)

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    clear: (state) => {
      state.GoldEdition = defaultState.GoldEdition
      state.RangersEdition = defaultState.RangersEdition
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetadataGoldEdition.pending, () => {
        console.log('loading')
      })
      .addCase(fetchMetadataGoldEdition.fulfilled, (state, action) => {
        console.log('fulfilled', action)

        if (action.payload.length) {
          const time = Date.now()

          state.GoldEdition[defaultChainId].lastTime = time

          state.GoldEdition[defaultChainId].metadata = action.payload.map((i) => ({
            name: i.name,
            description: i.description,
            image: i.image,
            address: getAddress(ADDRESS_E4C_Ranger_Gold_Edition),
            tokenId: parseTokenId(i.name),
            trait: i.attributes,
          }))
        }
      })
      .addCase(fetchMetadataGoldEdition.rejected, (state) => {
        console.log('failed')
        state.GoldEdition = defaultState.GoldEdition
      })
      .addCase(fetchMetadataRangersEdition.pending, () => {
        console.log('loading')
      })
      .addCase(fetchMetadataRangersEdition.fulfilled, (state, action) => {
        console.log('fulfilled', action)

        if (action.payload.length) {
          const time = Date.now()

          state.RangersEdition[defaultChainId].lastTime = time

          state.RangersEdition[defaultChainId].metadata = action.payload.map((i) => ({
            name: i.name,
            description: i.description,
            image: i.image,
            address: getAddress(ADDRESS_E4C_Ranger_Rangers_Edition),
            tokenId: parseTokenId(i.name),
            trait: i.attributes,
          }))
        }
      })
      .addCase(fetchMetadataRangersEdition.rejected, (state) => {
        console.log('failed')
        state.RangersEdition = defaultState.RangersEdition
      })
      .addCase(fetchMetadataUltimateEdition.pending, () => {
        console.log('loading')
      })
      .addCase(fetchMetadataUltimateEdition.fulfilled, (state, action) => {
        console.log('fulfilled', action)

        if (action.payload.length) {
          const time = Date.now()

          state.UltimateEdition[defaultChainId].lastTime = time

          state.UltimateEdition[defaultChainId].metadata = action.payload.map((i, index) => ({
            name: i.name,
            description: i.description,
            image: i.image,
            address: getAddress(ADDRESS_E4C_Ranger_Ultimate_Edition),
            tokenId: String(index + 1),
            trait: i.attributes,
          }))
        }
      })
      .addCase(fetchMetadataUltimateEdition.rejected, (state) => {
        console.log('failed')
        state.UltimateEdition = defaultState.UltimateEdition
      })
  },
})

export default metadataSlice.reducer
