import styled from '@emotion/styled'
import { Stack } from '@mui/material'

import NFTItem from '../../../components/NFT/NFTItem'
import { NFTs } from '../../../data'

const Wrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  max-width: 1140px;
  width: 1140px;
  padding: 0 10px;
  margin: 0 auto;
`
const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 78px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 0 36px 0;
  span {
    color: #ff4125;
    padding: 0 6px;
  }
`

function AccountNFT() {
  return (
    <Wrapper>
      <Title>
        MY<span>NFTS</span>
      </Title>

      <Stack spacing={3}>
        {NFTs.map((nft, index) => (
          <NFTItem nft={nft} key={index} />
        ))}
      </Stack>
    </Wrapper>
  )
}

export default AccountNFT
