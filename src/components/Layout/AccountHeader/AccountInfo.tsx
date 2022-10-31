import { EthAddress, ETHTokenType } from '@imtbl/imx-sdk'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { isRight } from 'fp-ts/Either'
import React from 'react'
import ReactDom from 'react-dom'
import { useFormContext } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'

import AvatarDefault from '../../../assets/images/avatar/avatar-default.png'
import { useAccountEmail, useAccountInfo, useAccountName, useImmutableXWallet, usePortal } from '../../../hooks'
import { AccountWithdrawModalFormData, ReactButtonProps } from '../../../types'
import { classNames, getFloatNumbersValidationPattern, getFormErrorMessage } from '../../../utils'
import { Button, Input } from '../../Forms'
import { IconClose, IconEthereum } from '../../Icon'

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

type AccountWithdrawModalProps = {
  ethBalance: string
  modalOpen: boolean
  disabled?: boolean
  onModalClose: () => void
  onNextClick: (value: string) => void
}

function AccountWithdrawModal(props: AccountWithdrawModalProps) {
  const { ethBalance, modalOpen, disabled, onModalClose, onNextClick } = props
  const target = usePortal('account-withdraw-modal')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<AccountWithdrawModalFormData>()

  function validateWithdrawAmount(value: string): boolean | string {
    try {
      const maxBalance = parseEther(ethBalance)
      const inputBalance = parseEther(value)
      if (inputBalance.lte(maxBalance)) return true
      return 'Insufficient funds.'
    } catch (error) {
      if (error instanceof Error) console.error(`Validate withdraw amount ${error}`)
      return 'Please enter the correct balance.'
    }
  }

  const pattern = getFloatNumbersValidationPattern()

  const handleModalClose = React.useCallback<React.MouseEventHandler<SVGSVGElement>>(
    (e) => {
      e.stopPropagation()
      onModalClose()
    },
    [onModalClose]
  )

  const handleNextSubmit = React.useCallback(
    (data: AccountWithdrawModalFormData) => {
      onNextClick(data.withdrawAmount)
    },
    [onNextClick]
  )

  if (!modalOpen) return null

  return ReactDom.createPortal(
    <div
      className={classNames(
        'fixed top-0 left-0 z-40 overflow-auto',
        'w-full h-full transition-all opacity-0',
        modalOpen && 'opacity-100'
      )}
    >
      <div className="w-full h-full xl:h-auto xl:mt-92px">
        <div className="flex flex-col drop-shadow-nft-modal w-full h-full xl:w-600px xl:mx-auto">
          <div className="flex flex-row flex-nowrap justify-between items-center p-24px xl:py-16px text-white bg-black-bg/80">
            <h4 className="font-bold text-16px xl:text-36px leading-20px xl:leading-44px uppercase">ETH Withdraw</h4>
            <IconClose className="w-16px h-16px xl:w-30px xl:h-30px cursor-pointer" onClick={handleModalClose} />
          </div>
          <div className="flex-1 bg-white/80">
            <form
              className="flex flex-col backdrop-blur-10px h-full p-24px xl:p-36px gap-24px"
              onSubmit={handleSubmit(handleNextSubmit)}
            >
              <p className="font-normal text-16px leading-30px text-tips">
                Enter the amount you want to withdraw from your IMX wallet
              </p>
              <div className="flex flex-col gap-6px truncate text-12px leading-16px text-left">
                <div className="font-semibold text-grey-dark">IMX Balance</div>
                <div className="flex flex-row items-center font-normal text-black">
                  <IconEthereum className="mr-8px" />
                  <span className="mr-4px text-14px leading-20px">{ethBalance}</span>
                  <span>ETH</span>
                </div>
              </div>
              <Input
                id="withdraw-amount"
                label="Withdraw Amount"
                placeholder="0.0"
                inputRightElement={<span className="font-bold text-16px leading-20px text-black uppercase">ETH</span>}
                required
                {...register('withdrawAmount', { required: true, pattern, validate: validateWithdrawAmount })}
                error={getFormErrorMessage(errors.withdrawAmount)}
              />
              <Button variant="primary" type="submit" disabled={disabled}>
                Next
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>,
    target
  )
}

type AccountMenuProps = {
  menuOpen: boolean
}

function AccountMenu(props: AccountMenuProps) {
  const { menuOpen } = props
  const navigate = useNavigate()
  const { imxLink, imxClient, walletInfo } = useImmutableXWallet()

  const { account: userInfo } = useAccountInfo()
  const name = useAccountName(userInfo?.username)
  const email = useAccountEmail({ email: userInfo?.email, wallet: userInfo?.wallet })

  const [ethBalance, setEthBalance] = React.useState('0.0')
  const [withdrawModalOpen, setWithdrawModalOpen] = React.useState(false)
  const [withdrawing, setWithdrawing] = React.useState(false)

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
      await fetchWalletBalances()
      setWithdrawModalOpen(true)
    },
    [fetchWalletBalances]
  )

  const handleWithdrawModalClose = React.useCallback(() => {
    setWithdrawModalOpen(false)
  }, [])
  const handleWithdrawModalNextClick = React.useCallback(
    async (amount: string) => {
      if (!imxLink || withdrawing) return
      try {
        setWithdrawing(true)
        await imxLink.prepareWithdrawal({ type: ETHTokenType.ETH, amount })
      } finally {
        setWithdrawing(false)
      }
    },
    [imxLink, withdrawing]
  )

  React.useEffect(() => {
    fetchWalletBalances()
    const fetchInterval = setInterval(async () => {
      await fetchWalletBalances()
    }, 30000)
    return () => clearInterval(fetchInterval)
  }, [fetchWalletBalances])

  return (
    <React.Fragment>
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
      <AccountWithdrawModal
        ethBalance={ethBalance}
        modalOpen={withdrawModalOpen}
        disabled={withdrawing}
        onModalClose={handleWithdrawModalClose}
        onNextClick={handleWithdrawModalNextClick}
      />
    </React.Fragment>
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
