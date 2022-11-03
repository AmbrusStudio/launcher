import { ImmutableMethodParams, ImmutableMethodResults } from '@imtbl/imx-sdk'
import React, { useCallback, useEffect, useState } from 'react'

import { ImmutableXWalletContext } from '../context'

type ImmutableGetAssetsResultCodec = ImmutableMethodResults.ImmutableGetAssetsResult['result']

export const useImmutableXWallet = () => React.useContext(ImmutableXWalletContext)

/**
 * useImmutableXUserNFTAssets hooks
 * @returns
 */
export const useImmutableXUserNFTAssets = ({ user, collection }: { user: string; collection: string }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { imxClient } = useImmutableXWallet()
  const [immutableXAssets, setImmutableXAssets] = useState<ImmutableGetAssetsResultCodec>([])

  const getAssets = useCallback(async () => {
    if (!imxClient || !user) {
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      let assetCursor
      let assets: ImmutableGetAssetsResultCodec = []
      do {
        const assetRequest: ImmutableMethodResults.ImmutableGetAssetsResult = await imxClient.getAssets({
          user,
          cursor: assetCursor,
          status: 'imx',
          collection,
        } as ImmutableMethodParams.ImmutableGetAssetsParamsTS)

        console.log('assetRequest', assetRequest)

        assets = assets.concat(assetRequest.result)
        assetCursor = assetRequest.cursor
      } while (assetCursor)

      setImmutableXAssets(assets)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [imxClient, user, collection])

  useEffect(() => {
    getAssets()
  }, [getAssets])

  return {
    immutableXAssets,
    loading: loading,
  }
}
