import React from 'react'

import { ReactInputProps } from '../../../types'
import { classNames } from '../../../utils'
import { IconInvisible, IconVisible } from '../../Icon'

type InputProps = ReactInputProps &
  Required<Pick<ReactInputProps, 'id'>> & {
    className?: string
    label: string
    error?: string
    labelRightElement?: React.ReactNode
    forwardedRef: React.ForwardedRef<HTMLInputElement>
  }

function calculateInputType(rawType: React.HTMLInputTypeAttribute, visible: boolean): React.HTMLInputTypeAttribute {
  if (rawType !== 'password') return rawType
  if (visible) return 'text'
  return 'password'
}

function LabeledInput(props: InputProps) {
  const { className, id, label, error, labelRightElement, forwardedRef, type = 'text', ...others } = props
  const [visible, setVisible] = React.useState(false)
  const calcType = calculateInputType(type, visible)
  const handleToggleVisible = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>((e) => {
    e.preventDefault()
    e.stopPropagation()
    setVisible((v) => !v)
  }, [])

  return (
    <label htmlFor={id} className="flex flex-col gap-12px text-grey-dark cursor-pointer">
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
            'px-24px py-19px font-semibold text-16px leading-20px bg-white',
            'placeholder:text-grey-medium hover:outline-none focus:outline-none',
            error && 'border-rust',
            !error && 'border-white hover:border-ligntGreen focus:border-ligntGreen',
            className
          )}
          ref={forwardedRef}
        />
        {type === 'password' && (
          <button
            className="absolute right-24px top-1/2 -translate-y-1/2 text-grey-medium"
            title="Toggle Password Visible"
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
