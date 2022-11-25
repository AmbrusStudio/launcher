import 'swiper/css'
import 'react-photo-view/dist/react-photo-view.css'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'

import { useStake } from '../../../hooks/useStake'
import { NFTE4CRanger } from '../../../types'
import { BlindBoxVideo } from '../../../utils/bindbox'
import ConfirmUnstakeModal from '../ConfirmUnstakeModal'
import ConfirmUpgradeModal from '../ConfirmUpgradeModal'
import NFTDetails from '../NFTDetails'
import Slider from '../Slider'
import StakeInfoModal from '../StakeInfoModal'
import StatusCheckModal from '../StatusCheckModal'
import TokenActions from '../TokenActions'

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
            const dom = document.querySelector<HTMLButtonElement>('#image-viewer')
            dom?.click()
          }

          setActive(index)
        }}
      />

      {nft && (
        <>
          <div className="pb-18 px-6 xl:px-2.5]">
            <NFTDetails nft={nft} tokenId={nft.tokenId} />

            <Actions className="fixed left-6 bottom-6 right-6">
              <TokenActions
                nft={nft}
                stakeLoading={stakeLoading}
                unstakeLoading={unstakeLoading}
                setVisibleStatusCheck={() => setVisibleStatusCheckModal(true)}
                setVisibleInfo={() => setVisibleStakeInfoModal(true)}
              />
            </Actions>
          </div>
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
