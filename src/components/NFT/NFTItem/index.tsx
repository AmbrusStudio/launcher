import styled from '@emotion/styled'
import { Box, Stack } from '@mui/material'
import { FC } from 'react'

import Star from '../../../components/Icon/Star'
import { NFT } from '../../../types'
import NFTTag from '../NFTTag'

const Item = styled.div`
  display: flex;
  height: 600px;
  background: #000000;
`
const NFTCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const NFTInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const NFTInfoHead = styled.div`
  display: flex;
  justify-content: space-between;
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

const NFTInfoIntroduction = styled.section``
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

const NFTInfoButton = styled.button`
  padding: 0 20px;
  background: #ff4125;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
  width: 100%;
  min-height: 60px;
`
const NFTInfoButtonStar = styled(NFTInfoButton)`
  max-width: 120px;
  position: relative;
`
const NFTInfoButtonUpgrade = styled(NFTInfoButton)`
  font-size: 16px;
  line-height: 20px;
`
const NFTInfoButtonTag = styled.div`
  padding: 2px 6px;
  position: absolute;
  right: 8px;
  top: 0;
  transform: translateY(-50%);
  background: #ffffff;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  text-transform: uppercase;
  color: #ff4125;
`
const NFTInfoButtonTagNew = styled.div`
  position: absolute;
  right: 8px;
  top: 0;
  transform: translateY(-50%);
  background: #ffffff;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  text-transform: uppercase;
  color: #ff4125;
  overflow: hidden;
  display: flex;
`
const NFTInfoButtonTagNewText = styled.div`
  padding: 2px 6px;
  background: linear-gradient(112.63deg, #ec651a 0%, #e99e58 91.57%);
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
`
const NFTInfoButtonTagNewNumber = styled.div`
  padding: 2px 6px;
  background: #ffffff;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  text-transform: uppercase;
  color: #ff4125;
`

interface NFTItemProps {
  nft: NFT
}

const NFTItem: FC<NFTItemProps> = ({ nft }) => {
  return (
    <Item>
      <Box
        sx={{
          width: '600px',
          height: '600px',
          overflow: 'hidden',
        }}
      >
        <NFTCover src="https://i.imgur.com/n29yuRi.jpg" alt="NFT" />
      </Box>
      <NFTInfo>
        <NFTInfoHead>
          <section>
            <NFTInfoHeadTitle>{nft.title}</NFTInfoHeadTitle>
            <Stack spacing={2} direction="row">
              <NFTInfoHeadSubtitle>{nft.subtitle}</NFTInfoHeadSubtitle>
              <NFTInfoHeadSubtitle>#{nft.id}</NFTInfoHeadSubtitle>
            </Stack>
          </section>
          <NFTTag nft={nft} />
        </NFTInfoHead>

        <NFTInfoContent>
          {nft.introduction.map((j, indexJ: number) => (
            <NFTInfoIntroduction key={indexJ}>
              <NFTInfoIntroductionTitle>{j.title}</NFTInfoIntroductionTitle>
              <NFTInfoIntroductionContent>{j.content}</NFTInfoIntroductionContent>
            </NFTInfoIntroduction>
          ))}
        </NFTInfoContent>

        <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
          <NFTInfoButtonStar>
            <Star sx={{ fontSize: '36px' }} />
            {/* <NFTInfoButtonTag>12</NFTInfoButtonTag> */}
            <NFTInfoButtonTagNew>
              <NFTInfoButtonTagNewText>NEW</NFTInfoButtonTagNewText>
              <NFTInfoButtonTagNewNumber>5</NFTInfoButtonTagNewNumber>
            </NFTInfoButtonTagNew>
          </NFTInfoButtonStar>
          <NFTInfoButtonUpgrade>Upgrade</NFTInfoButtonUpgrade>
        </Stack>
      </NFTInfo>
    </Item>
  )
}

export default NFTItem
