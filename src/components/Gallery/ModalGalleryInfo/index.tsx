import { ImmutableAssetStatus } from '@imtbl/imx-sdk'
import { Box } from '@mui/system'
import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'

import ModalGallery from '../../../components/ModalGallery'
import { BlindBoxTrait } from '../../../constants'
import { useImmutableXAsset } from '../../../hooks'
import { MetadataStatus, TokenMetadata, Trait, TraitEdition } from '../../../types'
import { getTraitEdition, imageSizeConversion, isPureGold, traitNameOnTop } from '../../../utils'
import { BlindBoxMode } from '../../../utils/bindbox'
import TokenLink from '../../TokenLink'
import TokenMedia from '../../TokenMedia'
import { EditionColor, EditionPureGoldColor } from '../../Trait/Edition'

interface ModalGalleryInfoProps {
  readonly metadata: TokenMetadata
  readonly visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const ModalGalleryInfo: FC<ModalGalleryInfoProps> = ({ metadata, visible, setVisible }) => {
  const edition = useMemo<TraitEdition | undefined>(() => getTraitEdition(metadata), [metadata])
  // ERC721 Asset
  const { immutableXAsset: asset } = useImmutableXAsset({
    token_address: metadata.address,
    token_id: metadata.tokenId,
  })

  // ERC721 Status
  const status = useMemo(() => {
    if (asset) {
      if (asset.status === ImmutableAssetStatus.eth) {
        return MetadataStatus.Ethereum
      } else if (asset.status === ImmutableAssetStatus.imx) {
        return MetadataStatus.ImmutableX
      } else {
        return MetadataStatus.Ethereum
      }
    } else {
      return MetadataStatus.Ethereum
    }
  }, [asset])

  return (
    <ModalGallery
      title="E4C Rangers"
      id={Number(metadata.tokenId)}
      visible={visible}
      toggle={(value) => setVisible(value)}
    >
      <Box className="flex flex-1 lg:flex-none flex-col lg:flex-row overflow-hidden lg:overflow-auto bg-white lg:bg-white/80 backdrop-blur-[20px] transition-none">
        <div className="w-[100vw] h-[100vw] lg:w-[600px] lg:h-[600px] border-4 border-white">
          <TokenMedia src={imageSizeConversion(metadata.image, 2000)} trait={metadata?.trait || []} />
        </div>
        <div className="flex flex-1 flex-col flex-grow p-9 text-white overflow-auto max-height-modal-info">
          <div className="grid grid-cols-2 gap-6 mb-auto">
            {traitNameOnTop(metadata?.trait || []).map((trait, index: number) => (
              <section key={index}>
                <p className="font-normal text-xs leading-[15px] m-0 p-0 not-italic uppercase text-[#a0a4b0]">
                  {trait.trait_type}
                </p>
                <p
                  className={classNames(
                    'inline-block font-bold text-base leading-5 mx-0 mb-0 mt-1 p-0 not-italic',
                    {
                      'text-[#2A2A2A]': trait.trait_type !== Trait.Edition || BlindBoxMode(metadata.trait),
                    },
                    trait.trait_type === Trait.Edition && !BlindBoxMode(metadata.trait)
                      ? EditionColor(edition)
                      : undefined,
                    trait.trait_type !== Trait.Edition && !BlindBoxMode(metadata.trait)
                      ? EditionPureGoldColor(isPureGold(trait.value))
                      : undefined
                  )}
                >
                  {!BlindBoxMode(metadata.trait) || BlindBoxTrait.includes(trait.trait_type) ? trait.value : 'unknown'}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-[21px]">
            <TokenLink address={metadata.address} status={status} />
          </div>
        </div>
      </Box>
    </ModalGallery>
  )
}

export default ModalGalleryInfo
