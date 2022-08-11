import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import { FC, useState } from 'react'

import { NFT } from '../../../types'
import NFTInfo from '../NFTInfo'
import NFTPerk from '../NFTPerk'
import NFTStar from '../NFTStar'
import NFTTag from '../NFTTag'
import NFTUpgrade from '../NFTUpgrade'

const WrapperInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const NFTInfoContent = styled.div`
  margin: 36px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
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

interface NFTItemProps {
  readonly nft: NFT
}

const NFTItem: FC<NFTItemProps> = ({ nft }) => {
  const [toggleInfo, setToggleInfo] = useState<boolean>(false)
  const [togglePerk, setTogglePerk] = useState<boolean>(false)

  return (
    <div className="flex-col lg:flex-row lg:flex h-auto lg:h-[600px] bg-black relative">
      {toggleInfo ? (
        <NFTInfo toggle={(value) => setToggleInfo(value)} nft={nft} />
      ) : (
        <>
          <div className="lg:w-[600px] lg:h-[600px] overflow-hidden">
            <img className="h-full object-cover w-full" src={nft.cover} alt={nft.title} />
          </div>
          <WrapperInfo>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <section>
                <span className="font-bold text-6.5 lg:text-9 not-italic uppercase leading-11 font-sans text-rust">
                  {nft.title}
                </span>
                <Stack spacing={2} direction="row">
                  <span className="font-bold text-6.5 lg:text-9 not-italic uppercase leading-11 font-sans text-white">
                    {nft.subtitle}
                  </span>
                  <span className="font-bold text-6.5 lg:text-9 not-italic uppercase leading-11 font-sans text-white">
                    #{nft.id}
                  </span>
                </Stack>
              </section>
              <NFTTag nft={nft} />
            </Box>

            <NFTInfoContent>
              {nft.introduction.map((j, indexJ: number) => (
                <section key={indexJ}>
                  <NFTInfoIntroductionTitle>{j.key}</NFTInfoIntroductionTitle>
                  <NFTInfoIntroductionContent>{j.value}</NFTInfoIntroductionContent>
                </section>
              ))}
            </NFTInfoContent>

            <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
              <NFTStar nft={nft} toggle={(value) => setTogglePerk(value)} />
              <NFTUpgrade toggle={(value) => setToggleInfo(value)} nft={nft} />
            </Stack>
          </WrapperInfo>
        </>
      )}
      <NFTPerk visible={togglePerk} toggle={(value) => setTogglePerk(value)} />
    </div>
  )
}

export default NFTItem
