import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { useEthers } from '@usedapp/core'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useState } from 'react'

import Star from '../../../components/Icon/Star'
import { ADDRESS_ASR, ADDRESS_E4C_Ranger } from '../../../contracts'
import { useE4CRangerUnstake, useERC721SafeTransferFrom } from '../../../hooks/useE4CRanger'
import { useHandleState } from '../../../hooks/useHandleState'
import { NFTE4CRanger } from '../../../types'
import NFTDetails from '../NFTDetails'
import NFTPerk from '../NFTPerk'
import StakeInfo from '../StakeInfo'
import StatusCheck from '../StatusCheck'

const WrapperInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

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
    <div className="flex-col lg:flex-row lg:flex h-auto lg:h-[600px] bg-black relative">
      <div className="lg:w-[600px] lg:h-[600px] overflow-hidden">
        <img className="h-full object-cover w-full" src={nft.image} alt={nft.name} />
      </div>
      <WrapperInfo>
        <NFTDetails nft={nft} tokenId={tokenId} />

        <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
          {Number(tokenId) >= 16 && nft.upgraded === false && (
            <>
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
                  Check Upgrading Status
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
            </>
          )}
        </Stack>
      </WrapperInfo>
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
