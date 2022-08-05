import { Stack } from '@mui/material'
import { useEthers } from '@usedapp/core'
import { useEffect } from 'react'

import NFTItem from '../../../components/NFT/NFTItem'
import { NFTs } from '../../../data'

function AccountNFT() {
  const { account, activateBrowserWallet } = useEthers()
  console.log('account', account)

  useEffect(() => {
    // TODO: Porting “website repo” wallet function or redefining
    ;(window as any).activateBrowserWallet = activateBrowserWallet
  }, [activateBrowserWallet])

  return (
    <div className="my-0 mx-auto px-2.5 py-22 lg:py-32.5 max-w-[1140px] font-sans">
      <h1 className="font-bold text-9 sm:text-16 mx-0 mt-0 mb-4.5 sm:mb-9 text-white not-italic uppercase leading-12.5 sm:leading-19.5">
        MY<span className="py-0 px-1 text-rust">NFTS</span>
      </h1>

      <Stack spacing={3}>
        {NFTs.map((nft, index) => (
          <NFTItem nft={nft} key={index} />
        ))}
      </Stack>
    </div>
  )
}

export default AccountNFT
