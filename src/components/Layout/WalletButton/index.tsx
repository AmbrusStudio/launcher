import styled from '@emotion/styled'
import React from 'react'

import { classNames } from '../../../utils'

type WalletButtonProps = {
  connected?: boolean
  chainIdMismatch?: boolean
  onConnectClick?: () => void
  onSwitchNetworkClick?: () => void
  onDisonnectClick?: () => void
}

const Button = styled.button`
  background-image: linear-gradient(to right, white 50%, #ff4125 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 0.25s ease-out;
  &.button-hover:hover {
    color: #ff4125;
    background-position: left bottom;
  }
`

const ButtonContent: React.FC<React.PropsWithChildren> = (props) => (
  <span className="font-semibold text-14px text-center uppercase">{props.children}</span>
)

export function WalletButton(props: React.PropsWithChildren<WalletButtonProps>) {
  const { connected, chainIdMismatch, children } = props
  const { onConnectClick, onSwitchNetworkClick, onDisonnectClick } = props

  const [hover, setHover] = React.useState(false)
  const handleButtonClick = React.useCallback(() => {
    if (!connected) {
      onConnectClick && onConnectClick()
    }
    if (connected && chainIdMismatch) {
      onSwitchNetworkClick && onSwitchNetworkClick()
    }
    if (connected && !chainIdMismatch) {
      onDisonnectClick && onDisonnectClick()
    }
  }, [chainIdMismatch, connected, onConnectClick, onDisonnectClick, onSwitchNetworkClick])
  const handleHover = React.useCallback((s: boolean) => setHover(Boolean(props.connected) && s), [props.connected])

  return (
    <Button
      className={classNames(
        'flex flex-row flex-nowrap justify-center items-center rounded-4px h-36px w-186px text-white',
        hover && 'button-hover'
      )}
      type="button"
      onClick={handleButtonClick}
      onMouseOver={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {connected && !chainIdMismatch && !hover && <ButtonContent>{children}</ButtonContent>}
      {connected && !chainIdMismatch && hover && <ButtonContent>Disconnect</ButtonContent>}
      {connected && chainIdMismatch && <ButtonContent>Switch Network</ButtonContent>}
      {!connected && <ButtonContent>Connect Wallet</ButtonContent>}
    </Button>
  )
}
