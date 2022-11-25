import { Stack } from '@mui/material'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useSize } from 'ahooks'
import { useMemo, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { AccountCenterPageLayout } from '../../../components/Layout'
import { WalletButton } from '../../../components/Layout/WalletButton'
import MobileWrap from '../../../components/NFT/MobileWrap'
import NFTItem from '../../../components/NFT/NFTItem'
import Perk from '../../../components/NFT/Perk'
import PerkModal from '../../../components/NFT/PerkModal'
import { useWeb3Modal } from '../../../hooks'
import { useUserStakeCollections } from '../../../hooks/useUserStakeCollections'

function AccountNFT() {
  const wrapperRef = useRef(null)
  const size = useSize(wrapperRef)
  const { account, active } = useEthers()
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()

  const isMd = useMediaQuery({ query: '(min-width: 768px)' })

  const { collections } = useUserStakeCollections()
  collections.length && console.log('useUserStakeCollections', collections)

  const [visiblePerk, setVisiblePerk] = useState<boolean>(false)
  const [visiblePerkModal, setVisiblePerkModal] = useState<boolean>(false)

  const itemHeight = useMemo(() => (size?.width ? size.width * 0.535 : 0), [size])

  return (
    <AccountCenterPageLayout title="My" subtitle="NFTs" className="pl-0 pr-0">
      <div ref={wrapperRef}>
        {!(account && active) ? (
          <div className="px-6 lg:px-[inherit]">
            <WalletButton
              connected={!!(account && active)}
              chainIdMismatch={chainIdMismatch}
              onConnectClick={() => connect()}
              onSwitchNetworkClick={switchNetwork}
            >
              {shortenIfAddress(account)}
            </WalletButton>
          </div>
        ) : account && active && !collections.length ? (
          <div className="text-white px-6 lg:px-[inherit]">No Data...</div>
        ) : (
          <>
            {isMd ? (
              <Stack spacing={3}>
                {collections.map((nft) => (
                  <div key={`${nft.address}_${nft.tokenId}`} style={{ height: `${itemHeight}px` }}>
                    <NFTItem nft={nft} tokenId={nft.tokenId} />
                  </div>
                ))}
              </Stack>
            ) : (
              <MobileWrap nfts={collections} />
            )}
          </>
        )}
      </div>
      {isMd ? (
        <Perk visible={visiblePerk} close={(value) => setVisiblePerk(value)} />
      ) : (
        <PerkModal visible={visiblePerkModal} close={() => setVisiblePerkModal(false)} />
      )}
    </AccountCenterPageLayout>
  )
}

export default AccountNFT
