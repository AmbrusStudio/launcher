import React from 'react'

import { ReactInputProps } from '../../../types'
import { classNames } from '../../../utils'
import { IconInvisible, IconVisible } from '../../Icon'

type InputVariants = 'light' | 'dark'

type InputProps = ReactInputProps &
  Required<Pick<ReactInputProps, 'id'>> & {
    className?: string
    label?: string
    error?: string
    variant?: InputVariants
    labelRightElement?: React.ReactNode
    forwardedRef: React.ForwardedRef<HTMLInputElement>
  }

const labelVariants: Record<InputVariants, string> = {
  light: 'text-grey-dark',
  dark: 'text-grey-medium',
}

const inputVariantsNormal: Record<InputVariants, string> = {
  light: 'bg-white border-white hover:border-ligntGreen focus:border-ligntGreen',
  dark: 'bg-black-bg text-white border-black-bg hover:border-white focus:border-white',
}

const inputVariantsError: Record<InputVariants, string> = {
  light: 'bg-white border-rust',
  dark: 'bg-black-bg text-white border-rust',
}

const inputVariantsDisabled: Record<InputVariants, string> = {
  light: 'border-transparent',
  dark: 'border-transparent',
}

function calculateInputType(rawType: React.HTMLInputTypeAttribute, visible: boolean): React.HTMLInputTypeAttribute {
  if (rawType !== 'password') return rawType
  if (visible) return 'text'
  return 'password'
}

function LabeledInput(props: InputProps) {
  const {
    className,
    id,
    label,
    error,
    labelRightElement,
    forwardedRef,
    variant = 'light',
    type = 'text',
    disabled = false,
    ...others
  } = props
  const [visible, setVisible] = React.useState(false)
  const isLabelNeedGap = Boolean(label || error || labelRightElement)
  const calcType = calculateInputType(type, visible)
  const handleToggleVisible = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>((e) => {
    e.preventDefault()
    e.stopPropagation()
    setVisible((v) => !v)
  }, [])

  return (
    <label
      htmlFor={id}
      className={classNames('flex flex-col cursor-pointer', labelVariants[variant], isLabelNeedGap && 'gap-12px')}
    >
      <div className="flex flex-row flex-nowrap justify-between items-center text-12px leading-16px">
        <span className="font-bold uppercase">{label}</span>
        {error && <span className="font-normal text-rust">{error}</span>}
        {!error && labelRightElement && labelRightElement}
      </div>
      <div className="flex flex-row flex-nowrap justify-center relative">
        <input
          {...others}
          id={id}
          type={calcType}
          className={classNames(
            'flex flex-row flex-nowrap items-center w-full box-border border-1px',
            'px-24px py-19px font-semibold text-16px leading-20px',
            'placeholder:text-grey-medium hover:outline-none focus:outline-none',
            !disabled && !error && inputVariantsNormal[variant],
            disabled && inputVariantsDisabled[variant],
            error && inputVariantsError[variant],
            className
          )}
          disabled={disabled}
          ref={forwardedRef}
        />
        {type === 'password' && (
          <button
            className="absolute right-24px top-1/2 -translate-y-1/2 text-grey-medium"
            title="Toggle Password Visible"
            type="button"
            onClick={handleToggleVisible}
          >
            {visible && <IconInvisible className="w-24px h-auto" aria-label="Make password invisible" />}
            {!visible && <IconVisible className="w-24px h-auto" aria-label="Make password visible" />}
          </button>
        )}
      </div>
    </label>
  )
}

export const Input = React.forwardRef<HTMLInputElement, Omit<InputProps, 'forwardedRef'>>(function renderLabeledInput(
  props,
  ref
) {
  return <LabeledInput {...props} forwardedRef={ref} />
})
