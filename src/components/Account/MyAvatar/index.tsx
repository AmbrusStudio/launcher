import styled from '@emotion/styled'

import { AccountAvatarInfo } from '../../../types'
import { classNames } from '../../../utils'
import { IconTick } from '../../Icon'
import { AccountCard } from '../Card'

type AvatarItemProps = {
  className?: string
  selected?: boolean
  image: string
  onItemClick: React.MouseEventHandler<HTMLDivElement>
}

function AvatarItem(props: AvatarItemProps) {
  const { className, selected, image, onItemClick } = props
  return (
    <div
      className={classNames(
        'flex flex-row flex-nowrap items-center cursor-pointer',
        'min-w-80px min-h-80px max-w-120px max-h-120px',
        'xl:w-120px xl:h-120px rounded-full box-border relative',
        !selected && 'border-1px border-grey-dark',
        selected && 'border-4px border-white',
        className
      )}
      onClick={onItemClick}
    >
      <img
        className="block max-w-full h-auto rounded-full object-cover select-none"
        src={image}
        alt="Avatar Image"
        loading="lazy"
      />
      {selected && (
        <div className="absolute bottom-0 right-0">
          <IconTick className="text-24px" />
        </div>
      )}
    </div>
  )
}

const BoxWithCustomizedScrollbar = styled.div`
  &::-webkit-scrollbar {
    width: 12px;
    background-color: rgba(255, 255, 255, 0.2);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.8);
  }
`

type AccountMyAvatarProps = {
  selected?: AccountAvatarInfo
  data: AccountAvatarInfo[]
  onAvatarSelect: (avatar: AccountAvatarInfo) => void
}

export function AccountMyAvatar(props: AccountMyAvatarProps) {
  const { selected, data, onAvatarSelect } = props

  return (
    <AccountCard>
      <div className="mb-12px text-12px leading-16px text-grey-medium font-bold uppercase">Select your Avatar</div>
      <BoxWithCustomizedScrollbar className="flex max-h-550px overflow-y-auto">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(80px,_1fr))] xl:grid-cols-[repeat(auto-fit,_120px)] gap-16px w-full">
          {data.map((avatar, index) => (
            <AvatarItem
              key={`avatar-${avatar.id}-${index}`}
              image={avatar.image}
              selected={avatar.id === selected?.id}
              onItemClick={() => onAvatarSelect(avatar)}
            />
          ))}
        </div>
      </BoxWithCustomizedScrollbar>
    </AccountCard>
  )
}
