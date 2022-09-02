import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC } from 'react'

import { NFTE4CRanger } from '../../../types'
import { getEdition } from '../../../utils'
import NFTTag from '../NFTTag'

const NFTInfoContent = styled.div`
  margin: 36px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  /* max-height: 252px; */
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
  readonly nft: NFTE4CRanger
  readonly tokenId: string
}

const NFTDetails: FC<NFTDetailsProps> = ({ nft, tokenId }) => {
  return (
    <>
      <section className="flex items-start justify-between">
        <section className="mr-2">
          <span className="font-bold text-base lg:text-9 not-italic uppercase leading-5 lg:leading-11 font-sans text-rust break-all">
            {nft.name}
          </span>
          <Stack spacing={2} direction="row">
            <span className="font-bold text-base lg:text-9 not-italic uppercase leading-5 lg:leading-11 font-sans text-white break-all">
              {nft.description || '-'}
            </span>
            <span className="font-bold text-base lg:text-9 not-italic uppercase leading-5 lg:leading-11 font-sans text-white">
              #{tokenId}
            </span>
          </Stack>
        </section>
        {nft.upgraded !== undefined && <NFTTag content={getEdition(Number(tokenId), nft.upgraded)} />}
      </section>

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
