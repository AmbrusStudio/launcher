import React from 'react'

import { ReactInputProps } from '../../../types'
import { classNames } from '../../../utils'

type InputProps = ReactInputProps &
  Required<Pick<ReactInputProps, 'id'>> & {
    className?: string
    label: string
    error?: string
    labelRightElement?: React.ReactNode
    forwardedRef: React.ForwardedRef<HTMLInputElement>
  }

function LabeledInput(props: InputProps) {
  const { className, id, label, error, labelRightElement, forwardedRef, ...others } = props
  return (
    <label htmlFor={id} className="flex flex-col gap-12px text-grey-dark cursor-pointer">
      <div className="flex flex-row flex-nowrap justify-between items-center text-12px leading-16px">
        <span className="font-bold uppercase">{label}</span>
        {error && <span className="font-normal text-rust">{error}</span>}
        {!error && labelRightElement && labelRightElement}
      </div>
      <input
        {...others}
        id={id}
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
    </label>
  )
}

export const Input = React.forwardRef<HTMLInputElement, Omit<InputProps, 'forwardedRef'>>(function renderLabeledInput(
  props,
  ref
) {
  return <LabeledInput {...props} forwardedRef={ref} />
})
