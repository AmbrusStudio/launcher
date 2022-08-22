import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { FC, useState } from 'react'

import { NFT } from '../../../types'
import NFTInfo from '../NFTInfo'
import NFTItemProperty from '../NFTItemProperty'
import NFTPerk from '../NFTPerk'
import NFTStar from '../NFTStar'
import NFTUpgrade from '../NFTUpgrade'

const WrapperInfo = styled.div`
  color: #fff;
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

interface NFTItemProps {
  readonly nft: NFT
}

const NFTItem: FC<NFTItemProps> = ({ nft }) => {
  const [toggleInfo, setToggleInfo] = useState<boolean>(false)
  const [togglePerk, setTogglePerk] = useState<boolean>(false)

  return (
    <div className="flex-col lg:flex-row lg:flex h-auto lg:h-[600px] bg-black relative">
      {toggleInfo ? (
        <NFTInfo toggle={(value) => setToggleInfo(value)} nft={nft} />
      ) : (
        <>
          <div className="lg:w-[600px] lg:h-[600px] overflow-hidden">
            <img className="h-full object-cover w-full" src={nft.cover} alt={nft.title} />
          </div>
          <WrapperInfo>
            <NFTItemProperty nft={nft} />

            <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
              <NFTStar nft={nft} toggle={(value) => setTogglePerk(value)} />
              <NFTUpgrade toggle={(value) => setToggleInfo(value)} nft={nft} />
            </Stack>
          </WrapperInfo>
        </>
      )}
      <NFTPerk visible={togglePerk} toggle={(value) => setTogglePerk(value)} />
    </div>
  )
}

export default NFTItem
