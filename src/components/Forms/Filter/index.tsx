import numbro from 'numbro'
import React from 'react'

import { classNames } from '../../../utils'
import FilterChecked from '../../Icon/FilterChecked'
import FilterClose from '../../Icon/FilterClose'
import FilterOpen from '../../Icon/FilterOpen'

type FilterItemBase = {
  label: string
}

export type FilterListItem = FilterItemBase & {
  count: number
  isChecked: boolean
}

export type FilterItem = FilterItemBase & {
  isOpen: boolean
  list: FilterListItem[]
}

type FilterHeadProps = {
  className?: string
  title?: string
}

function FilterHead(props: FilterHeadProps) {
  const { className, title = 'Filters' } = props
  return <div className={classNames('border-y-2px py-4 text-5 leading-6 font-bold uppercase', className)}>{title}</div>
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
        'py-4 border-b-1px',
        toggleable && 'cursor-pointer',
        className
      )}
      onClick={(e) => handleFilterItemClick(e, index)}
    >
      <span className="text-14px leading-18px text-white uppercase">{label}</span>
      {toggleable && (
        <React.Fragment>
          {isOpen && <FilterClose className="!text-12px" />}
          {!isOpen && <FilterOpen className="!text-12px" />}
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
      className={classNames('flex items-center justify-between p-3', 'border-b-1 cursor-pointer', className)}
      onClick={(e) => handleFilterListItemClick(e, parentIndex, index)}
    >
      <span className="text-14px leading-18px">
        <span className="text-white">{label}</span>
        <span className="text-white/50 m-l-1">({numbro(count).format({ thousandSeparated: true })})</span>
      </span>
      {isChecked && <FilterChecked className="!text-12px text-rust" />}
    </div>
  )
}

type FilterProps = {
  filterWrapperClass?: string
  filterHeadClass?: string
  filterItemClass?: string
  filterListItemClass?: string
  filterTitle?: string
  readonly filters: FilterItem[]
  onToggleFilterItem: (index: number, open: boolean) => void
  onFilterListItemClick: (parentIndex: number, childIndex: number, checked: boolean) => void
}

export function Filter(props: FilterProps) {
  const { filters, onToggleFilterItem, onFilterListItemClick } = props
  const { filterWrapperClass, filterHeadClass, filterItemClass, filterListItemClass, filterTitle } = props

  return (
    <div className={filterWrapperClass}>
      <FilterHead className={filterHeadClass} title={filterTitle} />
      <ul className={classNames('select-none overflow-auto max-height-category filter-category-scrollbar')}>
        {filters.map((item, parentIndex) => (
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
    </div>
  )
}
