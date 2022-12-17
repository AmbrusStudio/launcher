/* eslint-disable react/prop-types */
import { Stack } from '@mui/material'
import { useEthers } from '@usedapp/core'
import classNames from 'classnames'
import React from 'react'

import { ImmutableXWithdraw } from '../../../contracts'
import { useWeb3Modal } from '../../../hooks'
import { MetadataStatus, NFTE4CRanger } from '../../../types'
import { IconWithdraw } from '../../Icon/Withdraw'

function PrimaryButton(props: React.ComponentPropsWithoutRef<'button'>) {
  const { className, children, ...others } = props
  return (
    <button className={classNames('u-btn u-btn-primary', className)} {...others}>
      {children}
    </button>
  )
}

type StakeButtonProps = {
  loading: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function StakeButton(props: React.PropsWithChildren<StakeButtonProps>) {
  const { children = 'Upgrade', loading, onClick } = props
  return (
    <PrimaryButton disabled={loading} className={classNames({ loading })} onClick={onClick}>
      {children}
    </PrimaryButton>
  )
}

type UnstakeButtonProps = {
  loading: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function UnstakeButton(props: React.PropsWithChildren<UnstakeButtonProps>) {
  const { children = 'Status Check', loading, onClick } = props
  return (
    <PrimaryButton disabled={loading} className={classNames({ loading })} onClick={onClick}>
      {children}
    </PrimaryButton>
  )
}

interface TokenActionsProps {
  readonly nft: NFTE4CRanger
  stakeButton: React.ReactNode
  unstakeButton: React.ReactNode
}

export default function TokenActions(props: TokenActionsProps) {
  const { nft, stakeButton, unstakeButton } = props
  const { chainIdMismatch, connect, switchNetwork } = useWeb3Modal()
  const { account, active } = useEthers()

  return (
    <React.Fragment>
      <Stack sx={{ marginTop: 'auto' }} direction="row" spacing={1.5}>
        {nft.upgraded === false && (
          <React.Fragment>
            {!(account && active) ? (
              <PrimaryButton onClick={() => connect()}>Connect Wallet</PrimaryButton>
            ) : chainIdMismatch ? (
              <PrimaryButton onClick={() => switchNetwork()}>Switch Network</PrimaryButton>
            ) : nft.staking ? (
              unstakeButton
            ) : (
              stakeButton
            )}
          </React.Fragment>
        )}
        {nft.status === MetadataStatus.ImmutableX && (
          <button
            className="u-btn max-w-120px min-h-60px !bg-grey-dark !py-0"
            onClick={() => window.open(ImmutableXWithdraw)}
          >
            <IconWithdraw className="w-7 lg:w-9 h-7 lg:h-9" />
          </button>
        )}
      </Stack>
    </React.Fragment>
  )
}
