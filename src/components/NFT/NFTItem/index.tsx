import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import { FC, useState } from 'react'

import { NFT } from '../../../types'
import NFTInfo from '../NFTInfo'
import NFTStar from '../NFTStar'
import NFTTag from '../NFTTag'
import NFTUpgrade from '../NFTUpgrade'

const Item = styled.div`
  display: flex;
  height: 600px;
  background: #000000;
  position: relative;
`
const NFTCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const WrapperInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const NFTInfoHeadText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-transform: uppercase;
`

const NFTInfoHeadTitle = styled(NFTInfoHeadText)`
  color: #ff4125;
`
const NFTInfoHeadSubtitle = styled(NFTInfoHeadText)`
  color: #ffffff;
`

const NFTInfoContent = styled.div`
  margin-top: 36px;
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
  nft: NFT
}

const NFTItem: FC<NFTItemProps> = ({ nft }) => {
  const [toggleInfo, setToggleInfo] = useState<boolean>(false)

  return (
    <Item>
      <Box
        sx={{
          width: '600px',
          height: '600px',
          overflow: 'hidden',
        }}
      >
        <NFTCover src={nft.cover} alt={nft.title} />
      </Box>
      <WrapperInfo>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <section>
            <NFTInfoHeadTitle>{nft.title}</NFTInfoHeadTitle>
            <Stack spacing={2} direction="row">
              <NFTInfoHeadSubtitle>{nft.subtitle}</NFTInfoHeadSubtitle>
              <NFTInfoHeadSubtitle>#{nft.id}</NFTInfoHeadSubtitle>
            </Stack>
          </section>
          <NFTTag nft={nft} />
        </Box>

        <NFTInfoContent>
          {nft.introduction.map((j, indexJ: number) => (
            <section key={indexJ}>
              <NFTInfoIntroductionTitle>{j.title}</NFTInfoIntroductionTitle>
              <NFTInfoIntroductionContent>{j.content}</NFTInfoIntroductionContent>
            </section>
          ))}
        </NFTInfoContent>

        <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
          <NFTStar nft={nft} />
          <NFTUpgrade toggle={(value) => setToggleInfo(value)} nft={nft} />
        </Stack>
      </WrapperInfo>

      {toggleInfo && <NFTInfo toggle={(value) => setToggleInfo(value)} upgradeInfo={nft.upgradeInfo} />}
    </Item>
  )
}

export default NFTItem
