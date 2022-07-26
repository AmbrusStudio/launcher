import logo from '../../../assets/images/logo.png'
import { GALLERY_INFO } from '../../../data'
import Opensea from '../../Icon/Opensea'

const GalleryHead = () => {
  return (
    <div className="flex justify-between">
      <img src={logo} className="hidden lg:block w-[60px] h-[60px] mr-3 mt-[9px]" />
      <div>
        <p className="text-[32px] lg:text-[64px] leading-[39px] lg:leading-[78px] font-bold uppercase text-white">
          {GALLERY_INFO.title}
        </p>
        <p className="text-[32px] lg:text-[64px] leading-[39px] lg:leading-[78px] font-bold uppercase text-rust">
          {GALLERY_INFO.description}
        </p>
      </div>
      <a
        href={GALLERY_INFO.opensea_url}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto mt-[3.75px] block w-[31.5px] h-[31.5px] lg:w-[52.5px] lg:h-[52.5px]"
      >
        <Opensea className="!text-[31.5px] !lg:text-[52.5px]" />
      </a>
    </div>
  )
}

export default GalleryHead
