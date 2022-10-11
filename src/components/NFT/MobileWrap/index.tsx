import 'swiper/css'
import 'react-photo-view/dist/react-photo-view.css'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { useEthers } from '@usedapp/core'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'

import { BlindBoxPictures } from '../../../constants'
import { useE4CRangerUnstake, useERC721SafeTransferFrom } from '../../../hooks/useE4CRanger'
import { useHandleState } from '../../../hooks/useHandleState'
import { NFTE4CRanger } from '../../../types'
import { getHolderByAddress } from '../../../utils'
// import Star from '../../Icon/Star'
import ConfirmUnstakeModal from '../ConfirmUnstakeModal'
import ConfirmUpgradeModal from '../ConfirmUpgradeModal'
import NFTDetails from '../NFTDetails'
import Slider from '../Slider'
import StakeInfoModal from '../StakeInfoModal'
import StatusCheckModal from '../StatusCheckModal'

const Actions = styled(Stack)`
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`

interface MobileWrapProps {
  nfts: NFTE4CRanger[]
}

const MobileWrap: FC<MobileWrapProps> = ({ nfts }) => {
  const { account } = useEthers()

  const [active, setActive] = useState<number>(0)
  const [visibleStakeInfoModal, setVisibleStakeInfoModal] = useState<boolean>(false)
  const [visibleStatusCheckModal, setVisibleStatusCheckModal] = useState<boolean>(false)

  const [visibleConfirmUnstake, setVisibleConfirmUnstake] = useState<boolean>(false)
  const [visibleConfirmUpgrade, setVisibleConfirmUpgrade] = useState<boolean>(false)

  const [stakeLoading, setStakeLoading] = useState<boolean>(false)
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false)

  const nft = useMemo<NFTE4CRanger>(() => nfts[active], [nfts, active])

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
    <>
      <Slider
        nfts={nfts}
        active={active}
        setActive={(index) => {
          if (index === active) {
            const dom = document.querySelector<HTMLButtonElement>('#image-viewer')
            dom?.click()
          }

          setActive(index)
        }}
      />

      {nft && (
        <>
          <div className="px-6 xl:px-2.5">
            <NFTDetails nft={nft} tokenId={nft.tokenId} />
          </div>
          {nft.upgraded === false && (
            <Actions sx={{ marginTop: 'auto' }} direction="row" spacing={1.5} className="fixed left-6 bottom-6 right-6">
              {/* <button className="u-btn u-btn-primary max-w-[120px] relative !py-0">
                <Star sx={{ fontSize: '36px' }} />
              </button> */}
              {nft.staking ? (
                <button
                  disabled={unstakeLoading}
                  className={classNames('u-btn u-btn-primary', {
                    loading: unstakeLoading,
                  })}
                  onClick={() => setVisibleStatusCheckModal(true)}
                >
                  Status Check
                </button>
              ) : (
                <button
                  disabled={stakeLoading}
                  className={classNames('u-btn u-btn-primary', {
                    loading: stakeLoading,
                  })}
                  onClick={() => setVisibleStakeInfoModal(true)}
                >
                  Upgrade
                </button>
              )}
            </Actions>
          )}
        </>
      )}

      <StakeInfoModal
        visible={visibleStakeInfoModal}
        loading={stakeLoading}
        nft={nft}
        close={() => setVisibleStakeInfoModal(false)}
        stake={() => onStake(nft.tokenId)}
      />
      <StatusCheckModal
        visible={visibleStatusCheckModal}
        loading={unstakeLoading}
        close={() => setVisibleStatusCheckModal(false)}
        upgrade={() => setVisibleConfirmUpgrade(true)}
        unstake={() => setVisibleConfirmUnstake(true)}
        nft={nft}
      />
      <ConfirmUnstakeModal
        visible={visibleConfirmUnstake}
        loading={unstakeLoading}
        close={() => setVisibleConfirmUnstake(false)}
        confirm={() => onUnstake(nft.tokenId)}
      />
      <ConfirmUpgradeModal
        visible={visibleConfirmUpgrade}
        loading={unstakeLoading}
        close={() => setVisibleConfirmUpgrade(false)}
        confirm={() => onUnstake(nft.tokenId)}
      />

      <PhotoProvider>
        <PhotoView src={BlindBoxPictures}>
          <button id="image-viewer" className="text-white fixed left-0 top-0 translate-x-[-100%]">
            Click
          </button>
        </PhotoView>
      </PhotoProvider>
    </>
  )
}

export default MobileWrap
