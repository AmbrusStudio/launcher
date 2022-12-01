import numbro from 'numbro'
import React from 'react'

import { classNames } from '../../../utils'
import FilterChecked from '../../Icon/FilterChecked'
import FilterClose from '../../Icon/FilterClose'
import FilterOpen from '../../Icon/FilterOpen'

export type FilterListItem = {
  label: string
  count: number
  isChecked: boolean
}

export type FilterItem = {
  label: string
  isOpen: boolean
  list: FilterListItem[]
}

type FilterItemProps = Omit<FilterItem, 'list'> & {
  className?: string
  index: number
  toggleable: boolean
  onToggleFilterItem: (index: number, open: boolean) => void
}

function FilterItem(props: FilterItemProps) {
  const { className, index, label, toggleable, isOpen, onToggleFilterItem } = props

  const handleFilterItemClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
      if (!toggleable) return
      event.stopPropagation()
      onToggleFilterItem(index, !isOpen)
    },
    [isOpen, onToggleFilterItem, toggleable]
  )

  return (
    <div
      id={`filter-item-${index}-${label}`}
      className={classNames(
        'flex items-center justify-between',
        'py-4 border-b-1px border-grey-dark',
        toggleable && 'cursor-pointer',
        className
      )}
      onClick={(e) => handleFilterItemClick(e, index)}
    >
      <span className="text-14px leading-18px text-white uppercase">{label}</span>
      {toggleable && (
        <React.Fragment>
          {isOpen && <FilterClose className="text-12px" />}
          {!isOpen && <FilterOpen className="text-12px" />}
        </React.Fragment>
      )}
    </div>
  )
}

type FilterListItemProps = FilterListItem & {
  className?: string
  parentIndex: number
  index: number
  onFilterListItemClick: (parentIndex: number, childIndex: number, checked: boolean) => void
}

function FilterListItem(props: FilterListItemProps) {
  const { className, label, count, isChecked } = props
  const { parentIndex, index, onFilterListItemClick } = props

  const handleFilterListItemClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, parentIndex: number, index: number) => {
      event.stopPropagation()
      onFilterListItemClick(parentIndex, index, !isChecked)
    },
    [isChecked, onFilterListItemClick]
  )

  return (
    <div
      id={`filter-list-item-${parentIndex}-${index}-${label}`}
      className={classNames(
        'flex items-center justify-between p-3',
        'border-b-1 border-black-bg cursor-pointer',
        className
      )}
      onClick={(e) => handleFilterListItemClick(e, parentIndex, index)}
    >
      <span className="text-14px leading-18px">
        <span className="text-white">{label}</span>
        <span className="text-white/50 m-l-1">({numbro(count).format({ thousandSeparated: true })})</span>
      </span>
      {isChecked && <FilterChecked className="text-12px text-rust" />}
    </div>
  )
}

type FilterProps = {
  filterItemClass?: string
  filterListItemClass?: string
  readonly filter: FilterItem[]
  onToggleFilterItem: (index: number, open: boolean) => void
  onFilterListItemClick: (parentIndex: number, childIndex: number, checked: boolean) => void
}

export function Filter(props: FilterProps) {
  const { filter, filterItemClass, filterListItemClass, onToggleFilterItem, onFilterListItemClick } = props

  return (
    <ul className={classNames('select-none overflow-auto max-height-category filter-category-scrollbar')}>
      {filter.map((item, parentIndex) => (
        <li key={`filter-item-${parentIndex}`}>
          <FilterItem
            className={filterItemClass}
            index={parentIndex}
            label={item.label}
            toggleable={!!item.list.length}
            isOpen={item.isOpen}
            onToggleFilterItem={onToggleFilterItem}
          />
          {item.isOpen && (
            <ul className="max-h-252px overflow-auto filter-category-scrollbar">
              {item.list.map((listItem, childIndex) => (
                <li key={`filter-list-item-${parentIndex}-${childIndex}`}>
                  <FilterListItem
                    className={filterListItemClass}
                    parentIndex={parentIndex}
                    index={childIndex}
                    label={listItem.label}
                    count={listItem.count}
                    isChecked={listItem.isChecked}
                    onFilterListItemClick={onFilterListItemClick}
                  />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
