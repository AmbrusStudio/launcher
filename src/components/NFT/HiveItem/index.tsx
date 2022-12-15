import { FC, useState } from 'react'

// import Star from '../../../components/Icon/Star'
import { useStake } from '../../../hooks/useStake'
import { NFTImmutableX } from '../../../types'
import { imageSizeConversion } from '../../../utils'
import TokenMedia from '../../TokenMedia'
import DetailsName from '../DetailsName'
import NFTDetails from '../NFTDetails'
import StakeInfoEarn from '../StakeInfoEarn'
import StatusCheckEarn from '../StatusCheckEarn'
import TokenActions from '../TokenActions'

interface Props {
  readonly nft: NFTImmutableX
  readonly tokenId: string
}

const HiveItem: FC<Props> = ({ nft, tokenId }) => {
  const { stakeLoading, unstakeLoading, onStake, onUnstake } = useStake({ nft })

  const [visibleInfo, setVisibleInfo] = useState<boolean>(false)
  const [visibleStatusCheck, setVisibleStatusCheck] = useState<boolean>(false)

  return (
    <div className="bg-black relative h-full">
      <div className="w-[47.62%] overflow-hidden float-left">
        <TokenMedia src={imageSizeConversion(nft.image, 2000)} trait={nft.trait} />
      </div>
      <div className="w-[52.38%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0">
        <section className="flex items-start justify-between gap-2">
          <DetailsName nft={nft} tokenId={tokenId} />
        </section>
        <NFTDetails nft={nft} />

        <TokenActions
          nft={nft}
          stakeLoading={stakeLoading}
          unstakeLoading={unstakeLoading}
          setVisibleStatusCheck={() => setVisibleStatusCheck(true)}
          setVisibleInfo={() => setVisibleInfo(true)}
        />
      </div>

      {visibleInfo && (
        <StakeInfoEarn
          stakeLoading={stakeLoading}
          toggle={(value) => setVisibleInfo(value)}
          stake={() => onStake(tokenId)}
          nft={nft}
        />
      )}
      {visibleStatusCheck && (
        <StatusCheckEarn
          unstakeLoading={unstakeLoading}
          nft={nft}
          toggle={(value) => setVisibleStatusCheck(value)}
          unstake={() => onUnstake(tokenId)}
        />
      )}
    </div>
  )
}

export default HiveItem
