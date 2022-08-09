import styled from '@emotion/styled'
import React from 'react'

import { ReactInputProps } from '../../../types'
import { classNames } from '../../../utils'
import { IconCheckMark } from '../../Icon/CheckMark'

type CheckboxProps = ReactInputProps &
  Required<Pick<ReactInputProps, 'id'>> & {
    className?: string
    error?: string
  }

type CheckboxBoxProps = {
  className?: string
  error?: string
}

const CheckboxLabel = styled.label`
  a {
    color: #ff4125;
    text-decoration: underline;
  }
`

function CheckboxBox(props: React.PropsWithChildren<CheckboxBoxProps>) {
  const { className, children, error } = props
  return (
    <div
      className={classNames(
        'shrink-0 justify-center items-center box-border cursor-pointer',
        'mr-12px w-24px h-24px border-1px bg-white',
        error && 'border-rust',
        !error &&
          'border-white hover:border-ligntGreen focus:border-ligntGreen group-hover:border-ligntGreen group-focus:border-ligntGreen',
        className
      )}
    >
      {children}
    </div>
  )
}

export function Checkbox(props: React.PropsWithChildren<CheckboxProps>) {
  const { className, children, id, error, ...others } = props
  return (
    <CheckboxLabel htmlFor={id} className={classNames('group flex flex-row cursor-pointer', className)}>
      <input {...others} type="checkbox" id={id} className="peer hidden" />
      <CheckboxBox className="hidden peer-checked:flex" error={error}>
        <IconCheckMark className="w-16px h-16px text-grey-dark" />
      </CheckboxBox>
      <CheckboxBox className="peer-checked:!hidden" error={error} />
      <span className="font-medium text-14px leading-24px text-black">{children}</span>
    </CheckboxLabel>
  )
}
