import styled from '@emotion/styled'
import { FC } from 'react'

import { NFTEdition } from '../../../types'
import Add from '../../Icon/Add'

const Wrapper = styled.div<{ state: NFTEdition }>`
  background: ${(p) =>
    p.state === NFTEdition.GoldEdition
      ? '#ffb600'
      : p.state === NFTEdition.GoldPlusEdition
      ? 'linear-gradient(90deg, #F0B316 0%, #EB456D 100%)'
      : p.state === NFTEdition.RangersEdition
      ? '#7024C4'
      : p.state === NFTEdition.RangersPlusEdition
      ? 'linear-gradient(90deg, #7024C4 0%, #EB456D 100%)'
      : p.state === NFTEdition.UltimateEdition
      ? 'linear-gradient(90deg, #5C5C5C 0%, #484848 100%)'
      : '#a0a0a0'};
`

interface NFTTagProps {
  readonly content: NFTEdition
}

const NFTTag: FC<NFTTagProps> = ({ content }) => {
  return (
    <Wrapper
      state={content}
      className="max-w-[100px] lg:max-w[140px] p-2 lg:p-3 text-xs lg:text-sm leading-[15px] lg:leading-[17px] flex items-center justify-between font-bold text-white not-italic uppercase"
    >
      <span className="break-words">{content}</span>
      {content === NFTEdition.GoldPlusEdition || content === NFTEdition.RangersPlusEdition ? (
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
