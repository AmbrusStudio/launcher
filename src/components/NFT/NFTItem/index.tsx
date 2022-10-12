import { Stack } from '@mui/material'
import { useEthers } from '@usedapp/core'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useState } from 'react'

import { useWeb3Modal } from '../../../hooks'
// import Star from '../../../components/Icon/Star'
import { useE4CRangerUnstake, useERC721SafeTransferFrom } from '../../../hooks/useE4CRanger'
import { useHandleState } from '../../../hooks/useHandleState'
import { NFTE4CRanger } from '../../../types'
import { getHolderByAddress, imageSizeConversion } from '../../../utils'
import TokenMedia from '../../TokenMedia'
import NFTDetails from '../NFTDetails'
import StakeInfo from '../StakeInfo'
import StatusCheck from '../StatusCheck'

interface NFTItemProps {
  readonly nft: NFTE4CRanger
  readonly tokenId: string
  update: () => void
}

const NFTItem: FC<NFTItemProps> = ({ nft, tokenId, update }) => {
  const { account } = useEthers()
  const { chainIdMismatch, switchNetwork } = useWeb3Modal()

  const [visibleInfo, setVisibleInfo] = useState<boolean>(false)
  const [visibleStatusCheck, setVisibleStatusCheck] = useState<boolean>(false)

  const [stakeLoading, setStakeLoading] = useState<boolean>(false)
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false)

  const { state: stakeState, send: stake } = useERC721SafeTransferFrom(nft.address)
  const { state: unstakeState, send: unstake } = useE4CRangerUnstake(getHolderByAddress(nft.address))

  const handleState = useHandleState()

  // handle stake
  const onStake = useCallback(
    (tokenId: string) => {
      stake(account, getHolderByAddress(nft.address), tokenId)
    },
    [account, stake, nft.address]
  )

  // handle unstake
  const onUnstake = useCallback(
    (tokenId: string) => {
      unstake(tokenId)
    },
    [unstake]
  )

  // Watch stakeState
  useEffect(() => {
    handleState(stakeState)

    if (stakeState.status === 'PendingSignature' || stakeState.status === 'Mining') {
      setStakeLoading(true)
    } else {
      setStakeLoading(false)
    }

    if (stakeState.status === 'Success') {
      update()
    }
  }, [stakeState, handleState, update])

  // Watch unstakeState
  useEffect(() => {
    handleState(unstakeState)

    if (unstakeState.status === 'PendingSignature' || unstakeState.status === 'Mining') {
      setUnstakeLoading(true)
    } else {
      setUnstakeLoading(false)
    }

    if (unstakeState.status === 'Success') {
      update()
    }
  }, [unstakeState, handleState, update])

  return (
    <div className="bg-black relative min-h-300px">
      <div className="w-[53.5%] overflow-hidden float-left">
        <TokenMedia src={imageSizeConversion(nft.image, 2000)} />
      </div>
      <div className="w-[46.5%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0">
        <NFTDetails nft={nft} tokenId={tokenId} />

        {nft.upgraded === false && (
          <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
            {/* <button className="u-btn u-btn-primary max-w-[120px] relative !py-0">
              <Star sx={{ fontSize: '36px' }} />
            </button> */}
            {chainIdMismatch ? (
              <button className={'u-btn u-btn-primary'} onClick={() => switchNetwork()}>
                Switch Network
              </button>
            ) : nft.staking ? (
              <button
                disabled={unstakeLoading}
                className={classNames('u-btn u-btn-primary', {
                  loading: unstakeLoading,
                })}
                onClick={() => setVisibleStatusCheck(!visibleStatusCheck)}
              >
                Status Check
              </button>
            ) : (
              <button
                disabled={stakeLoading}
                className={classNames('u-btn u-btn-primary', {
                  loading: stakeLoading,
                })}
                onClick={() => setVisibleInfo(!visibleInfo)}
              >
                Upgrade
              </button>
            )}
          </Stack>
        )}
      </div>

      {visibleInfo && (
        <StakeInfo
          stakeLoading={stakeLoading}
          toggle={(value) => setVisibleInfo(value)}
          stake={() => onStake(tokenId)}
          nft={nft}
        />
      )}
      {visibleStatusCheck && (
        <StatusCheck
          unstakeLoading={unstakeLoading}
          nft={nft}
          toggle={(value) => setVisibleStatusCheck(value)}
          unstake={() => onUnstake(tokenId)}
        />
      )}
    </div>
  )
}

export default NFTItem
