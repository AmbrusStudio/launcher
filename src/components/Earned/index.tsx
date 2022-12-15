import CircularProgress from '@mui/material/CircularProgress'
import { useBoolean } from 'ahooks'
import BigNumber from 'bignumber.js'
import classNames from 'classnames'
import { DateTime } from 'luxon'
import numbro from 'numbro'
import { useMemo } from 'react'
import useSWR from 'swr'

import { getEarnedApi } from '../../api/immutableX'
import { TokenomicsLink } from '../../constants'
import { EarnedHistory } from '../../types/immutableX'
import { balanceDecimal } from '../../utils'

const Earned = () => {
  const [visible, { toggle: visibleToggle }] = useBoolean(false)
  const { data, isLoading } = useSWR<EarnedHistory[]>({ cacheKey: 'earnedHistory' }, getEarnedApi)

  const totalAmount = useMemo<BigNumber>(() => {
    return (
      data?.reduce((accumulator, currentValue) => {
        return accumulator.plus(currentValue.earnedDgc)
      }, new BigNumber(0)) || new BigNumber(0)
    )
  }, [data])

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
            DGC Earned: {balanceDecimal(totalAmount.toString(), 6) || '0'}
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

        {visible && isLoading && (
          <div className="text-center py-6 w-full">
            <CircularProgress className="w-6! h-6! text-white!" />
          </div>
        )}

        {visible && !isLoading && (
          <>
            {data && data.length ? (
              <table className="border-separate border-spacing-2.5 border-spacing-y-2.5 table-auto max-w-560px">
                <thead className="table table-auto	w-full">
                  <tr>
                    <th className="p-3 text-sm font-semibold leading-24px text-left">Time</th>
                    <th className="p-3 text-sm font-semibold leading-24px text-right w-120px">DGC Earned</th>
                    <th className="p-3 text-sm font-semibold leading-24px text-right">NFT ID</th>
                  </tr>
                </thead>
                <tbody className="block h-75 overflow-y-auto">
                  {data.map((item, index) => (
                    <tr key={index} className="table table-auto w-full">
                      <td className="p-3 text-sm leading-24px text-left">
                        {DateTime.fromJSDate(item.time).toFormat('f')}
                      </td>
                      <td className="p-3 text-sm leading-24px text-right w-120px">
                        {balanceDecimal(item.earnedDgc, 6)}
                      </td>
                      <td className="p-3 text-sm leading-24px text-right">
                        E4C Rangers Hive #{numbro(item.nftId).format({ thousandSeparated: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-10 py-7.5">
                <p className="text-base text-center text-white leading-7.5">
                  <p>Stake E4C Rangers Hive NFTs to earn DGC tokens.</p>
                  <a className="underline" href={TokenomicsLink} target="_blank" rel="noopener noreferrer">
                    Learn more about our tokenomics
                  </a>
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
