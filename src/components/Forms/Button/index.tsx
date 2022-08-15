import { ReactButtonProps } from '../../../types'
import { classNames } from '../../../utils'

type ButtonVariants = 'primary' | 'secondary'

type ButtonProps = ReactButtonProps & {
  className?: string
  variant?: ButtonVariants
}

const variants: Record<ButtonVariants, string> = {
  primary: '!bg-rust text-white hover:!bg-white hover:text-rust',
  secondary: '!bg-black-bg text-white hover:!bg-white hover:text-black-bg',
}

export function Button(props: ButtonProps) {
  const { className, children, variant = 'primary', ...others } = props
  return (
    <button
      className={classNames(
        'box-border uppercase w-full px-24px py-20px',
        'font-semibold text-16px leading-20px text-center',
        'disabled:!bg-grey-medium disabled:text-white',
        'disabled:hover:!bg-grey-medium disabled:hover:text-white',
        'disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...others}
    >
      {children}
    </button>
  )
}
