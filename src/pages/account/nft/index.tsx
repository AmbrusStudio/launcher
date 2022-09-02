import { Stack } from '@mui/material'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useCallback } from 'react'

import { PageLayout } from '../../../components/Layout'
import { WalletButton } from '../../../components/Layout/WalletButton'
import MobileWrap from '../../../components/NFT/MobileWrap'
import NFTItem from '../../../components/NFT/NFTItem'
import { useWeb3Modal } from '../../../hooks'
import { useERC721List } from '../../../hooks/useERC721List'

function AccountNFT() {
  const { account, active } = useEthers()
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()

  const { nfts } = useERC721List()

  // Handle wallet switchNetwork
  const handleWalletSwitchNetwork = useCallback(async () => {
    if (chainIdMismatch) await switchNetwork()
  }, [chainIdMismatch, switchNetwork])

  return (
    <PageLayout>
      <div className="my-0 mx-auto py-23 lg:py-32.5 max-w-[1140px] font-sans">
        <h1 className="font-bold text-8 sm:text-16 text-white not-italic uppercase leading-[39px] sm:leading-19.5 px-6 xl:px-2.5 ">
          MY<span className="py-0 px-1 text-rust">NFTS</span>
        </h1>

        {!(account && active) && (
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
        )}

        {!!(account && active) && !nfts.length && (
          <div className="px-6 xl:px-2.5 my-6 sm:my-9 text-white">No Data...</div>
        )}

        <div className="hidden lg:block px-6 xl:px-2.5 my-6 sm:my-9">
          {!!nfts.length && (
            <Stack spacing={3}>
              {nfts.map((nft) => (
                <NFTItem nft={nft} key={nft.tokenId} tokenId={nft.tokenId} />
              ))}
            </Stack>
          )}
        </div>

        <MobileWrap nfts={nfts} />
      </div>
    </PageLayout>
  )
}

export default AccountNFT
