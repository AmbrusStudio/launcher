import styled from '@emotion/styled'
import { Stack } from '@mui/material'

import { PageLayout } from '../../../components/Layout'
import NFTItem from '../../../components/NFT/NFTItem'
import NFTItemProperty from '../../../components/NFT/NFTItemProperty'
import NFTModal from '../../../components/NFT/NFTModal'
import NFTStar from '../../../components/NFT/NFTStar'
import NFTUpgrade from '../../../components/NFT/NFTUpgrade'
import { NFTs } from '../../../data'

const Actions = styled(Stack)`
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
`

function AccountNFT() {
  return (
    <PageLayout>
      <div className="my-0 mx-auto px-6 xl:px-2.5 py-23 lg:py-32.5 max-w-[1140px] font-sans">
        <h1 className="font-bold text-8 sm:text-16 mx-0 mt-0 mb-6 sm:mb-9 text-white not-italic uppercase leading-[39px] sm:leading-19.5">
          MY<span className="py-0 px-1 text-rust">NFTS</span>
        </h1>

        <div className="hidden lg:block">
          <Stack spacing={3}>
            {NFTs.map((nft, index) => (
              <NFTItem nft={nft} key={index} />
            ))}
          </Stack>
        </div>

        <div className="block lg:hidden">
          <div className="h-160px bg-white mb-6"></div>

          <NFTItemProperty nft={NFTs[0]} />

          <Actions sx={{ marginTop: 'auto' }} direction="row" spacing={1.5} className="fixed left-6 bottom-6 right-6">
            <NFTStar nft={NFTs[0]} toggle={(value) => console.log(value)} />
            <NFTUpgrade nft={NFTs[0]} toggle={(value) => console.log(value)} />
          </Actions>

          <NFTModal nft={NFTs[0]} title="Stake to Upgrade" />
        </div>
      </div>
    </PageLayout>
  )
}

export default AccountNFT
