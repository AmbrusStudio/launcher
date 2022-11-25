import { FC, useState } from 'react'

// import Star from '../../../components/Icon/Star'
import { useStake } from '../../../hooks/useStake'
import { NFTE4CRanger } from '../../../types'
import { imageSizeConversion } from '../../../utils'
import TokenMedia from '../../TokenMedia'
import NFTDetails from '../NFTDetails'
import StakeInfo from '../StakeInfo'
import StatusCheck from '../StatusCheck'
import TokenActions from '../TokenActions'

interface NFTItemProps {
  readonly nft: NFTE4CRanger
  readonly tokenId: string
}

const NFTItem: FC<NFTItemProps> = ({ nft, tokenId }) => {
  const { stakeLoading, unstakeLoading, onStake, onUnstake } = useStake({ nft })

  const [visibleInfo, setVisibleInfo] = useState<boolean>(false)
  const [visibleStatusCheck, setVisibleStatusCheck] = useState<boolean>(false)

  return (
    <div className="bg-black relative h-full">
      <div className="w-[53.5%] overflow-hidden float-left">
        <TokenMedia src={imageSizeConversion(nft.image, 2000)} trait={nft.trait} />
      </div>
      <div className="w-[46.5%] text-white p-[24px] flex flex-col absolute top-0 right-0 bottom-0">
        <NFTDetails nft={nft} tokenId={tokenId} />

        <TokenActions
          nft={nft}
          stakeLoading={stakeLoading}
          unstakeLoading={unstakeLoading}
          setVisibleStatusCheck={() => setVisibleStatusCheck(true)}
          setVisibleInfo={() => setVisibleInfo(true)}
        />
      </div>

      {visibleInfo && (
        <StakeInfo
          stakeLoading={stakeLoading}
          toggle={(value) => setVisibleInfo(value)}
          stake={() => onStake(tokenId)}
          nft={nft}
        />
      )}
      {visibleStatusCheck && (
        <StatusCheck
          unstakeLoading={unstakeLoading}
          nft={nft}
          toggle={(value) => setVisibleStatusCheck(value)}
          unstake={() => onUnstake(tokenId)}
        />
      )}
    </div>
  )
}

export default NFTItem
