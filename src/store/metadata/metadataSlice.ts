import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Sentry from '@sentry/react'
import { Goerli, Mainnet } from '@usedapp/core'
import axios from 'axios'
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

// ethNetwork: 'goerli'

interface MetadataState {
  GoldEdition: MetadataEdition
  RangersEdition: MetadataEdition
  UltimateEdition: MetadataEdition
}

interface LoadingState {
  GoldEditionLoading: boolean
  RangersEditionLoading: boolean
  UltimateEditionLoading: boolean
}

const defaultState: MetadataState = {
  GoldEdition: {
    // 1 - 450
    // 451 - 900
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
    // 1 - 646
    // 647 - 1292
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
    // 1 - 15
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

const initialState: MetadataState & LoadingState = {
  GoldEdition: defaultState.GoldEdition,
  RangersEdition: defaultState.RangersEdition,
  UltimateEdition: defaultState.UltimateEdition,
  GoldEditionLoading: false,
  RangersEditionLoading: false,
  UltimateEditionLoading: false,
}

export const fetchMetadataGoldEdition = createAsyncThunk<MetadataResponse[]>(
  'metadata/fetchMetadataGoldEdition',
  async (_, { signal }) => {
    try {
      const response = await axios.get<MetadataResponse[]>(defaultState.GoldEdition[defaultChainId].url, {
        signal: signal,
      })

      return response.data.slice(0, 450)
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
  async (_, { signal }) => {
    try {
      const response = await axios.get<MetadataResponse[]>(defaultState.RangersEdition[defaultChainId].url, {
        signal: signal,
      })
      return response.data.slice(0, 646)
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
  async (_, { signal }) => {
    try {
      const response = await axios.get<MetadataResponse[]>(defaultState.UltimateEdition[defaultChainId].url, {
        signal: signal,
      })
      return response.data
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
      state.UltimateEdition = defaultState.UltimateEdition

      state.GoldEditionLoading = false
      state.RangersEditionLoading = false
      state.UltimateEditionLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetadataGoldEdition.pending, (state) => {
        // console.log('loading')
        state.GoldEditionLoading = true
      })
      .addCase(fetchMetadataGoldEdition.fulfilled, (state, action) => {
        // console.log('fulfilled', action)
        state.GoldEditionLoading = false

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
        // console.log('failed')
        state.GoldEdition = defaultState.GoldEdition
        state.GoldEditionLoading = false
      })
      .addCase(fetchMetadataRangersEdition.pending, (state) => {
        // console.log('loading')
        state.RangersEditionLoading = true
      })
      .addCase(fetchMetadataRangersEdition.fulfilled, (state, action) => {
        // console.log('fulfilled', action)
        state.RangersEditionLoading = false

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
        // console.log('failed')
        state.RangersEdition = defaultState.RangersEdition
        state.RangersEditionLoading = false
      })
      .addCase(fetchMetadataUltimateEdition.pending, (state) => {
        // console.log('loading')
        state.UltimateEditionLoading = true
      })
      .addCase(fetchMetadataUltimateEdition.fulfilled, (state, action) => {
        // console.log('fulfilled', action)
        state.UltimateEditionLoading = false
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
        // console.log('failed')
        state.UltimateEdition = defaultState.UltimateEdition
        state.UltimateEditionLoading = false
      })
  },
})

export default metadataSlice.reducer
