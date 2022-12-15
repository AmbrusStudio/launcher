import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Sentry from '@sentry/react'
import { Goerli, Mainnet } from '@usedapp/core'
import axios from 'axios'
import { getAddress } from 'ethers/lib/utils'

import { defaultChainId, E4CRangerHive_ImmutableX_Thorn, E4CRangerHive_ImmutableX_Thorns } from '../../contracts'
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
  Thorn: MetadataEdition
}

interface LoadingState {
  Loading: boolean
}

const defaultState: MetadataState = {
  Thorn: {
    [Mainnet.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Hive_Edition/E4C_Rangers.json',
      baseURI: 'https://api.ambrus.studio/e4c-ranger/free_test/',
      address: E4CRangerHive_ImmutableX_Thorns[Mainnet.chainId],
      chainId: Mainnet.chainId,
      name: 'E4C Rangers Free',
      metadata: [],
    },
    [Goerli.chainId]: {
      lastTime: 0,
      url: 'https://cdn.ambrus.studio/NFTs/E4C_Rangers/Hive_Edition/E4C_Rangers.json',
      baseURI: 'https://api.ambrus.studio/e4c-ranger/free_test/',
      address: E4CRangerHive_ImmutableX_Thorns[Goerli.chainId],
      chainId: Goerli.chainId,
      name: 'E4C Rangers Free',
      metadata: [],
    },
  },
}

const initialState: MetadataState & LoadingState = {
  Thorn: defaultState.Thorn,
  Loading: false,
}

export const fetchMetadataThorn = createAsyncThunk<MetadataResponse[]>(
  'metadataImmutableXHive/fetchMetadataThorn',
  async (_, { signal }) => {
    try {
      const response = await axios.get<MetadataResponse[]>(defaultState.Thorn[defaultChainId].url, {
        signal: signal,
      })
      if (response.status === 200) {
        return response.data
      } else {
        return []
      }
    } catch (error) {
      const e = `metadataImmutableX/fetchMetadataThorn error: ${error}`
      console.log('error', e)
      Sentry.captureException(e)

      return []
    }
  }
)

export const metadataImmutableXHiveSlice = createSlice({
  name: 'metadataImmutableXHive',
  initialState,
  reducers: {
    clear: (state) => {
      state.Thorn = defaultState.Thorn

      state.Loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetadataThorn.pending, (state) => {
        // console.log('loading')
        state.Loading = true
      })
      .addCase(fetchMetadataThorn.fulfilled, (state, action) => {
        // console.log('fulfilled', action)
        state.Loading = false

        if (action.payload.length) {
          const time = Date.now()

          state.Thorn[defaultChainId].lastTime = time

          state.Thorn[defaultChainId].metadata = action.payload.map((i) =>
            buildMetadataInformation(i, getAddress(E4CRangerHive_ImmutableX_Thorn), parseTokenId(i.name))
          )
        }
      })
      .addCase(fetchMetadataThorn.rejected, (state) => {
        // console.log('failed')
        state.Thorn = defaultState.Thorn
        state.Loading = false
      })
  },
})

export default metadataImmutableXHiveSlice.reducer
