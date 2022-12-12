import classNames from 'classnames'
import { FC } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export function TabPanelStake(props: TabPanelProps) {
  const { children, value, index } = props

  return <>{value === index && children}</>
}

const Tabs = [
  {
    label: 'E4C Rangers',
  },
  {
    label: 'E4C Rangers Hive',
  },
]

interface Prps {
  readonly tabPanelStakeValue: number
  setTabPanelStakeValue: (value: number) => void
}

const TabsStake: FC<Prps> = ({ tabPanelStakeValue, setTabPanelStakeValue }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabPanelStakeValue(newValue)
  }

  return (
    <div className="flex flex-row">
      {Tabs.map((tab, index) => (
        <div
          className="box-border flex flex-col justify-start items-start w-fit h-fit cursor-pointer"
          key={index}
          onClickCapture={(e) => handleChange(e, index)}
        >
          <div className="box-border flex justify-start items-center flex-grow-0 flex-shrink-0 px-6 py-3">
            <p
              className={classNames(
                "whitespace-pre-wrap flex-grow-0 flex-shrink-0 font-['Montserrat'] text-base leading-[30px] font-bold text-left",
                {
                  'text-[#a0a4b0]': tabPanelStakeValue !== index,
                  'text-white': tabPanelStakeValue === index,
                }
              )}
            >
              {tab.label}
            </p>
          </div>
          <div
            className={classNames('self-stretch flex-grow-0 flex-shrink-0 h-0.5', {
              'bg-white': tabPanelStakeValue === index,
            })}
          />
        </div>
      ))}
    </div>
  )
}

export default TabsStake
