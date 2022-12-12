import { Stack } from '@mui/material'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useSize } from 'ahooks'
import { useMemo, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import Earned from '../../../components/Earned'
import { AccountCenterPageLayout } from '../../../components/Layout'
import { WalletButton } from '../../../components/Layout/WalletButton'
import HiveItem from '../../../components/NFT/HiveItem'
import MobileWrap from '../../../components/NFT/MobileWrap'
import NFTItem from '../../../components/NFT/NFTItem'
import Perk from '../../../components/NFT/Perk'
import PerkModal from '../../../components/NFT/PerkModal'
import TabsStake, { TabPanelStake } from '../../../components/TabsStake'
import { useWeb3Modal } from '../../../hooks'
import { useCollectionsHiveStake } from '../../../hooks/useCollectionsHiveStake'
import { useUserStakeCollections } from '../../../hooks/useUserStakeCollections'

function AccountNFT() {
  const wrapperRef = useRef(null)
  const size = useSize(wrapperRef)
  const { account, active } = useEthers()
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()

  const isMd = useMediaQuery({ query: '(min-width: 768px)' })

  const { collections } = useUserStakeCollections()
  collections.length && console.log('useUserStakeCollections', collections)

  const { collections: collectionsHive } = useCollectionsHiveStake()
  collectionsHive.length && console.log('useCollectionsHiveStake', collectionsHive)

  const [visiblePerk, setVisiblePerk] = useState<boolean>(false)
  const [visiblePerkModal, setVisiblePerkModal] = useState<boolean>(false)

  const itemHeight = useMemo(() => (size?.width ? size.width * 0.535 : 0), [size])
  const [tabPanelStakeValue, setTabPanelStakeValue] = useState(1)

  return (
    <AccountCenterPageLayout title="My" subtitle="NFTs" className="pl-0 pr-0">
      <div className="flex justify-between">
        <TabsStake tabPanelStakeValue={tabPanelStakeValue} setTabPanelStakeValue={setTabPanelStakeValue} />
        <Earned />
      </div>

      <>
        {!(account && active) && (
          <div className="pt-6 lg:pt-[inherit]">
            <WalletButton
              connected={!!(account && active)}
              chainIdMismatch={chainIdMismatch}
              onConnectClick={() => connect()}
              onSwitchNetworkClick={switchNetwork}
            >
              {shortenIfAddress(account)}
            </WalletButton>
          </div>
        )}
      </>

      <div ref={wrapperRef} className="mt-6">
        <TabPanelStake value={tabPanelStakeValue} index={0}>
          {!collections.length ? (
            <div className="text-white py-6 lg:py-[inherit]">No Data...</div>
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
        </TabPanelStake>

        <TabPanelStake value={tabPanelStakeValue} index={1}>
          {!collectionsHive.length ? (
            <div className="text-white py-6 lg:py-[inherit]">No Data...</div>
          ) : (
            <>
              {isMd ? (
                <Stack spacing={3}>
                  {collectionsHive.map((nft) => (
                    <div key={`${nft.address}_${nft.tokenId}`} style={{ height: `${itemHeight}px` }}>
                      <HiveItem nft={nft} tokenId={nft.tokenId} />
                    </div>
                  ))}
                </Stack>
              ) : (
                <MobileWrap nfts={collectionsHive} />
              )}
            </>
          )}
        </TabPanelStake>
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
