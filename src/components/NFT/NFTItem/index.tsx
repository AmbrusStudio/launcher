import { Stack } from '@mui/material'
import { useEthers } from '@usedapp/core'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useState } from 'react'

import Star from '../../../components/Icon/Star'
import { ADDRESS_ASR, ADDRESS_E4C_Ranger } from '../../../contracts'
import { useE4CRangerUnstake, useERC721SafeTransferFrom } from '../../../hooks/useE4CRanger'
import { useHandleState } from '../../../hooks/useHandleState'
import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'
import NFTDetails from '../NFTDetails'
import NFTPerk from '../NFTPerk'
import StakeInfo from '../StakeInfo'
import StatusCheck from '../StatusCheck'

interface NFTItemProps {
  readonly nft: NFTE4CRanger
  readonly tokenId: string
}

const NFTItem: FC<NFTItemProps> = ({ nft, tokenId }) => {
  const { account } = useEthers()

  const [visibleInfo, setVisibleInfo] = useState<boolean>(false)
  const [visibleStatusCheck, setVisibleStatusCheck] = useState<boolean>(false)
  const [togglePerk, setTogglePerk] = useState<boolean>(false)

  const [stakeLoading, setStakeLoading] = useState<boolean>(false)
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false)

  const { state: stakeState, send: stake } = useERC721SafeTransferFrom(ADDRESS_ASR)
  const { state: unstakeState, send: unstake } = useE4CRangerUnstake(ADDRESS_E4C_Ranger)

  const handleState = useHandleState()

  // handle stake
  const onStake = useCallback(
    (tokenId: string) => {
      stake(account, ADDRESS_E4C_Ranger, tokenId)
    },
    [account, stake]
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
  }, [stakeState, handleState])

  // Watch unstakeState
  useEffect(() => {
    handleState(unstakeState)

    if (unstakeState.status === 'PendingSignature' || unstakeState.status === 'Mining') {
      setUnstakeLoading(true)
    } else {
      setUnstakeLoading(false)
    }
  }, [unstakeState, handleState])

  return (
    <div className="bg-black relative">
      <div className="w-[53.5%] overflow-hidden float-left">
        <img className="h-full object-cover w-full" src={imageSizeConversion(nft.image, 2000)} alt={nft.name} />
      </div>
      <div className="w-[46.5%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0">
        <NFTDetails nft={nft} tokenId={tokenId} />

        {Number(tokenId) >= 16 && nft.upgraded === false && (
          <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
            <button className="u-btn u-btn-primary max-w-[120px] relative !py-0">
              <Star sx={{ fontSize: '36px' }} />
            </button>
            {nft.staking ? (
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
      <NFTPerk visible={togglePerk} toggle={(value) => setTogglePerk(value)} />
      {visibleInfo && (
        <StakeInfo
          stakeLoading={stakeLoading}
          toggle={(value) => setVisibleInfo(value)}
          stake={() => onStake(tokenId)}
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
