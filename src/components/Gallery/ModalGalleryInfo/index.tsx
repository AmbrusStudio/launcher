import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import { Dispatch, FC, SetStateAction } from 'react'

import ModalGallery from '../../../components/ModalGallery'
import { GALLERY } from '../../../types/gallery'

interface ModalGalleryInfoProps {
  readonly currentNFTInfo?: GALLERY
  readonly visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const ModalGalleryInfo: FC<ModalGalleryInfoProps> = ({ currentNFTInfo, visible, setVisible }) => {
  return (
    <ModalGallery title="E4C Rangers" id={currentNFTInfo?.id} visible={visible} toggle={(value) => setVisible(value)}>
      <Box className="flex flex-1 lg:flex-none flex-col lg:flex-row overflow-hidden lg:overflow-auto bg-white lg:bg-white/80 backdrop-blur-[20px] transition-none">
        <div className="lg:w-[600px] lg:h-[600px] overflow-hidden border-4 border-white">
          <img
            className="h-full object-cover w-full"
            src="https://ambrus.s3.amazonaws.com/1657877346203_0.92_206.jpg"
            alt="logo"
          />
        </div>
        <div className="flex flex-col flex-grow p-9 text-white overflow-auto">
          <div className="grid grid-cols-2 gap-6 mb-auto">
            {currentNFTInfo?.trait.map((j, index: number) => (
              <section key={index}>
                <p className="font-normal text-xs leading-[15px] m-0 p-0 not-italic uppercase text-[#a0a4b0]">
                  {j.key}
                </p>
                <p className="font-bold text-base leading-5 mx-0 mb-0 mt-1 p-0 text-[#2A2A2A] not-italic">{j.value}</p>
              </section>
            ))}
          </div>

          <Stack className="mt-9" spacing={4.5} direction="row">
            <a
              className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
              href={currentNFTInfo?.opensea_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Opensea
            </a>
            <a
              className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
              href={currentNFTInfo?.looksrare_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Looksrare
            </a>
            <a
              className="font-medium text-sm leading-[17px] text-[#0075FF] underline not-italic"
              href={currentNFTInfo?.etherscan_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Etherscan
            </a>
          </Stack>
        </div>
      </Box>
    </ModalGallery>
  )
}

export default ModalGalleryInfo
