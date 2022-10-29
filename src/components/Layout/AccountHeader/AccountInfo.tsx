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
        'flex flex-row flex-nowrap items-center cursor-pointer box-border rounded-full',
        'w-44px h-44px md:w-76px md:h-76px border-1px border-white',
        className
      )}
      onClick={onClick}
    >
      <img
        className="block w-full h-auto rounded-full object-cover select-none"
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
  return (
    <div
      className={classNames(
        'font-bold text-black truncate',
        'text-14px leading-24px md:text-16px md:leading-30px',
        className
      )}
    >
      {children}
    </div>
  )
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

type AccountMenuProps = {
  menuOpen: boolean
}

function AccountMenu(props: AccountMenuProps) {
  const { menuOpen } = props
  const navigate = useNavigate()
  const { account: userInfo } = useAccountInfo()
  const { imxLink, imxClient, walletInfo } = useImmutableXWallet()

  const [ethBalance, setEthBalance] = React.useState('0.0')
  console.log('userInfo account header', userInfo)

  const name = useAccountName(userInfo?.username)
  const email = useAccountEmail({ email: userInfo?.email, wallet: userInfo?.wallet })

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
    <div
      className={classNames(
        'flex flex-col overflow-hidden absolute transition-all h-0 opacity-0',
        'bg-white drop-shadow-account-info divide-y divide-grey-border',
        'w-180px rounded-12px top-full mt-24px',
        'lg:w-290px lg:rounded-24px lg:-z-10 lg:-top-12px lg:-right-12px lg:mt-0',
        menuOpen && 'h-auto opacity-100'
      )}
    >
      <InfoItem className="lg:h-100px lg:pl-24px" onClick={handleSettingsClick}>
        <div className="flex flex-col truncate text-left lg:mr-76px">
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
  )
}

type AccountInfoProps = AccountMenuProps & {
  sessionExpiredNavigateTo: string
  onAvatarClick: () => void
}

export function AccountInfo(props: AccountInfoProps) {
  const { menuOpen, sessionExpiredNavigateTo, onAvatarClick } = props
  const { expired: sessionExpired } = useAccountInfo()

  const handleAvatarClick = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      e.stopPropagation()
      onAvatarClick()
    },
    [onAvatarClick]
  )

  return (
    <div id="account-info-menu" className="flex relative">
      {sessionExpired && <Navigate to={sessionExpiredNavigateTo} replace={true} />}
      <AvatarItem image={AvatarDefault} onClick={handleAvatarClick} />
      <AccountMenu menuOpen={menuOpen} />
    </div>
  )
}
