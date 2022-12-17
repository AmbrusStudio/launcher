import 'swiper/css'
import 'react-photo-view/dist/react-photo-view.css'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { PhotoSlider } from 'react-photo-view'

import { useStake } from '../../../hooks/useStake'
import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'
import { tokenMedia } from '../../../utils/bindbox'
import ConfirmUnstakeModal from '../ConfirmUnstakeModal'
import ConfirmUpgradeModal from '../ConfirmUpgradeModal'
import NFTDetails from '../NFTDetails'
import Slider from '../Slider'
import StakeInfoModal from '../StakeInfoModal'
import StatusCheckModal from '../StatusCheckModal'
import TokenActions, { StakeButton, UnstakeButton } from '../TokenActions'

const Actions = styled(Stack)`
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`

interface MobileWrapProps {
  readonly nfts: NFTE4CRanger[]
}

const MobileWrap: FC<MobileWrapProps> = ({ nfts }) => {
  const [active, setActive] = useState<number>(0)
  const nft = useMemo<NFTE4CRanger>(() => nfts[active], [nfts, active])
  const [visiblePhotoSlider, setVisiblePhotoSlider] = useState(false)

  const [visibleStakeInfoModal, setVisibleStakeInfoModal] = useState<boolean>(false)
  const [visibleStatusCheckModal, setVisibleStatusCheckModal] = useState<boolean>(false)

  const [visibleConfirmUnstake, setVisibleConfirmUnstake] = useState<boolean>(false)
  const [visibleConfirmUpgrade, setVisibleConfirmUpgrade] = useState<boolean>(false)

  const { stakeLoading, unstakeLoading, onStake, onUnstake } = useStake({ nft })

  return (
    <>
      <Slider
        nfts={nfts}
        active={active}
        setActive={(index) => {
          if (index === active) {
            setVisiblePhotoSlider(true)
          }

          setActive(index)
        }}
      />

      {nft && (
        <>
          <div className="pb-18 px-6 xl:px-2.5]">
            <NFTDetails nft={nft} />

            <Actions className="fixed left-6 bottom-6 right-6">
              <TokenActions
                nft={nft}
                stakeButton={<StakeButton loading={stakeLoading} onClick={() => setVisibleStakeInfoModal(true)} />}
                unstakeButton={
                  <UnstakeButton loading={unstakeLoading} onClick={() => setVisibleStatusCheckModal(true)} />
                }
              />
            </Actions>
          </div>
          <PhotoSlider
            bannerVisible={false}
            images={[
              {
                src: tokenMedia({
                  src: imageSizeConversion(nft.image, 800),
                  trait: nft.trait,
                }),
                key: `${nft.address}_${nft.tokenId}`,
              },
            ]}
            visible={visiblePhotoSlider}
            onClose={() => setVisiblePhotoSlider(false)}
          />
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
    </>
  )
}

export default MobileWrap
