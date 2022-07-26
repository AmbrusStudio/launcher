import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Sentry from '@sentry/react'
import { Goerli, Mainnet } from '@usedapp/core'
import axios from 'axios'
import { getAddress } from 'ethers/lib/utils'

import {
  defaultChainId,
  E4CRanger_GoldEdition,
  E4CRanger_GoldEditions,
  E4CRanger_RangersEdition,
  E4CRanger_RangersEditions,
  E4CRanger_UltimateEdition,
  E4CRanger_UltimateEditions,
} from '../../contracts'
import { MetadataResponse, TokenMetadata } from '../../types'
import { buildMetadataInformation, parseTokenId } from '../../utils'

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
      baseURI: 'https://api.ambrus.studio/e4c-ranger/gold/metadata/',
      address: E4CRanger_GoldEditions[Mainnet.chainId],
      chainId: Mainnet.chainId,
      name: 'E4C Ranger Gold Edition',
      metadata: [],
    },
    [Goerli.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Gold_Edition/E4C_Rangers.json',
      baseURI: 'https://api.ambrus.studio/e4c-ranger/gold/metadata/',
      address: E4CRanger_GoldEditions[Goerli.chainId],
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
      baseURI: 'https://api.ambrus.studio/e4c-ranger/rangers/metadata/',
      address: E4CRanger_RangersEditions[Mainnet.chainId],
      chainId: Mainnet.chainId,
      name: 'E4C Ranger Rangers Edition',
      metadata: [],
    },
    [Goerli.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Rangers_Edition/E4C_Rangers.json',
      baseURI: 'https://api.ambrus.studio/e4c-ranger/rangers/metadata/',
      address: E4CRanger_RangersEditions[Goerli.chainId],
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
      baseURI: 'https://api.ambrus.studio/e4c-ranger/ultimate/metadata/',
      address: E4CRanger_UltimateEditions[Mainnet.chainId],
      chainId: Mainnet.chainId,
      name: 'E4C Ranger',
      metadata: [],
    },
    [Goerli.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Ultimate_Edition/E4C_Rangers.json',
      baseURI: 'https://api.ambrus.studio/e4c-ranger/ultimate/metadata/',
      address: E4CRanger_UltimateEditions[Goerli.chainId],
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
      if (response.status === 200) {
        return response.data.slice(0, 450)
      } else {
        return []
      }
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
      if (response.status === 200) {
        return response.data.slice(0, 646)
      } else {
        return []
      }
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
      // TODO waiting for integration
      const responseKit = await axios.get<MetadataResponse[]>(
        'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Ultimate_Edition/E4C_Rangers_Kit.json',
        {
          signal: signal,
        }
      )
      const list: MetadataResponse[] = []
      if (response.status === 200) {
        list.push(...response.data)
      }
      if (responseKit.status === 200) {
        list.push(...responseKit.data)
      }

      return list
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

          state.GoldEdition[defaultChainId].metadata = action.payload.map((i) =>
            buildMetadataInformation(i, getAddress(E4CRanger_GoldEdition), parseTokenId(i.name))
          )
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

          state.RangersEdition[defaultChainId].metadata = action.payload.map((i) =>
            buildMetadataInformation(i, getAddress(E4CRanger_RangersEdition), parseTokenId(i.name))
          )
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

          state.UltimateEdition[defaultChainId].metadata = action.payload.map((i, index) =>
            buildMetadataInformation(i, getAddress(E4CRanger_UltimateEdition), String(index + 1))
          )
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
