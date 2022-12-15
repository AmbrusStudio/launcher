import styled from '@emotion/styled'
import classNames from 'classnames'
import { FC, useMemo } from 'react'

import { BlindBoxTrait } from '../../../constants'
import { NFTE4CRanger, Trait, TraitEdition } from '../../../types'
import { getTraitEdition, isPureGold, traitNameOnTop } from '../../../utils'
import { BlindBoxMode } from '../../../utils/bindbox'
import TokenLink from '../../TokenLink'
import { EditionColor, EditionPureGoldColor } from '../../Trait/Edition'

const NFTInfoContent = styled.div`
  margin: 36px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  overflow: auto;
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
  padding: 0;
  margin: 4px 0 0 0;
`

interface NFTDetailsProps {
  readonly nft: NFTE4CRanger
}

const NFTDetails: FC<NFTDetailsProps> = ({ nft }) => {
  const edition = useMemo<TraitEdition | undefined>(() => getTraitEdition(nft), [nft])

  return (
    <>
      <NFTInfoContent>
        {traitNameOnTop(nft.trait).map((trait, index) => (
          <section key={index}>
            <NFTInfoIntroductionTitle>{trait.trait_type}</NFTInfoIntroductionTitle>
            <NFTInfoIntroductionContent
              className={classNames(
                'inline-block',
                {
                  'text-white': trait.trait_type !== Trait.Edition || BlindBoxMode(nft.trait),
                },
                trait.trait_type === Trait.Edition && !BlindBoxMode(nft.trait) ? EditionColor(edition) : undefined,
                trait.trait_type !== Trait.Edition && !BlindBoxMode(nft.trait)
                  ? EditionPureGoldColor(isPureGold(trait.value))
                  : undefined
              )}
            >
              {!BlindBoxMode(nft.trait) || BlindBoxTrait.includes(trait.trait_type) ? trait.value : 'unknown'}
            </NFTInfoIntroductionContent>
          </section>
        ))}
      </NFTInfoContent>

      <div className="mb-9">
        <TokenLink address={nft.address} status={nft.status} />
      </div>
    </>
  )
}

export default NFTDetails
