import 'swiper/css'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useCallback, useMemo, useState } from 'react'

import { PageLayout } from '../../../components/Layout'
import { WalletButton } from '../../../components/Layout/WalletButton'
import NFTItem from '../../../components/NFT/NFTItem'
// import NFTModal from '../../../components/NFT/NFTModal'
import NFTStar from '../../../components/NFT/NFTStar'
import NFTUpgrade from '../../../components/NFT/NFTUpgrade'
import SwiperToggle from '../../../components/NFT/SwiperToggle'
import { NFT_DATA } from '../../../data'
import { useWeb3Modal } from '../../../hooks'
import { useERC721List } from '../../../hooks/useERC721List'

const Actions = styled(Stack)`
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`

function AccountNFT() {
  const { account, active } = useEthers()
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()

  const { nfts } = useERC721List()

  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const currentNFT_DATA = useMemo(() => NFT_DATA[currentIndex], [currentIndex])

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

        <div className="block lg:hidden">
          <div className="min-h-160px my-6">
            <SwiperToggle currentIndex={currentIndex} toggle={(value) => setCurrentIndex(value)} />
          </div>

          <div className="px-6 xl:px-2.5">{/* <NFTDetails nft={nfts[0]} tokenId={'1'} /> */}</div>

          <Actions sx={{ marginTop: 'auto' }} direction="row" spacing={1.5} className="fixed left-6 bottom-6 right-6">
            <NFTStar nft={currentNFT_DATA} toggle={(value) => console.log(value)} />
            <NFTUpgrade
              nft={currentNFT_DATA}
              toggle={(value) => {
                console.log(value)
                setVisibleModal(true)
              }}
            />
          </Actions>

          {/* <NFTModal visible={visibleModal} toggle={setVisibleModal} nft={nfts[0]} title="Stake to Upgrade" /> */}
        </div>
      </div>
    </PageLayout>
  )
}

export default AccountNFT
