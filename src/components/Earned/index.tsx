import { useBoolean } from 'ahooks'
import classNames from 'classnames'
import numbro from 'numbro'
import { useState } from 'react'

const Earned = () => {
  const [visible, { toggle: visibleToggle }] = useBoolean(false)
  const [earnList, setEarnList] = useState([
    {
      time: '05/08/2022 12:45PM',
      amount: '26.9',
      id: '8888',
    },
    {
      time: '05/08/2022 12:45PM',
      amount: '26.9',
      id: '8999',
    },
    {
      time: '05/08/2022 12:45PM',
      amount: '26.9',
      id: '9999',
    },
    {
      time: '05/08/2022 12:45PM',
      amount: '26.9',
      id: '8888',
    },
    {
      time: '05/08/2022 12:45PM',
      amount: '26.9',
      id: '8999',
    },
    {
      time: '05/08/2022 12:45PM',
      amount: '26.9',
      id: '9999',
    },
  ])

  return (
    <div
      className={classNames(
        'flex justify-end items-center gap-2.5 px-6 py-[13px] rounded-[28px] backdrop-blur-md text-white select-none transition-colors',
        {
          'bg-gradient-to-r from-[#ffb800] to-[#ff7a00]': !visible,
          'bg-black/70': visible,
        }
      )}
      style={{ boxShadow: '0px 4px 10px 0 rgba(0,0,0,0.2)' }}
    >
      <div className="flex flex-col justify-start items-end flex-grow-0 flex-shrink-0 gap-2.5">
        <div
          className="flex items-center flex-grow-0 flex-shrink-0 relative gap-2.5 cursor-pointer"
          onClickCapture={visibleToggle}
        >
          <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-right text-white leading-30px">
            DGC Earned: 580.7
          </p>
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            className={classNames('flex-grow-0 flex-shrink-0 w-6 h-6', {
              'rotate-180': visible,
            })}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M12 15.375L6 9.37499L7.075 8.29999L12 13.25L16.925 8.32499L18 9.39999L12 15.375Z"
              fill="currentColor"
            />
          </svg>
        </div>
        {visible && (
          <>
            {earnList.length ? (
              <table className="border-separate border-spacing-2.5 border-spacing-y-2.5 table-auto">
                <thead>
                  <tr>
                    <th className="p-3 text-sm font-semibold leading-24px text-left">Time</th>
                    <th className="p-3 text-sm font-semibold leading-24px text-right">DGC Earned</th>
                    <th className="p-3 text-sm font-semibold leading-24px text-right">NFT ID</th>
                  </tr>
                </thead>
                <tbody>
                  {earnList.map((item, index) => (
                    <tr key={index}>
                      <td className="p-3 text-sm leading-24px text-left">{item.time}</td>
                      <td className="p-3 text-sm leading-24px text-right">{item.amount}</td>
                      <td className="p-3 text-sm leading-24px text-right">
                        E4C Rangers Hive #{numbro(item.id).format({ thousandSeparated: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-10 py-7.5">
                <p className="text-base text-center text-white leading-7.5">
                  <p>Stake E4C Rangers Hive NFTs to earn DGC tokens.</p>
                  <a className="underline">Learn more about our tokenomics</a>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Earned
