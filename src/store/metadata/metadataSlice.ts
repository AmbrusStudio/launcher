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
    name: string
    metadata: TokenMetadata[]
  }
}

interface MetadataState {
  GoldEdition: MetadataEdition
  RangersEdition: MetadataEdition
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
}

const initialState: MetadataState = {
  GoldEdition: defaultState.GoldEdition,
  RangersEdition: defaultState.RangersEdition,
}

export const fetchMetadataGoldEdition = createAsyncThunk<MetadataResponse[]>(
  'metadata/fetchMetadataGoldEdition',
  async () => {
    try {
      const response = await axios.get(defaultState.GoldEdition[defaultChainId].url)
      return response.data
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
  async () => {
    try {
      const response = await axios.get(defaultState.RangersEdition[defaultChainId].url)
      return response.data
    } catch (error) {
      const e = `metadata/fetchMetadataRangersEdition error: ${error}`
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
  },
})

export default metadataSlice.reducer
