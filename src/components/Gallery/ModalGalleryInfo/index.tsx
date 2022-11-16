import { Box } from '@mui/system'
import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'

import ModalGallery from '../../../components/ModalGallery'
import { BlindBoxTrait } from '../../../constants'
import { TokenMetadata, Trait, TraitEdition } from '../../../types'
import { getTraitEdition, imageSizeConversion, isPureGold, traitNameOnTop } from '../../../utils'
import { BlindBoxMode } from '../../../utils/bindbox'
import TokenMedia from '../../TokenMedia'
import { EditionColor, EditionPureGoldColor } from '../../Trait/Edition'

interface ModalGalleryInfoProps {
  readonly metadata: TokenMetadata
  readonly visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const ModalGalleryInfo: FC<ModalGalleryInfoProps> = ({ metadata, visible, setVisible }) => {
  const edition = useMemo<TraitEdition | undefined>(() => getTraitEdition(metadata), [metadata])

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

          {/* <Stack className="mt-9" spacing={4.5} direction="row">
            <a
              className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
              href={''}
              target="_blank"
              rel="noopener noreferrer"
            >
              Opensea
            </a>
            <a
              className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
              href={''}
              target="_blank"
              rel="noopener noreferrer"
            >
              Looksrare
            </a>
            <a
              className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
              href={''}
              target="_blank"
              rel="noopener noreferrer"
            >
              Etherscan
            </a>
          </Stack> */}
        </div>
      </Box>
    </ModalGallery>
  )
}

export default ModalGalleryInfo
