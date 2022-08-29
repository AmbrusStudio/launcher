import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC, useState } from 'react'

import { NFT_DATA } from '../../../data'
import { Metadata } from '../../../types'
import NFTDetails from '../NFTDetails'
import NFTInfo from '../NFTInfo'
import NFTPerk from '../NFTPerk'

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
  /* text-transform: uppercase; */
  color: #ffffff;
  border: none;
  outline: none;
  width: 100%;
  min-height: 60px;
  cursor: pointer;
`

const NFTInfoButtonUpgrade = styled(NFTInfoButton)`
  font-size: 16px;
  line-height: 20px;
`

interface NFTItemProps {
  readonly nft: Metadata
  readonly tokenId: number
  click?: (value: string) => void
  safeTransferFrom: (value: string) => void
  unstake: (value: string) => void
}

const NFTItem: FC<NFTItemProps> = ({ nft, tokenId, safeTransferFrom, unstake }) => {
  const [toggleInfo, setToggleInfo] = useState<boolean>(false)
  const [togglePerk, setTogglePerk] = useState<boolean>(false)

  return (
    <div className="flex-col lg:flex-row lg:flex h-auto lg:h-[600px] bg-black relative">
      {toggleInfo ? (
        <NFTInfo toggle={(value) => setToggleInfo(value)} nft={NFT_DATA[0]} />
      ) : (
        <>
          <div className="lg:w-[600px] lg:h-[600px] overflow-hidden">
            <img className="h-full object-cover w-full" src={nft.image} alt={nft.name} />
          </div>
          <WrapperInfo>
            <NFTDetails nft={nft} tokenId={tokenId} />

            <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
              {tokenId >= 16 && (
                <>
                  <NFTInfoButtonUpgrade onClick={() => safeTransferFrom(String(tokenId))}>Stake</NFTInfoButtonUpgrade>
                  <NFTInfoButtonUpgrade onClick={() => unstake(String(tokenId))}>UnStake</NFTInfoButtonUpgrade>
                </>
              )}
            </Stack>
          </WrapperInfo>
        </>
      )}
      <NFTPerk visible={togglePerk} toggle={(value) => setTogglePerk(value)} />
    </div>
  )
}

export default NFTItem
