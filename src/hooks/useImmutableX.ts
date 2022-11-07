import { ERC721TokenType, ImmutableMethodParams, ImmutableMethodResults } from '@imtbl/imx-sdk'
import * as Sentry from '@sentry/react'
import React, { useCallback, useEffect, useState } from 'react'

import { getImmutableXStakingStatusApi, immutableXUnstakeApi } from '../api/immutableX'
import { ImmutableXWalletContext } from '../context'
import {
  ImmutableXStakingStatus,
  ImmutableXUnstake,
  TransactionStateImmutableX,
  TransactionStatusImmutableX,
} from '../types/immutableX'
import { toErrorWithMessage } from '../utils/error'

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
 * @param
 * @returns
 */
export const useImmutableXERC721AssetTransfers = () => {
  const { imxLink } = useImmutableXWallet()
  const [state, setState] = useState<TransactionStatusImmutableX>({ status: TransactionStateImmutableX.None })

  const resetState = useCallback(() => {
    setState({ status: TransactionStateImmutableX.None })
  }, [setState])

  const transfer = useCallback(
    async ({ tokenId, tokenAddress, toAddress }: { tokenId: string; tokenAddress: string; toAddress: string }) => {
      if (!imxLink) {
        return
      }

      if (!tokenId || !tokenAddress || !toAddress) {
        console.error(`Missing parameters: tokenId: ${tokenId}, tokenAddress: ${tokenAddress}, toAddress: ${toAddress}`)
        return
      }

      setState({ status: TransactionStateImmutableX.PendingSignature })

      try {
        const response = await imxLink.transfer([
          {
            type: ERC721TokenType.ERC721,
            tokenId: tokenId,
            tokenAddress,
            toAddress,
          },
        ])
        console.log(response)

        setState({ status: TransactionStateImmutableX.Mining })

        const { status } = response.result[0]

        if (status === 'success') {
          setState({ status: TransactionStateImmutableX.Success })
        } else if (status === 'error') {
          setState({ status: TransactionStateImmutableX.Fail, errorMessage: response.result[0].message })
        } else {
          setState({ status: TransactionStateImmutableX.Exception, errorMessage: `status: ${status}` })
        }
      } catch (error) {
        const e = `Error encountered calling 'link.transfer' on ${error}. parameters: tokenId: ${tokenId}, tokenAddress: ${tokenAddress}, toAddress: ${toAddress}`
        console.error(e)
        Sentry.captureException(e)

        const err = toErrorWithMessage(error)

        if (err.message === 'Link Window Closed') {
          setState({ status: TransactionStateImmutableX.Exception, errorMessage: 'User closes the window' })
        } else if (err.message === '') {
          setState({ status: TransactionStateImmutableX.Exception, errorMessage: 'User deny' })
        } else {
          setState({ status: TransactionStateImmutableX.Fail, errorMessage: err.message })
        }
      }
    },
    [imxLink]
  )

  return {
    send: transfer,
    state,
    resetState,
  }
}

/**
 * useImmutableXERC721AssetUnstake
 * @returns
 */
