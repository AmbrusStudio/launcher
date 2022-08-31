import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC, useState } from 'react'

import Star from '../../../components/Icon/Star'
import { NFTE4CRanger } from '../../../types'
import NFTDetails from '../NFTDetails'
import NFTPerk from '../NFTPerk'
import StakeInfo from '../StakeInfo'
import StatusCheck from '../StatusCheck'

const WrapperInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

interface NFTItemProps {
  readonly nft: NFTE4CRanger
  readonly tokenId: string
  click?: (value: string) => void
  stake: (value: string) => void
  unstake: () => void
}

const NFTItem: FC<NFTItemProps> = ({ nft, tokenId, stake, unstake }) => {
  const [visibleInfo, setVisibleInfo] = useState<boolean>(false)
  const [visibleStatusCheck, setVisibleStatusCheck] = useState<boolean>(false)
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
              <button className="u-btn u-btn-primary max-w-[120px] relative !py-0" onClick={() => unstake()}>
                <Star sx={{ fontSize: '36px' }} />
              </button>
              {nft.staking ? (
                <button className="u-btn u-btn-primary" onClick={() => setVisibleStatusCheck(!visibleStatusCheck)}>
                  Status Check
                </button>
              ) : (
                <button className="u-btn u-btn-primary" onClick={() => setVisibleInfo(!visibleInfo)}>
                  Upgrade
                </button>
              )}
            </>
          )}
        </Stack>
      </WrapperInfo>
      <NFTPerk visible={togglePerk} toggle={(value) => setTogglePerk(value)} />
      {visibleInfo && <StakeInfo toggle={(value) => setVisibleInfo(value)} stake={() => stake(tokenId)} />}
      {visibleStatusCheck && (
        <StatusCheck nft={nft} toggle={(value) => setVisibleStatusCheck(value)} unstake={unstake} />
      )}
    </div>
  )
}

export default NFTItem
