import styled from '@emotion/styled'
import { FC } from 'react'

import { NFTEdition } from '../../../types'

const Wrapper = styled.div<{ state: NFTEdition }>`
  background: ${(p) =>
    p.state === NFTEdition.GoldEdition
      ? '#ffb600'
      : // : p.state === NFTEdition.GoldEdition
      // ? 'linear-gradient(90deg, #F0B316 0%, #EB456D 100%)'
      p.state === NFTEdition.UltimateEdition
      ? 'linear-gradient(90deg, #5C5C5C 0%, #484848 100%)'
      : '#fff'};
`

interface NFTTagProps {
  readonly content: NFTEdition
}

const NFTTag: FC<NFTTagProps> = ({ content }) => {
  return (
    <Wrapper
      state={content}
      className="w-25 xl:w-35 h-10 xl:h-[58px] p-[5px] xl:p-3 text-xs xl:text-sm leading-[15px] xl:leading-[17px] flex items-center justify-between font-bold text-white not-italic uppercase"
    >
      <span>{content}</span>
      <span>&nbsp;&nbsp;</span>
      {/* <Add
        sx={{
          fontSize: '12px',
        }}
      /> */}
    </Wrapper>
  )
}

export default NFTTag
