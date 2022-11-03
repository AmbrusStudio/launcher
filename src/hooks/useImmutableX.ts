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
  const { imxClient } = useImmutableXWallet()
  const [immutableXAssets, setImmutableXAssets] = useState<ImmutableGetAssetsResultCodec>([])

  const getAssets = useCallback(async () => {
    if (!imxClient || !user) return

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
  }, [imxClient, user, collection])

  useEffect(() => {
    getAssets()
  }, [getAssets])

  return {
    immutableXAssets,
    loading: false,
  }
}
