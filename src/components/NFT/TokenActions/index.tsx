import { Stack } from '@mui/material'
import classNames from 'classnames'
import { FC } from 'react'

// import Star from '../../../components/Icon/Star'
import { ImmutableXWithdraw } from '../../../contracts'
import { useWeb3Modal } from '../../../hooks'
import { MetadataStatus, NFTE4CRanger } from '../../../types'
import { IconWithdraw } from '../../Icon/Withdraw'

interface Props {
  readonly nft: NFTE4CRanger
  readonly stakeLoading: boolean
  readonly unstakeLoading: boolean
  setVisibleStatusCheck: () => void
  setVisibleInfo: () => void
}

const TokenActions: FC<Props> = ({ nft, stakeLoading, unstakeLoading, setVisibleStatusCheck, setVisibleInfo }) => {
  const { chainIdMismatch, switchNetwork } = useWeb3Modal()

  return (
    <>
      {nft.upgraded === false && (
        <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
          {/* <button className="u-btn u-btn-primary max-w-[120px]">
              <Star sx={{ fontSize: '36px' }} />
            </button> */}
          {chainIdMismatch ? (
            <button className={'u-btn u-btn-primary'} onClick={() => switchNetwork()}>
              Switch Network
            </button>
          ) : nft.staking ? (
            <button
              disabled={unstakeLoading}
              className={classNames('u-btn u-btn-primary', {
                loading: unstakeLoading,
              })}
              onClick={setVisibleStatusCheck}
            >
              Status Check
            </button>
          ) : (
            <button
              disabled={stakeLoading}
              className={classNames('u-btn u-btn-primary', {
                loading: stakeLoading,
              })}
              onClick={setVisibleInfo}
            >
              Upgrade
            </button>
          )}
          {nft.status === MetadataStatus.ImmutableX && (
            <button className="u-btn max-w-[120px] !bg-[#465358] py-0!" onClick={() => window.open(ImmutableXWithdraw)}>
              <IconWithdraw className="w-7 lg:w-9 h-7 lg:h-9" />
            </button>
          )}
        </Stack>
      )}
    </>
  )
}

export default TokenActions
