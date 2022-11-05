import { ERC721TokenType, ImmutableMethodParams, ImmutableMethodResults } from '@imtbl/imx-sdk'
import React, { useCallback, useEffect, useState } from 'react'

import { immutableXUnstakeApi } from '../api/immutableX'
import { ImmutableXWalletContext } from '../context'
import { ADDRESS_ImmutableX_Holder } from '../contracts'

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

/**
 * useImmutableXERC721AssetTransfers
 * @param param
 * @returns
 */
export const useImmutableXERC721AssetTransfers = () => {
  const { imxLink } = useImmutableXWallet()

  const transfer = useCallback(
    async ({ tokenId, tokenAddress, toAddress }: { tokenId: string; tokenAddress: string; toAddress: string }) => {
      if (!imxLink) {
        return
      }

      if (!tokenId || !tokenAddress || !toAddress) {
        console.error(`Missing parameters: tokenId: ${tokenId}, tokenAddress: ${tokenAddress}, toAddress: ${toAddress}`)
        return
      }

      try {
        const result = await imxLink.transfer([
          {
            type: ERC721TokenType.ERC721,
            tokenId: tokenId,
            tokenAddress,
            toAddress,
          },
        ])
        // Print the result
        // const result = [
        //   {
        //     type: 'ERC721',
        //     tokenId: '459',
        //     tokenAddress: '0xbf206014a878df4153036d7895188e340527a8f0',
        //     toAddress: '0xE4CdfD21b1Eb96650FF1acde35276D9da579070C',
        //     status: 'success',
        //     txId: 350045,
        //   },
        // ]

        // {"result":[{"token_address":"","symbol":"ETH","balance":"655600000000","preparing_withdrawal":"0","withdrawable":"0"}],"cursor":"eyJfIjoiIiwic3ltYm9sIjoiRVRIIiwiY29udHJhY3RfYWRkcmVzcyI6IiIsImlteCI6IjY1NTYwMDAwMDAwMCIsInByZXBhcmluZ193aXRoZHJhd2FsIjoiMCIsIndpdGhkcmF3YWJsZSI6IjAifQ","remaining":0}
        console.log(result)
      } catch (error) {
        // Catch and print out the error
        console.error(error)
      }
    },
    [imxLink]
  )

  return {
    send: transfer,
    state: 'Success',
  }
}

export const useImmutableXERC721AssetUnstake = () => {
  const { imxLink, walletInfo } = useImmutableXWallet()

  const getWalletSignSignature = useCallback(
    async (tokenAddress: string, tokenId: string) => {
      if (!imxLink || !walletInfo) return null
      const message = `Token address: ${tokenAddress}\nToken id: ${tokenId}`
      const { result: signature } = await imxLink.sign({ message, description: message })
      console.debug('account', walletInfo.address, 'signature', signature)
      return signature
    },
    [imxLink, walletInfo]
  )

  const unstake = useCallback(
    async ({ tokenAddress, tokenId }: { tokenAddress: string; tokenId: string }) => {
      if (!imxLink || !walletInfo) {
        return
      }

      if (!tokenId || !tokenAddress) {
        console.error(`Missing parameters: tokenId: ${tokenId}, tokenAddress: ${tokenAddress}`)
        return
      }

      const signature = await getWalletSignSignature(tokenAddress, tokenId)

      if (!signature) {
        console.error(`Missing parameters: signature: ${signature}`)
        return
      }

      const result = await immutableXUnstakeApi<any>({
        owner: walletInfo.address,
        tokenAddress,
        tokenId,
        signature,
      })
      console.log('result', result)

      return result
    },
    [getWalletSignSignature, imxLink, walletInfo]
  )

  return {
    send: unstake,
    state: 'Success',
  }
}

/**
 * useImmutableXOriginalOwner
 * @returns
 */
export const useImmutableXOriginalOwner = (tokenIds: string[]) => {
  const [originalOwner, setOriginalOwner] = useState<string[]>([])

  const calls = useCallback(async (tokenIds: string[]): Promise<void> => {
    try {
      // const result = await getImmutableXOriginalOwnerApi(tokenIds[0])
      // console.log('getImmutableXOriginalOwnerApi result:', result)

      const originalOwnerResult = tokenIds.map(() => ADDRESS_ImmutableX_Holder)
      setOriginalOwner(originalOwnerResult)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    calls(tokenIds)
  }, [calls, tokenIds])

  return originalOwner
}

/**
 * useImmutableXUpgraded
 * @param tokenIds
 * @returns
 */
export const useImmutableXUpgraded = (tokenIds: string[]) => {
  const [upgraded, setUpgraded] = useState<boolean[]>([])

  const calls = useCallback(async (tokenIds: string[]): Promise<void> => {
    try {
      // const result = await getImmutableXUpgradedApi(tokenIds[0])
      // console.log('getImmutableXUpgradedApi result:', result)

      const upgradedResult = tokenIds.map(() => false)
      setUpgraded(upgradedResult)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    calls(tokenIds)
  }, [calls, tokenIds])

  return upgraded
}
