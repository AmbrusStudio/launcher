import styled from '@emotion/styled'

import { IconAmbrus } from '../../Icon/Ambrus'
import { SocialNav } from '../SocialNav'
import { FooterNavItem } from './FooterNavItem'
import { ImageAmbrusStudio } from './ImageAmbrusStudio'
import { NewsletterSubscribe } from './NewsletterSubscribe'

const Footer = styled.footer`
  @media (max-width: 1280px) {
    padding-bottom: calc(222px + constant(safe-area-inset-bottom));
    padding-bottom: calc(222px + env(safe-area-inset-bottom));
  }
  @media (max-width: 768px) {
    padding-bottom: calc(144px + constant(safe-area-inset-bottom));
    padding-bottom: calc(144px + env(safe-area-inset-bottom));
  }
`

export function PageFooter() {
  return (
    <Footer className="p-24px xl:py-48px xl:px-0 bg-grey-dark">
      <div className="flex flex-col max-w-1264px mx-auto">
        <div className="flex flex-col xl:flex-row justify-between items-center mb-36px xl:mb-42px">
          <div className="flex flex-col xl:flex-row flex-nowrap items-center mb-36px xl:m-0 w-full xl:w-auto">
            <div className="flex flex-row flex-nowrap items-center w-full">
              <IconAmbrus className="!h-60px !w-60px xl:!h-118px xl:!w-118px text-white xl:mr-24px" />
              <p className="xl:hidden flex-1 font-medium text-14px leading-28px text-white text-center uppercase">
                Newsletter
              </p>
            </div>
            <NewsletterSubscribe />
          </div>
          <SocialNav />
        </div>
        <div className="mx-auto mb-24px xl:mb-36px">
          <ImageAmbrusStudio />
        </div>
        <nav className="flex flex-row flex-nowrap justify-center items-center mb-24px xl:mb-12px" title="Footer Nav">
          <FooterNavItem to="https://example.com" name="Terms of Service" />
          <FooterNavItem to="https://example.com" name="Privacy Policy" />
          <FooterNavItem to="https://example.com" name="Get Help" />
        </nav>
        <div className="font-normal text-12px text-center text-white">© 2021 Ambrus Studio</div>
      </div>
    </Footer>
  )
}
