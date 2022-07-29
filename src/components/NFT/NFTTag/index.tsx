import styled from '@emotion/styled'
import { FC } from 'react'

import Add from '../../../components/Icon/Add'
import { NFT, NFTTagState } from '../../../types'

const Wrapper = styled.div<{ state: NFTTagState }>`
  width: 140px;
  height: 58px;
  padding: 12px;
  background: ${(p) =>
    p.state === NFTTagState.Cold
      ? '#ffb600'
      : p.state === NFTTagState.ColdAdd
      ? 'linear-gradient(90deg, #F0B316 0%, #EB456D 100%)'
      : p.state === NFTTagState.Ultimate
      ? 'linear-gradient(90deg, #5C5C5C 0%, #484848 100%)'
      : '#fff'};
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface NFTTagProps {
  nft: NFT
}

const NFTTag: FC<NFTTagProps> = ({ nft }) => {
  return (
    <Wrapper state={nft.tagState}>
      <span>{nft.tag}</span>
      {nft.tagState === NFTTagState.ColdAdd ? (
        <Add
          sx={{
            fontSize: '12px',
          }}
        />
      ) : (
        <span>&nbsp;&nbsp;</span>
      )}
    </Wrapper>
  )
}

export default NFTTag
