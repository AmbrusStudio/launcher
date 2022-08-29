import styled from '@emotion/styled'
import { FC } from 'react'

import { NFT, NFTUpgradeState } from '../../../types'

const NFTInfoButton = styled.button<{ state: NFTUpgradeState }>`
  padding: 0 20px;
  background: ${(p) =>
    p.state === NFTUpgradeState.Upgrade || p.state === NFTUpgradeState.CheckUpgradingStatus ? '#ff4125' : '#A0A4B0'};
  font-family: 'Montserrat', sans-serif;
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

interface NFTUpgradeProps {
  readonly nft: NFT
  toggle: (value: boolean) => void
}

const NFTUpgrade: FC<NFTUpgradeProps> = ({ nft, toggle }) => {
  return (
    <>
      {nft.upgrade === NFTUpgradeState.Upgrade ? (
        <NFTInfoButtonUpgrade onClick={() => toggle(true)} state={nft.upgrade}>
          Upgrade
        </NFTInfoButtonUpgrade>
      ) : nft.upgrade === NFTUpgradeState.CheckUpgradingStatus ? (
        <NFTInfoButtonUpgrade onClick={() => toggle(true)} state={nft.upgrade}>
          Check upgrading status
        </NFTInfoButtonUpgrade>
      ) : null}
    </>
  )
}

export default NFTUpgrade
