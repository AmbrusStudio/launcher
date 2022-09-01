import React from 'react'

import BannerFallenArena from '../../../assets/images/banners/fallen-arena.png'
import BannerFinalSalvation from '../../../assets/images/banners/final-salvation.png'
import BannerUgcTool from '../../../assets/images/banners/ugc-tool.png'
import { AccountTitie } from '../../../components/Account'
import { AccountBlock } from '../../../components/Account/Block'
import { AccountCenterPageLayout } from '../../../components/Layout'

export function Home() {
  return (
    <AccountCenterPageLayout className="flex flex-col gap-36px max-w-1332px">
      <AccountTitie subtitle="Center" />
      <div className="flex flex-col">
        <AccountBlock title="E4C Games">
          <div className="flex gap-24px">
            <div className="w-[100%] h-[100%] cursor-pointer">
              <img src={BannerFinalSalvation} className="w-[100%] h-[100%] object-cover" />
            </div>
            <div className="w-[100%] h-[100%] cursor-pointer">
              <img src={BannerFallenArena} className="w-[100%] h-[100%] object-cover" />
            </div>
            <div className="w-[100%] h-[100%] relative cursor-pointer">
              <img src={BannerUgcTool} className="w-[100%] h-[100%] object-cover" />
              <div className="absolute left-0 bottom-0 w-[100%] h-[60px] flex items-center justify-center bg-black/50">
                <p className="text-sm font-bold leading-4.25 uppercase text-white">Coming Soon</p>
              </div>
            </div>
          </div>
        </AccountBlock>
      </div>
    </AccountCenterPageLayout>
  )
}
