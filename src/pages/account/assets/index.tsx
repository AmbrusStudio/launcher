import { Filter, FilterItem } from '../../../components/Forms'
import { AccountCenterPageLayout } from '../../../components/Layout'

const demoFilters: FilterItem[] = [
  {
    label: 'Asset Type',
    isOpen: true,
    list: [
      { label: 'On-chain IMX', count: 5, isChecked: false },
      { label: 'On-chain ETH', count: 5, isChecked: false },
      { label: 'Off-chain', count: 5, isChecked: true },
    ],
  },
  {
    label: 'E4C: FAllen Arena',
    isOpen: true,
    list: [
      { label: 'Rangers', count: 1111, isChecked: true },
      { label: 'Weapons', count: 1111, isChecked: false },
    ],
  },
]

export function Assets() {
  return (
    <AccountCenterPageLayout className="flex flex-col gap-24px" title="Game" subtitle="Assets">
      <div className="flex flex-row gap-24px">
        <Filter
          filterWrapperClass="w-300px"
          filterHeadClass="text-grey-medium border-grey-border"
          filterItemClass="border-grey-border"
          filterListItemClass="border-grey-border"
          filters={demoFilters}
          onFilterListItemClick={() => void 0}
          onToggleFilterItem={() => void 0}
        />
      </div>
    </AccountCenterPageLayout>
  )
}
