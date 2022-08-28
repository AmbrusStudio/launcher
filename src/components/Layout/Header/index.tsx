import styled from '@emotion/styled'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { useCallback, useState } from 'react'
import Web3Modal from 'web3modal'

import { classNames } from '../../../utils'
import { IconHeaderClose } from '../../Icon/HeaderClose'
import { IconHeaderMenu } from '../../Icon/HeaderMenu'
import { web3ModalProviderOptions } from '../../Provider'
import { GamesNav } from '../GamesNav'
import { SiteNav } from '../SiteNav'
import { SocialNav } from '../SocialNav'
import { WalletButton } from '../WalletButton'
import { LogoNav } from './LogoNav'

type MobileMenuWrapperProps = {
  open: boolean
}

const MobileMenuWrapper = styled.div<MobileMenuWrapperProps>`
  @media (max-width: 1280px) {
    display: ${(props) => (props.open ? 'flex' : 'none')};
  }
  display: flex;
`

export function PageHeader() {
  const { account, active, deactivate, activate } = useEthers()

  const connected = Boolean(account && active)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [gamesNavOpen, setGamesNavOpen] = useState(false)
  const handleMobileMenuToggle = useCallback(() => setMobileMenuOpen((s) => !s), [])
  const handleGamesNavClick = useCallback((open: boolean) => setGamesNavOpen(open), [])

  const handleWalletDisconnect = useCallback(() => {
    deactivate()
  }, [deactivate])

  const activateProvider = useCallback(async () => {
    const web3Modal = new Web3Modal({
      providerOptions: web3ModalProviderOptions,
    })
    try {
      const provider = await web3Modal.connect()

      await activate(provider)
    } catch (error: any) {
      console.log(error.message)
    }
  }, [activate])

  return (
    <header
      id="header"
      className={classNames(
        'fixed top-0 z-10 w-100vw xl:w-full xl:h-auto bg-black/50 backdrop-blur-10px overflow-auto',
        mobileMenuOpen && 'h-100vh !bg-black/80'
      )}
    >
      <div className="flex flex-col xl:flex-row xl:items-center h-full xl:h-100px xl:px-32px">
        <div className="flex flex-row shrink-0 items-center justify-between xl:justify-start h-68px xl:h-auto px-24px xl:p-0">
          <LogoNav />
          <button className="xl:hidden text-rust" onClick={handleMobileMenuToggle} title="Nav Toggle">
            {mobileMenuOpen && <IconHeaderClose />}
            {!mobileMenuOpen && <IconHeaderMenu />}
          </button>
        </div>
        <MobileMenuWrapper
          className="flex-1 flex-col xl:flex-row xl:items-center xl:justify-between"
          open={mobileMenuOpen}
        >
          <SiteNav onGamesNavClick={handleGamesNavClick} />
          <div className="flex flex-col xl:flex-row items-center gap-24px xl:gap-0 px-32px py-36px xl:p-0 bg-black-bg xl:bg-transparent">
            <SocialNav className="px-26px" />
            <div className="flex items-center">
              <WalletButton
                connected={connected}
                onConnectClick={() => activateProvider()}
                onDisonnectClick={handleWalletDisconnect}
              >
                {shortenIfAddress(account)}
              </WalletButton>
            </div>
          </div>
        </MobileMenuWrapper>
      </div>
      <div className="hidden h-0 xl:block xl:h-auto">
        <GamesNav open={gamesNavOpen} />
      </div>
    </header>
  )
}
