import { EthAddress, ETHTokenType } from '@imtbl/imx-sdk'
import { formatEther } from 'ethers/lib/utils'
import { isRight } from 'fp-ts/Either'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import AvatarDefault from '../../../assets/images/avatar/avatar-default.png'
import { useAccountEmail, useAccountInfo, useAccountName, useImmutableXWallet } from '../../../hooks'
import { ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'
import { IconEthereum } from '../../Icon'

type AvatarItemProps = {
  className?: string
  image: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

function AvatarItem(props: AvatarItemProps) {
  const { className, image, onClick } = props
  return (
    <div
      className={classNames(
        'flex flex-row flex-nowrap items-center cursor-pointer',
        'w-76px h-76px rounded-full box-border border-1px border-white',
        className
      )}
      onClick={onClick}
    >
      <img
        className="block max-w-full h-auto rounded-full object-cover select-none"
        src={image}
        alt="Avatar Image"
        loading="lazy"
      />
    </div>
  )
}

type InfoItemProps = ReactButtonProps & {
  className?: string
}

function InfoItem(props: React.PropsWithChildren<InfoItemProps>) {
  const { className, children, ...others } = props
  return (
    <button
      className={classNames(
        'flex flex-row flex-nowrap items-center box-border',
        'px-12px py-12px hover:bg-gray/10',
        className
      )}
      {...others}
    >
      {children}
    </button>
  )
}

type InfoTitleProps = {
  className?: string
}

function InfoTitle(props: React.PropsWithChildren<InfoTitleProps>) {
  const { className, children } = props
  return <div className={classNames('font-bold text-16px leading-30px text-black truncate', className)}>{children}</div>
}

type InfoSubtitleProps = {
  className?: string
}

function InfoSubtitle(props: React.PropsWithChildren<InfoSubtitleProps>) {
  const { className, children } = props
  return (
    <div className={classNames('font-normal text-12px leading-20px text-grey-medium truncate', className)}>
      {children}
    </div>
  )
}

export function AccountInfo() {
  const navigate = useNavigate()
  const { account: userInfo, expired: sessionExpired } = useAccountInfo()
  const { imxLink, imxClient, walletInfo } = useImmutableXWallet()

  const [ethBalance, setEthBalance] = React.useState('0.0')

  const name = useAccountName(userInfo?.username)
  const email = useAccountEmail({ email: userInfo?.email, wallet: userInfo?.wallet })

  const [menuOpen, setMenuOpen] = React.useState(false)
  const toggleMenuOpen = React.useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    e.preventDefault()
    e.stopPropagation()
    setMenuOpen((o) => !o)
  }, [])

  const fetchWalletBalances = React.useCallback(async () => {
    if (!imxClient || !walletInfo) return
    const userDecode = EthAddress.decode(walletInfo.address)
    if (!isRight(userDecode)) return
    const { result: balances } = await imxClient.listBalances({ user: userDecode.right, symbols: [ETHTokenType.ETH] })
    console.debug('Fetch wallet balances', balances)
    const ethBalance = formatEther(balances[0].balance)
    setEthBalance(ethBalance)
    return ethBalance
  }, [imxClient, walletInfo])

  const handleSettingsClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.stopPropagation()
      navigate(`/account/settings`)
    },
    [navigate]
  )
  const handleBalancesClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.stopPropagation()
      await fetchWalletBalances()
    },
    [fetchWalletBalances]
  )
  const handleDepositClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.stopPropagation()
      if (!imxLink) return
      await imxLink.deposit({ type: ETHTokenType.ETH })
    },
    [imxLink]
  )
  const handleWithdrawClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.stopPropagation()
      if (!imxLink) return
      const ethBalance = await fetchWalletBalances()
      if (!ethBalance) return
      await imxLink.prepareWithdrawal({ type: ETHTokenType.ETH, amount: ethBalance })
    },
    [fetchWalletBalances, imxLink]
  )

  React.useEffect(() => {
    fetchWalletBalances()
    const fetchInterval = setInterval(async () => {
      await fetchWalletBalances()
    }, 30000)
    return () => clearInterval(fetchInterval)
  }, [fetchWalletBalances])

  return (
    <div className="z-30 relative">
      {sessionExpired && <Navigate to="/account/signup" replace={true} />}
      <AvatarItem image={AvatarDefault} onClick={toggleMenuOpen} />
      <div
        className={classNames(
          'hidden flex-col overflow-hidden -z-10 absolute -top-12px -right-12px',
          'w-290px bg-white rounded-24px divide-y divide-grey-border',
          'transition-opacity opacity-0',
          menuOpen && 'flex opacity-100'
        )}
      >
        <InfoItem className="h-100px px-24px" onClick={handleSettingsClick}>
          <div className="flex flex-col truncate mr-76px text-left">
            <InfoTitle>{name}</InfoTitle>
            <InfoSubtitle>{email}</InfoSubtitle>
          </div>
        </InfoItem>
        <div className="flex flex-col">
          <InfoItem onClick={handleBalancesClick}>
            <div className="flex flex-col gap-12px truncate text-12px leading-16px text-left">
              <div className="font-semibold text-grey-medium">IMX Balance</div>
              <div className="flex flex-row items-center font-normal text-black">
                <IconEthereum className="mr-8px" />
                <span className="mr-4px text-14px leading-20px">{ethBalance}</span>
                <span>ETH</span>
              </div>
            </div>
          </InfoItem>
          <InfoItem className="pl-24px" onClick={handleDepositClick}>
            <InfoTitle>Deposit</InfoTitle>
          </InfoItem>
          <InfoItem className="pl-24px" onClick={handleWithdrawClick}>
            <InfoTitle>Withdraw</InfoTitle>
          </InfoItem>
        </div>
      </div>
    </div>
  )
}
