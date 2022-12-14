import { useEthers } from '@usedapp/core'
import { useCallback, useEffect, useState } from 'react'

import { E4CRanger_ImmutableX_Holder } from '../contracts'
import { MetadataStatus, NFTE4CRanger } from '../types'
import { getHolderByAddress } from '../utils'
import { useE4CRangerUnstake, useERC721SafeTransferFrom } from './useE4CRanger'
import { useHandleState, useHandleStateImmutableX } from './useHandleState'
import { useImmutableXERC721AssetTransfers, useImmutableXERC721AssetUnstake } from './useImmutableX'

interface Props {
  readonly nft: NFTE4CRanger
}

export function useStake({ nft }: Props) {
  const { account } = useEthers()

  const [stakeLoading, setStakeLoading] = useState<boolean>(false)
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false)

  const { state: stakeState, send: stake } = useERC721SafeTransferFrom(
    nft.status === MetadataStatus.Ethereum ? nft.address : ''
  )
  const { state: unstakeState, send: unstake } = useE4CRangerUnstake(
    nft.status === MetadataStatus.Ethereum ? getHolderByAddress(nft.address) : ''
  )

  const { state: stakeStateImmutableX, send: stakeImmutableX } = useImmutableXERC721AssetTransfers()
  const { state: unstakeStateImmutableX, send: unstakeImmutableX } = useImmutableXERC721AssetUnstake()

  const handleState = useHandleState()
  const handleStateImmutableX = useHandleStateImmutableX()

  // handle stake
  const onStake = useCallback(
    (tokenId: string) => {
      if (nft.status === MetadataStatus.Ethereum) {
        stake(account, getHolderByAddress(nft.address), tokenId)
      } else if (nft.status === MetadataStatus.ImmutableX) {
        stakeImmutableX({
          tokenId: tokenId,
          tokenAddress: nft.address,
          toAddress: E4CRanger_ImmutableX_Holder,
        })
      } else {
        console.error('No matching stake method')
      }
    },
    [nft.status, nft.address, stake, account, stakeImmutableX]
  )

  // handle unstake
  const onUnstake = useCallback(
    async (tokenId: string) => {
      if (nft.status === MetadataStatus.Ethereum) {
        unstake(tokenId)
      } else if (nft.status === MetadataStatus.ImmutableX) {
        unstakeImmutableX({
          tokenId: tokenId,
          tokenAddress: nft.address,
        })
      } else {
        console.error('No matching unstake method')
      }
    },
    [nft.address, nft.status, unstake, unstakeImmutableX]
  )

  // Watch stakeState
  useEffect(() => {
    handleState(stakeState)

    if (stakeState.status === 'PendingSignature' || stakeState.status === 'Mining') {
      setStakeLoading(true)
    } else {
      setStakeLoading(false)
    }
  }, [stakeState, handleState])

  useEffect(() => {
    handleStateImmutableX(stakeStateImmutableX)

    if (stakeStateImmutableX.status === 'PendingSignature' || stakeStateImmutableX.status === 'Mining') {
      setStakeLoading(true)
    } else {
      setStakeLoading(false)
    }
  }, [stakeStateImmutableX, handleStateImmutableX])

  // Watch unstakeState
  useEffect(() => {
    handleState(unstakeState)

    if (unstakeState.status === 'PendingSignature' || unstakeState.status === 'Mining') {
      setUnstakeLoading(true)
    } else {
      setUnstakeLoading(false)
    }
  }, [unstakeState, handleState])

  useEffect(() => {
    handleStateImmutableX(unstakeStateImmutableX)

    if (unstakeStateImmutableX.status === 'PendingSignature' || unstakeStateImmutableX.status === 'Mining') {
      setUnstakeLoading(true)
    } else {
      setUnstakeLoading(false)
    }
  }, [unstakeStateImmutableX, handleStateImmutableX])

  return {
    stakeLoading,
    unstakeLoading,
    onStake,
    onUnstake,
  }
}
