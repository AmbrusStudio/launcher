import 'swiper/css'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { useEthers } from '@usedapp/core'
import { useCallback, useMemo, useState } from 'react'

import { PageLayout } from '../../../components/Layout'
import NFTItem from '../../../components/NFT/NFTItem'
import NFTModal from '../../../components/NFT/NFTModal'
import NFTStar from '../../../components/NFT/NFTStar'
import NFTUpgrade from '../../../components/NFT/NFTUpgrade'
import SwiperToggle from '../../../components/NFT/SwiperToggle'
import { ADDRESS_ASR, ADDRESS_E4C_Ranger } from '../../../contracts'
import { NFT_DATA } from '../../../data'
import { useE4CRangerUnstake, useERC721SafeTransferFrom, useUpgraded } from '../../../hooks/useE4CRanger'
import { useTokenId } from '../../../hooks/useTokenId'
import { NFTE4CRanger } from '../../../types'
import { nftsForOwner } from '../../../utils'

const Actions = styled(Stack)`
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`

function AccountNFT() {
  const { account } = useEthers()
  const tokenId = useTokenId()
  const upgraded = useUpgraded(ADDRESS_E4C_Ranger, tokenId)
  console.log('upgraded', upgraded)

  const { state: stateSafeTransferFrom, send: safeTransferFrom } = useERC721SafeTransferFrom(ADDRESS_ASR)
  const { state: stateUnstake, send: unstake } = useE4CRangerUnstake(ADDRESS_E4C_Ranger)

  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const currentNFT_DATA = useMemo(() => NFT_DATA[currentIndex], [currentIndex])
  // owner nfts
  const nfts = useMemo<NFTE4CRanger[]>(() => nftsForOwner(tokenId, upgraded), [tokenId, upgraded])

  const onStake = useCallback(
    (tokenId: string) => {
      safeTransferFrom(account, ADDRESS_E4C_Ranger, tokenId)
    },
    [account, safeTransferFrom]
  )

  const onUnstake = useCallback(
    (tokenId: string) => {
      unstake(tokenId)
    },
    [unstake]
  )

  console.log('nfts', nfts)

  return (
    <PageLayout>
      <div className="my-0 mx-auto py-23 lg:py-32.5 max-w-[1140px] font-sans">
        <h1 className="font-bold text-8 sm:text-16 text-white not-italic uppercase leading-[39px] sm:leading-19.5 px-6 xl:px-2.5 ">
          MY<span className="py-0 px-1 text-rust">NFTS</span>
        </h1>

        <div className="hidden lg:block px-6 xl:px-2.5 my-6 sm:my-9">
          {nfts.length ? (
            <Stack spacing={3}>
              {nfts.map((nft, index) => (
                <NFTItem
                  nft={nft}
                  key={index}
                  tokenId={nft.tokenId}
                  stake={(value) => onStake(value)}
                  unstake={(value) => onUnstake(value)}
                />
              ))}
            </Stack>
          ) : (
            <span>No Data</span>
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

          <NFTModal visible={visibleModal} toggle={setVisibleModal} nft={NFT_DATA[1]} title="Stake to Upgrade" />
        </div>
      </div>
    </PageLayout>
  )
}

export default AccountNFT
