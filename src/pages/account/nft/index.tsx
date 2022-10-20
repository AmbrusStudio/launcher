import { Stack } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useUpdate } from 'ahooks'
import { useMemo, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { AccountTitleWithAccountInfo } from '../../../components/Account'
import { AccountCenterPageLayout } from '../../../components/Layout'
import { WalletButton } from '../../../components/Layout/WalletButton'
import MobileWrap from '../../../components/NFT/MobileWrap'
import NFTItem from '../../../components/NFT/NFTItem'
import Perk from '../../../components/NFT/Perk'
import PerkModal from '../../../components/NFT/PerkModal'
import {
  ADDRESS_E4C_Ranger_Gold_Edition,
  ADDRESS_E4C_Ranger_Rangers_Edition,
  ADDRESS_E4CRanger_Gold_Holder,
  ADDRESS_E4CRanger_Rangers_Holder,
} from '../../../contracts'
import { useWeb3Modal } from '../../../hooks'
import { useERC721ListState } from '../../../hooks/useERC721List'

function AccountNFT() {
  const { account, active } = useEthers()
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()
  const isMd = useMediaQuery({ query: '(min-width: 768px)' })
  const update = useUpdate()

  const { nfts: nftsGold, loading: loadingGold } = useERC721ListState({
    holderAddress: ADDRESS_E4CRanger_Gold_Holder,
    tokenAddress: ADDRESS_E4C_Ranger_Gold_Edition,
  })
  const { nfts: nftsRangers, loading: loadingRangers } = useERC721ListState({
    holderAddress: ADDRESS_E4CRanger_Rangers_Holder,
    tokenAddress: ADDRESS_E4C_Ranger_Rangers_Edition,
  })

  const nfts = useMemo(() => [...nftsGold, ...nftsRangers], [nftsGold, nftsRangers])
  const loading = useMemo(() => loadingGold && loadingRangers, [loadingGold, loadingRangers])

  console.log('nfts', nfts)

  const [visiblePerk, setVisiblePerk] = useState<boolean>(false)
  const [visiblePerkModal, setVisiblePerkModal] = useState<boolean>(false)

  return (
    <AccountCenterPageLayout>
      <AccountTitleWithAccountInfo title="My" subtitle="NFTs" />
      <div className="mt-6">
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
        ) : account && active && !loading && !nfts.length ? (
          <div className="text-white">No Data...</div>
        ) : (
          <>
            {isMd ? (
              <Stack spacing={3}>
                {nfts.map((nft) => (
                  <NFTItem nft={nft} key={`${nft.address}_${nft.tokenId}`} tokenId={nft.tokenId} update={update} />
                ))}
              </Stack>
            ) : (
              <MobileWrap nfts={nfts} update={update} />
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
