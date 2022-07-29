import styled from '@emotion/styled'
import { FC } from 'react'

import { NFT, NFTUpgradeState } from '../../../types'

const NFTInfoButton = styled.button<{ state: NFTUpgradeState }>`
  padding: 0 20px;
  background: ${(p) =>
    p.state === NFTUpgradeState.Upgrade ? '#ff4125' : p.state === NFTUpgradeState.Upgrading ? '#A0A4B0' : '#ff4125'};
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  border: none;
  outline: none;
  width: 100%;
  min-height: 60px;
`

const NFTInfoButtonUpgrade = styled(NFTInfoButton)`
  font-size: 16px;
  line-height: 20px;
`

const NFTInfoButtonUpgradeDay = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-transform: uppercase;
  color: #ffffff;
  margin-left: 12px;
`

interface NFTUpgradeProps {
  nft: NFT
}

const NFTUpgrade: FC<NFTUpgradeProps> = ({ nft }) => {
  return (
    <>
      {nft.upgrade === NFTUpgradeState.Upgrade ? (
        <NFTInfoButtonUpgrade state={nft.upgrade}>Upgrade</NFTInfoButtonUpgrade>
      ) : nft.upgrade === NFTUpgradeState.Upgrading ? (
        <NFTInfoButtonUpgrade state={nft.upgrade}>
          <span>Upgrading...</span>
          <NFTInfoButtonUpgradeDay>(48 days left)</NFTInfoButtonUpgradeDay>
        </NFTInfoButtonUpgrade>
      ) : null}
    </>
  )
}

export default NFTUpgrade
