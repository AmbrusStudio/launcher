import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Sentry from '@sentry/react'
import { Goerli, Mainnet } from '@usedapp/core'
import axios from 'axios'
import { getAddress } from 'ethers/lib/utils'

import {
  defaultChainId,
  E4CRanger_ImmutableX_GoldEdition,
  E4CRanger_ImmutableX_GoldEditions,
  E4CRanger_ImmutableX_RangersEdition,
  E4CRanger_ImmutableX_RangersEditions,
} from '../../contracts'
import { MetadataResponse, TokenMetadata } from '../../types'
import { parseTokenId } from '../../utils'

type MetadataEdition = {
  [key: number]: {
    lastTime: number
    url: string
    baseURI: string
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
}

interface LoadingState {
  GoldEditionLoading: boolean
  RangersEditionLoading: boolean
}

const defaultState: MetadataState = {
  GoldEdition: {
    // 451 - 900
    [Mainnet.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Gold_Edition/E4C_Rangers_Kit.json',
      baseURI: 'https://api.ambrus.studio/e4c-ranger/gold/metadata/',
      address: E4CRanger_ImmutableX_GoldEditions[Mainnet.chainId],
      chainId: Mainnet.chainId,
      name: 'E4C Rangers Gold Edition',
      metadata: [],
    },
    [Goerli.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Gold_Edition/E4C_Rangers_Kit.json',
      baseURI: 'https://api.ambrus.studio/e4c-ranger/gold/metadata/',
      address: E4CRanger_ImmutableX_GoldEditions[Goerli.chainId],
      chainId: Goerli.chainId,
      name: 'E4C Rangers Gold Edition',
      metadata: [],
    },
  },
  RangersEdition: {
    // 647 - 1292
    [Mainnet.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Rangers_Edition/E4C_Rangers_Kit.json',
      baseURI: 'https://api.ambrus.studio/e4c-ranger/rangers/metadata/',
      address: E4CRanger_ImmutableX_RangersEditions[Mainnet.chainId],
      chainId: Mainnet.chainId,
      name: 'E4C Rangers Rangers Edition',
      metadata: [],
    },
    [Goerli.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Rangers_Edition/E4C_Rangers_Kit.json',
      baseURI: 'https://api.ambrus.studio/e4c-ranger/rangers/metadata/',
      address: E4CRanger_ImmutableX_RangersEditions[Goerli.chainId],
      chainId: Goerli.chainId,
      name: 'E4C Rangers Rangers Edition',
      metadata: [],
    },
  },
}

const initialState: MetadataState & LoadingState = {
  GoldEdition: defaultState.GoldEdition,
  RangersEdition: defaultState.RangersEdition,
  GoldEditionLoading: false,
  RangersEditionLoading: false,
}

export const fetchMetadataGoldEdition = createAsyncThunk<MetadataResponse[]>(
  'metadataImmutableX/fetchMetadataGoldEdition',
  async (_, { signal }) => {
    try {
      const response = await axios.get<MetadataResponse[]>(defaultState.GoldEdition[defaultChainId].url, {
        signal: signal,
      })
      if (response.status === 200) {
        return response.data.slice(0, 450)
      } else {
        return []
      }
    } catch (error) {
      const e = `metadataImmutableX/fetchMetadataGoldEdition error: ${error}`
      console.log('error', e)
      Sentry.captureException(e)

      return []
    }
  }
)

export const fetchMetadataRangersEdition = createAsyncThunk<MetadataResponse[]>(
  'metadataImmutableX/fetchMetadataRangersEdition',
  async (_, { signal }) => {
    try {
      const response = await axios.get<MetadataResponse[]>(defaultState.RangersEdition[defaultChainId].url, {
        signal: signal,
      })
      if (response.status === 200) {
        return response.data.slice(0, 646)
      } else {
        return []
      }
    } catch (error) {
      const e = `metadataImmutableX/fetchMetadataRangersEdition error: ${error}`
      console.log('error', e)
      Sentry.captureException(e)

      return []
    }
  }
)

export const metadataImmutableXSlice = createSlice({
  name: 'metadataImmutableX',
  initialState,
  reducers: {
    clear: (state) => {
      state.GoldEdition = defaultState.GoldEdition
      state.RangersEdition = defaultState.RangersEdition

      state.GoldEditionLoading = false
      state.RangersEditionLoading = false
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
            address: getAddress(E4CRanger_ImmutableX_GoldEdition),
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
            address: getAddress(E4CRanger_ImmutableX_RangersEdition),
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
  },
})

export default metadataImmutableXSlice.reducer
