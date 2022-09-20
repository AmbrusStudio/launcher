import { shortenIfAddress } from '@usedapp/core'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import AvatarDefault from '../../../assets/images/avatar/avatar-default.png'
import { useAccountInfo } from '../../../hooks'
import { ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'

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
        'px-24px py-12px border-b-1px border-grey-border',
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
  const { account: userInfo, expired: sessionExpired } = useAccountInfo()
  const navigate = useNavigate()

  const name =
    userInfo?.username && userInfo.username.startsWith('0x')
      ? shortenIfAddress(userInfo?.username)
      : userInfo?.username || 'Name'
  const email = userInfo?.email || shortenIfAddress(userInfo?.wallet)

  const [menuOpen, setMenuOpen] = React.useState(false)
  const toggleMenuOpen = React.useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    e.preventDefault()
    e.stopPropagation()
    setMenuOpen((o) => !o)
  }, [])

  const handleMyWalletClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      navigate(`/account/settings`)
    },
    [navigate]
  )

  return (
    <div className="z-30 relative">
      {sessionExpired && <Navigate to="/account/signup" replace={true} />}
      <AvatarItem image={AvatarDefault} onClick={toggleMenuOpen} />
      <div
        className={classNames(
          'flex flex-col opacity-0 overflow-hidden transition-opacity',
          'w-290px h-168px bg-white rounded-24px',
          '-z-10 absolute -top-12px -right-12px',
          menuOpen && 'opacity-100'
        )}
      >
        <InfoItem className="h-100px">
          <div className="flex flex-col truncate mr-76px text-left">
            <InfoTitle>{name}</InfoTitle>
            <InfoSubtitle>{email}</InfoSubtitle>
          </div>
        </InfoItem>
        <InfoItem onClick={handleMyWalletClick}>
          <InfoTitle>My Wallet</InfoTitle>
        </InfoItem>
      </div>
    </div>
  )
}
