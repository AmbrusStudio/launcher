import classNames from 'classnames'
import { FC } from 'react'

import { NFTEdition, TraitEdition } from '../../../types'
import Add from '../../Icon/Add'
import { EditionBackground } from '../../Trait/Edition'

interface NFTTagProps {
  readonly content: NFTEdition
  readonly edition?: TraitEdition
}

const NFTTag: FC<NFTTagProps> = ({ content, edition }) => {
  return (
    <div
      className={classNames(
        'max-w-[100px] lg:max-w[140px] p-2 lg:p-3 text-xs lg:text-sm leading-[15px] lg:leading-[17px] flex items-center justify-between font-bold text-white not-italic uppercase',
        {
          'bg-[#b4b4b4]': !edition,
        },
        EditionBackground(edition)
      )}
    >
      <span className="break-words">{content}</span>
      {edition === TraitEdition.ColdPlus || edition === TraitEdition.RangersPlus ? (
        <Add
          sx={{
            fontSize: '12px',
          }}
        />
      ) : (
        <span>&nbsp;&nbsp;</span>
      )}
    </div>
  )
}

export default NFTTag
