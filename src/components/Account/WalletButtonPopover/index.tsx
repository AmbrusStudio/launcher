import { Popover, Transition } from '@headlessui/react'
import React from 'react'

type AccountWalletButtonPopoverProps = {
  disabled?: boolean
}

function PopoverContent() {
  return (
    <Transition
      enter="transition-opacity duration-100 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-75 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Popover.Panel className="absolute z-10 bottom-full w-full">
        <div className="flex flex-col justify-center items-center drop-shadow-wallet-popover">
          <div className="p-24px box-border rounded-12px font-medium text-14px leading-24px bg-black/80 text-white max-w-500px backdrop-blur-6px">
            E4C is built on ImmutableX, one of the largest blockchains for Web3 games. When connecting to your ETH
            wallet, you will also be connecting to IMX.
            <br />
            This process is secure, simple and free.
          </div>
          <div className="mb-4px w-0 h-0 border-solid border-x-8px border-t-6px border-x-transparent border-t-black/80" />
        </div>
      </Popover.Panel>
    </Transition>
  )
}

export function AccountWalletButtonPopover(props: React.PropsWithChildren<AccountWalletButtonPopoverProps>) {
  const buttonRef = React.useRef<HTMLDivElement | null>(null)

  const handleTogglePanel = React.useCallback(() => {
    if (props.disabled) return
    if (buttonRef.current) buttonRef.current.click()
  }, [props.disabled])
  const handleMouseEnter = React.useCallback(() => handleTogglePanel(), [handleTogglePanel])
  const handleMouseLeave = React.useCallback(() => handleTogglePanel(), [handleTogglePanel])

  return (
    <Popover className="relative w-full">
      <Popover.Button as="div" ref={buttonRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {props.children}
      </Popover.Button>
      {!props.disabled && <PopoverContent />}
    </Popover>
  )
}
