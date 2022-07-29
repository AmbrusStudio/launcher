import styled from '@emotion/styled'
import { FC } from 'react'

import Star from '../../../components/Icon/Star'
import { NFT, NFTStarState } from '../../../types'

const NFTInfoButton = styled.button<{ state: NFTStarState }>`
  padding: 0 20px;
  background: ${(p) =>
    p.state === NFTStarState.Default || p.state === NFTStarState.New
      ? '#ff4125'
      : p.state === NFTStarState.Ultimate
      ? '#A0A4B0'
      : '#ff4125'};
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
interface NFTStarProps {
  nft: NFT
}

const NFTStar: FC<NFTStarProps> = ({ nft }) => {
  return (
    <NFTInfoButtonStar state={nft.starState}>
      <Star sx={{ fontSize: '36px' }} />
      {nft.starState === NFTStarState.Default ? (
        <NFTInfoButtonTag>{nft.star}</NFTInfoButtonTag>
      ) : nft.starState === NFTStarState.New ? (
        <NFTInfoButtonTagNew>
          <NFTInfoButtonTagNewText>NEW</NFTInfoButtonTagNewText>
          <NFTInfoButtonTagNewNumber>{nft.star}</NFTInfoButtonTagNewNumber>
        </NFTInfoButtonTagNew>
      ) : null}
    </NFTInfoButtonStar>
  )
}

export default NFTStar