export const useImmutableXERC721AssetUnstake = () => {
  const { imxLink, walletInfo } = useImmutableXWallet()
  const [state, setState] = useState<TransactionStatusImmutableX>({ status: TransactionStateImmutableX.None })

  const resetState = useCallback(() => {
    setState({ status: TransactionStateImmutableX.None })
  }, [setState])

  const getWalletSignSignature = useCallback(
    async (tokenAddress: string, tokenId: string): Promise<string | undefined> => {
      if (!imxLink || !walletInfo) {
        return
      }

      try {
        const message = `Token address: ${tokenAddress}\nToken id: ${tokenId}`
        const { result: signature } = await imxLink.sign({ message, description: message })
        console.debug('account', walletInfo.address, 'signature', signature)
        return signature
      } catch (error) {
        const e = `Error encountered calling 'link.sign' on ${error}. parameters: tokenId: ${tokenId}, tokenAddress: ${tokenAddress}`
        console.error(e)
        Sentry.captureException(e)

        const err = toErrorWithMessage(error)

        if (err.message === 'Link Window Closed') {
          setState({ status: TransactionStateImmutableX.Exception, errorMessage: 'User closes the window' })
        } else {
          setState({ status: TransactionStateImmutableX.Fail, errorMessage: err.message })
        }
      }
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

      setState({ status: TransactionStateImmutableX.PendingSignature })

      const signature = await getWalletSignSignature(tokenAddress, tokenId)

      if (!signature) {
        console.error(`Missing parameters: signature: ${signature}`)
        return
      }

      try {
        const response = await immutableXUnstakeApi<ImmutableXUnstake>({
          owner: walletInfo.address,
          tokenAddress,
          tokenId,
          signature,
        })

        console.log('response', response)

        setState({ status: TransactionStateImmutableX.Mining })

        if (response.status === 200) {
          const { status } = response.data
          if (status === 'success') {
            setState({ status: TransactionStateImmutableX.Success })
          } else if (status === 'failure') {
            setState({ status: TransactionStateImmutableX.Fail, errorMessage: `status: ${status}` })
          } else {
            setState({ status: TransactionStateImmutableX.Exception, errorMessage: `status: ${status}` })
          }
        } else {
          setState({
            status: TransactionStateImmutableX.Exception,
            errorMessage: `response status: ${response.status}`,
          })
        }
      } catch (error) {
        const e = `Error encountered calling 'immutableXUnstakeApi' on ${error}. parameters: tokenId: ${tokenId}, tokenAddress: ${tokenAddress}, signature: ${signature}, owner: ${walletInfo.address}`
        console.error(e)
        Sentry.captureException(e)

        const err = toErrorWithMessage(error)
        setState({ status: TransactionStateImmutableX.Fail, errorMessage: err.message })
      }
    },
    [getWalletSignSignature, imxLink, walletInfo]
  )

  return {
    send: unstake,
    state,
    resetState,
  }
}

/**
 * useImmutableXStakingStatuses
 * @returns
 */
export const useImmutableXStakingStatuses = (tokenAddress: string, tokenIds: string[]) => {
  const [stakingStatus, setStakingStatus] = useState<ImmutableXStakingStatus[]>([])

  const calls = useCallback(async (tokenAddress: string, tokenIds: string[]): Promise<void> => {
    if (!tokenAddress || !tokenIds[0]) {
      return
    }

    try {
      const promiseAllArray = tokenIds.map((tokenId) =>
        getImmutableXStakingStatusApi<ImmutableXStakingStatus>(tokenAddress, tokenId)
      )

      const response = await Promise.all(promiseAllArray)

      response.forEach((item) => {
        if (item.status !== 200) {
          throw new Error('status is not 200')
        }
      })

      setStakingStatus(response.map((item) => item.data))
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    calls(tokenAddress, tokenIds)
  }, [calls, tokenAddress, tokenIds])

  return stakingStatus
}

/**
 * useImmutableXStakingStatus
 * @param tokenAddress
 * @param tokenId
 * @returns
 */
export const useImmutableXStakingStatus = (tokenAddress: string, tokenId: string) => {
  const [stakingStatus, setStakingStatus] = useState<ImmutableXStakingStatus>()

  const calls = useCallback(async (tokenAddress: string, tokenId: string): Promise<void> => {
    if (!tokenAddress || !tokenId) {
      return
    }

    try {
      const response = await getImmutableXStakingStatusApi<ImmutableXStakingStatus>(tokenAddress, tokenId)

      if (response.status !== 200) {
        throw new Error('status is not 200')
      }

      setStakingStatus(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    calls(tokenAddress, tokenId)
  }, [calls, tokenAddress, tokenId])

  return stakingStatus
}
