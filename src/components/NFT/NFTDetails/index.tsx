import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import { FC } from 'react'

import { Metadata } from '../../../types'
import { getEdition, parseTokenId } from '../../../utils'
import NFTTag from '../NFTTag'

const NFTInfoContent = styled.div`
  margin: 36px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  max-height: 252px;
  overflow: auto;
`

const NFTInfoIntroductionTitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: #a0a4b0;
  padding: 0;
  margin: 0;
`
const NFTInfoIntroductionContent = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  padding: 0;
  margin: 4px 0 0 0;
`

interface NFTDetailsProps {
  readonly nft: Metadata
  readonly tokenId: number
}

const NFTDetails: FC<NFTDetailsProps> = ({ nft, tokenId }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <section>
          <span className="font-bold text-6.5 lg:text-9 not-italic uppercase leading-11 font-sans text-rust">
            {nft.name}
          </span>
          <Stack spacing={2} direction="row">
            <span className="font-bold text-6.5 lg:text-9 not-italic uppercase leading-11 font-sans text-white">
              {nft.description || '-'}
            </span>
            <span className="font-bold text-6.5 lg:text-9 not-italic uppercase leading-11 font-sans text-white">
              #{tokenId}
            </span>
          </Stack>
        </section>
        <NFTTag content={getEdition(parseTokenId(nft.name))} />
      </Box>

      <NFTInfoContent>
        {nft.attributes.map((trait, index) => (
          <section key={index}>
            <NFTInfoIntroductionTitle>{trait.trait_type}</NFTInfoIntroductionTitle>
            <NFTInfoIntroductionContent>{trait.value}</NFTInfoIntroductionContent>
          </section>
        ))}
      </NFTInfoContent>
    </>
  )
}

export default NFTDetails
