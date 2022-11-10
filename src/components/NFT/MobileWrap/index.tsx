import 'swiper/css'
import 'react-photo-view/dist/react-photo-view.css'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { useEthers } from '@usedapp/core'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'

import withdraw from '../../../assets/images/withdraw.png'
import { E4CRanger_ImmutableX_Holder } from '../../../contracts'
import { useImmutableXERC721AssetTransfers, useImmutableXERC721AssetUnstake, useWeb3Modal } from '../../../hooks'
import { useE4CRangerUnstake, useERC721SafeTransferFrom } from '../../../hooks/useE4CRanger'
import { useHandleState, useHandleStateImmutableX } from '../../../hooks/useHandleState'
import { MetadataStatus, NFTE4CRanger, TraitName } from '../../../types'
import { TransactionStateImmutableX } from '../../../types/immutableX'
import { getHolderByAddress } from '../../../utils'
import { BlindBoxVideo, traitName } from '../../../utils/bindbox'
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
  readonly nfts: NFTE4CRanger[]
  update: () => void
}

const MobileWrap: FC<MobileWrapProps> = ({ nfts, update }) => {
  const { account } = useEthers()
  const { chainIdMismatch, switchNetwork } = useWeb3Modal()

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

  const { state: stakeStateImmutableX, send: stakeImmutableX } = useImmutableXERC721AssetTransfers()
  const { state: unstakeStateImmutableX, send: unstakeImmutableX } = useImmutableXERC721AssetUnstake()

  const handleState = useHandleState()
  const handleStateImmutableX = useHandleStateImmutableX()

  // handle stake
  const onStake = useCallback(
    async (tokenId: string) => {
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
    handleStateImmutableX(stakeStateImmutableX)

    if (
      stakeState.status === 'PendingSignature' ||
      stakeState.status === 'Mining' ||
      stakeStateImmutableX.status === 'PendingSignature' ||
      stakeStateImmutableX.status === 'Mining'
    ) {
      setStakeLoading(true)
    } else {
      setStakeLoading(false)
    }

    if (stakeState.status === 'Success' || stakeStateImmutableX.status === TransactionStateImmutableX.Success) {
      update()
    }
  }, [stakeState, handleState, update, stakeStateImmutableX.status, stakeStateImmutableX, handleStateImmutableX])

  // Watch unstakeState
  useEffect(() => {
    handleState(unstakeState)
    handleStateImmutableX(unstakeStateImmutableX)

    if (
      unstakeState.status === 'PendingSignature' ||
      unstakeState.status === 'Mining' ||
      unstakeStateImmutableX.status === 'PendingSignature' ||
      unstakeStateImmutableX.status === 'Mining'
    ) {
      setUnstakeLoading(true)
    } else {
      setUnstakeLoading(false)
    }

    if (unstakeState.status === 'Success' || unstakeStateImmutableX.status === TransactionStateImmutableX.Success) {
      update()
    }
  }, [unstakeState, handleState, update, unstakeStateImmutableX.status, unstakeStateImmutableX, handleStateImmutableX])

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
          {nft.upgraded === false ||
            (traitName(nft.trait) !== TraitName.Kit && (
              <Actions
                sx={{ marginTop: 'auto' }}
                direction="row"
                spacing={1.5}
                className="fixed left-6 bottom-6 right-6"
              >
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
                {
                  <button
                    className="u-btn max-w-[120px] !bg-[#465358]"
                    onClick={() => window.open('https://imxtools.io/withdrawal')}
                  >
                    <img className="w-9 h-9" src={withdraw} alt="imxtools withdrawal" />
                  </button>
                }
              </Actions>
            ))}
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
        <PhotoView src={BlindBoxVideo(nft.trait)}>
          <button id="image-viewer" className="text-white fixed left-0 top-0 translate-x-[-100%]">
            Click
          </button>
        </PhotoView>
      </PhotoProvider>
    </>
  )
}

export default MobileWrap
