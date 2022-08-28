import 'swiper/css'

import styled from '@emotion/styled'
import { Stack } from '@mui/material'
import { useEthers } from '@usedapp/core'
import { useCallback, useMemo, useState } from 'react'

import { PageLayout } from '../../../components/Layout'
import NFTItem from '../../../components/NFT/NFTItem'
import NFTItemProperty from '../../../components/NFT/NFTItemProperty'
import NFTModal from '../../../components/NFT/NFTModal'
import NFTStar from '../../../components/NFT/NFTStar'
import NFTUpgrade from '../../../components/NFT/NFTUpgrade'
import SwiperToggle from '../../../components/NFT/SwiperToggle'
import { ADDRESS_ASR, ADDRESS_E4C_Ranger } from '../../../contracts'
import { NFT_DATA } from '../../../data'
import { useE4CRangerUnstake, useERC721SafeTransferFrom } from '../../../hooks/useE4CRangerHolder'

const Actions = styled(Stack)`
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`

function AccountNFT() {
  // const [ownerTokenId, setOwnerTokenId] = useState<string[]>(['1', '16'])
  const { account } = useEthers()

  // const infoASR = useERC721BalanceOf(ADDRESS_ASR, account)
  // const ASRLogs = useERC721Logs(ADDRESS_ASR)
  // const result = useERC721OwnerOfs(ADDRESS_ASR, ['1', '11', '16'])
  const { state: stateSafeTransferFrom, send: safeTransferFrom } = useERC721SafeTransferFrom(ADDRESS_ASR)
  const { state: stateUnstake, send: unstake } = useE4CRangerUnstake(ADDRESS_E4C_Ranger)

  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const currentNFT_DATA = useMemo(() => NFT_DATA[currentIndex], [currentIndex])

  // console.log('infoASR', infoASR)
  // console.log('ASRLogs', ASRLogs)

  const onSafeTransferFrom = useCallback(() => {
    safeTransferFrom(account, ADDRESS_E4C_Ranger, '16')
  }, [account, safeTransferFrom])

  const onUnstake = useCallback(() => {
    unstake('16')
  }, [unstake])

  // useEffect(() => {
  //   const list: string[] = []

  //   ASRLogs?.forEach((item) => {
  //     if (account && item.data.to === getAddress(account)) {
  //       console.log('tokenId', item.data.tokenId.toString())
  //       list.push(item.data.tokenId.toString())
  //     }
  //   })

  //   setOwnerTokenId(list)
  // }, [ASRLogs, account])

  return (
    <PageLayout>
      <div className="my-0 mx-auto py-23 lg:py-32.5 max-w-[1140px] font-sans">
        <h1 className="font-bold text-8 sm:text-16 text-white not-italic uppercase leading-[39px] sm:leading-19.5 px-6 xl:px-2.5 ">
          MY<span className="py-0 px-1 text-rust">NFTS</span>
        </h1>

        <div className="hidden lg:block px-6 xl:px-2.5 my-6 sm:my-9">
          <Stack spacing={3}>
            {NFT_DATA.map((nft, index) => (
              <NFTItem
                nft={nft}
                key={index}
                click={(value) => {
                  if (value === 'stake') {
                    onSafeTransferFrom()
                  } else if (value === 'unstake') {
                    onUnstake()
                  }
                }}
              />
            ))}
          </Stack>
        </div>

        <div className="block lg:hidden">
          <div className="min-h-160px my-6">
            <SwiperToggle currentIndex={currentIndex} toggle={(value) => setCurrentIndex(value)} />
          </div>

          <div className="px-6 xl:px-2.5">
            <NFTItemProperty nft={currentNFT_DATA} />
          </div>

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
