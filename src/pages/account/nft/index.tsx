import { Stack } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useCallback } from 'react'

import { PageLayout } from '../../../components/Layout'
import { WalletButton } from '../../../components/Layout/WalletButton'
import Head from '../../../components/NFT/Head'
import MobileWrap from '../../../components/NFT/MobileWrap'
import NFTItem from '../../../components/NFT/NFTItem'
import { useWeb3Modal } from '../../../hooks'
import { useERC721List } from '../../../hooks/useERC721List'

function AccountNFT() {
  const { account, active } = useEthers()
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()

  const { nfts, loading } = useERC721List()

  // Handle wallet switchNetwork
  const handleWalletSwitchNetwork = useCallback(async () => {
    if (chainIdMismatch) await switchNetwork()
  }, [chainIdMismatch, switchNetwork])

  return (
    <PageLayout>
      <div className="my-0 mx-auto py-23 lg:py-32.5 max-w-[1140px] font-sans">
        <Head />

        {!(account && active) ? (
          <div className="px-6 xl:px-2.5 my-6 sm:my-9">
            <WalletButton
              connected={!!(account && active)}
              chainIdMismatch={chainIdMismatch}
              onConnectClick={() => connect()}
              onSwitchNetworkClick={handleWalletSwitchNetwork}
            >
              {shortenIfAddress(account)}
            </WalletButton>
          </div>
        ) : account && active && loading ? (
          <div className="text-center py-6">
            <CircularProgress
              sx={{
                color: 'white',
              }}
            />
          </div>
        ) : account && active && !loading && !nfts.length ? (
          <div className="px-6 xl:px-2.5 my-6 sm:my-9 text-white">No Data...</div>
        ) : account && active && !loading && !!nfts.length ? (
          <>
            <div className="hidden md:block px-6 xl:px-2.5 my-6 sm:my-9">
              <Stack spacing={3}>
                {nfts.map((nft) => (
                  <NFTItem nft={nft} key={nft.tokenId} tokenId={nft.tokenId} />
                ))}
              </Stack>
            </div>
            <div className="block md:hidden">
              <MobileWrap nfts={nfts} />
            </div>
          </>
        ) : null}
      </div>
    </PageLayout>
  )
}

export default AccountNFT
