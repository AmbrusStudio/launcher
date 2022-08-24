import 'swiper/css'

import styled from '@emotion/styled'
import { formatEther } from '@ethersproject/units'
import { Stack } from '@mui/material'
import { useEtherBalance, useEthers, useSendTransaction } from '@usedapp/core'
import { utils } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import { useMemo, useState } from 'react'

import { PageLayout } from '../../../components/Layout'
import NFTItem from '../../../components/NFT/NFTItem'
import NFTItemProperty from '../../../components/NFT/NFTItemProperty'
import NFTModal from '../../../components/NFT/NFTModal'
import NFTStar from '../../../components/NFT/NFTStar'
import NFTUpgrade from '../../../components/NFT/NFTUpgrade'
import SwiperToggle from '../../../components/NFT/SwiperToggle'
import { NFT_DATA } from '../../../data'
import {
  useE4CRangerHolder,
  useE4CRangerHolderReceived,
  useE4CRangerHolderUnstake,
} from '../../../hooks/useE4CRangerHolder'

const Actions = styled(Stack)`
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`
const ADDRESS = '0x07E64dA6F2F62bc34Dcf1bb7d281c1977337d76b'

function AccountNFT() {
  const { account, chainId } = useEthers()
  const etherBalance = useEtherBalance(account)

  const info = useE4CRangerHolder(ADDRESS)
  const { state: stateReceived, send: sendReceived } = useE4CRangerHolderReceived(ADDRESS)
  const { state: stateUnstake, send: sendUnstake } = useE4CRangerHolderUnstake(ADDRESS)

  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const currentNFT_DATA = useMemo(() => NFT_DATA[currentIndex], [currentIndex])

  console.log('info', info)

  const { sendTransaction, state } = useSendTransaction()

  const sendEth = () => {
    sendTransaction({
      to: getAddress('0x3484040A7c337A95d0eD7779769ffe3e14ecCcA6'),
      value: utils.parseEther('0.00012'),
    })
  }

  const onReceived = () => {
    sendReceived('', getAddress('0x3484040A7c337A95d0eD7779769ffe3e14ecCcA6'), '1', '')
  }

  const onUnstake = () => {
    sendUnstake('1')
  }

  return (
    <PageLayout>
      <div className="my-0 mx-auto py-23 lg:py-32.5 max-w-[1140px] font-sans">
        <h1 className="font-bold text-8 sm:text-16 text-white not-italic uppercase leading-[39px] sm:leading-19.5 px-6 xl:px-2.5 ">
          MY<span className="py-0 px-1 text-rust">NFTS</span>
        </h1>

        <div className="text-white">
          <p>{account}</p>
          <p>{chainId}</p>
          {etherBalance && (
            <div className="balance">
              Ether balance:
              <p className="bold">{formatEther(etherBalance)} ETH</p>
            </div>
          )}
          <p>{JSON.stringify(state)}</p>
          <button
            className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
            onClick={() => sendEth()}
          >
            send
          </button>
          <hr />
          <p>{JSON.stringify(stateReceived)}</p>
          <button
            className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
            onClick={() => onReceived()}
          >
            onERC721Received
          </button>
          <hr />
          <p>{JSON.stringify(stateUnstake)}</p>
          <button
            className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
            onClick={() => onUnstake()}
          >
            unstake
          </button>
        </div>
        <div className="hidden lg:block px-6 xl:px-2.5 my-6 sm:my-9">
          <Stack spacing={3}>
            {NFT_DATA.map((nft, index) => (
              <NFTItem nft={nft} key={index} />
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
