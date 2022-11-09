import { Stack } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useUpdate } from 'ahooks'
import { useState } from 'react'
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
  const { account, active } = useEthers()
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()

  const isMd = useMediaQuery({ query: '(min-width: 768px)' })
  const update = useUpdate()

  const { collections, loading } = useUserStakeCollections()
  collections.length && console.log('collections', collections)

  const [visiblePerk, setVisiblePerk] = useState<boolean>(false)
  const [visiblePerkModal, setVisiblePerkModal] = useState<boolean>(false)

  return (
    <AccountCenterPageLayout title="My" subtitle="NFTs">
      {!(account && active) ? (
        <WalletButton
          connected={!!(account && active)}
          chainIdMismatch={chainIdMismatch}
          onConnectClick={() => connect()}
          onSwitchNetworkClick={switchNetwork}
        >
          {shortenIfAddress(account)}
        </WalletButton>
      ) : account && active && loading ? (
        <div className="text-center py-6">
          <CircularProgress
            sx={{
              color: 'white',
            }}
          />
        </div>
      ) : account && active && !loading && !collections.length ? (
        <div className="text-white">No Data...</div>
      ) : (
        <>
          {isMd ? (
            <Stack spacing={3}>
              {collections.map((nft) => (
                <NFTItem nft={nft} key={`${nft.address}_${nft.tokenId}`} tokenId={nft.tokenId} update={update} />
              ))}
            </Stack>
          ) : (
            <MobileWrap nfts={collections} update={update} />
          )}
        </>
      )}

      {isMd ? (
        <Perk visible={visiblePerk} close={(value) => setVisiblePerk(value)} />
      ) : (
        <PerkModal visible={visiblePerkModal} close={() => setVisiblePerkModal(false)} />
      )}
    </AccountCenterPageLayout>
  )
}

export default AccountNFT
