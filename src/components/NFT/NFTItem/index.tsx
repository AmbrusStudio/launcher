import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC, useState } from 'react'

import Star from '../../../components/Icon/Star'
import { NFTE4CRanger } from '../../../types'
import NFTDetails from '../NFTDetails'
import NFTPerk from '../NFTPerk'
import StakeInfo from '../StakeInfo'

const WrapperInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const NFTInfoButton = styled.button`
  padding: 0 20px;
  background: #ff4125;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
  width: 100%;
  min-height: 60px;
  cursor: pointer;
`

const NFTButtonUpgrade = styled(NFTInfoButton)`
  font-size: 16px;
  line-height: 20px;
`

const NFTButtonStar = styled(NFTInfoButton)`
  max-width: 120px;
  position: relative;
`

interface NFTItemProps {
  readonly nft: NFTE4CRanger
  readonly tokenId: string
  click?: (value: string) => void
  stake: (value: string) => void
  unstake: (value: string) => void
}

const NFTItem: FC<NFTItemProps> = ({ nft, tokenId, stake, unstake }) => {
  const [visibleInfo, setVisibleInfo] = useState<boolean>(false)
  const [togglePerk, setTogglePerk] = useState<boolean>(false)

  return (
    <div className="flex-col lg:flex-row lg:flex h-auto lg:h-[600px] bg-black relative">
      <div className="lg:w-[600px] lg:h-[600px] overflow-hidden">
        <img className="h-full object-cover w-full" src={nft.image} alt={nft.name} />
      </div>
      <WrapperInfo>
        <NFTDetails nft={nft} tokenId={tokenId} />

        <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
          {Number(tokenId) >= 16 && nft.upgraded === false && (
            <>
              <NFTButtonStar>
                <Star sx={{ fontSize: '36px' }} />
              </NFTButtonStar>
              <NFTButtonUpgrade onClick={() => setVisibleInfo(!visibleInfo)}>Upgrade</NFTButtonUpgrade>
            </>
          )}
        </Stack>
      </WrapperInfo>
      <NFTPerk visible={togglePerk} toggle={(value) => setTogglePerk(value)} />
      {visibleInfo && <StakeInfo toggle={(value) => setVisibleInfo(value)} stake={() => stake(tokenId)} />}
    </div>
  )
}

export default NFTItem
