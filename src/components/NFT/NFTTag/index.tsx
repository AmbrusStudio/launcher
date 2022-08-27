import styled from '@emotion/styled'
import { FC } from 'react'

import Add from '../../../components/Icon/Add'
import { NFT, NFTTagState } from '../../../types'

const Wrapper = styled.div<{ state: NFTTagState }>`
  background: ${(p) =>
    p.state === NFTTagState.Cold
      ? '#ffb600'
      : p.state === NFTTagState.ColdAdd
      ? 'linear-gradient(90deg, #F0B316 0%, #EB456D 100%)'
      : p.state === NFTTagState.Ultimate
      ? 'linear-gradient(90deg, #5C5C5C 0%, #484848 100%)'
      : '#fff'};
`

interface NFTTagProps {
  readonly nft: NFT
}

const NFTTag: FC<NFTTagProps> = ({ nft }) => {
  return (
    <Wrapper
      state={nft.tagState}
      className="w-25 xl:w-35 h-10 xl:h-[58px] p-[5px] xl:p-3 text-xs xl:text-sm leading-[15px] xl:leading-[17px] flex items-center justify-between font-bold text-white not-italic uppercase"
    >
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
