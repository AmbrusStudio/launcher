import logo from '../../assets/images/logo.png'
import Opensea from '../../components/Icon/Opensea'
import { PageLayout } from '../../components/Layout'
import { GALLERYS } from '../../data'

const filters = [
  {
    label: 'Character',
    list: [
      {
        label: 'Rin',
        count: 1111,
      },
      {
        label: 'Kit',
        count: 1111,
      },
      {
        label: 'Thorn',
        count: 1111,
      },
    ],
  },
  {
    label: 'HAIR',
    list: [
      {
        label: 'Cool Girl - Black',
        count: 713,
      },
      {
        label: 'Cool Girl - Pink',
        count: 309,
      },
      {
        label: 'Cool Girl - Gold',
        count: 1,
      },
    ],
  },
  {
    label: 'FACE ACCESSORIES',
    list: [],
  },
  {
    label: 'EYES',
    list: [],
  },
  {
    label: 'MAKEUP',
    list: [],
  },
  {
    label: 'EARRINGS',
    list: [],
  },
  {
    label: 'HAT',
    list: [],
  },
  {
    label: 'SKIN',
    list: [],
  },
  {
    label: 'TATTOO',
    list: [],
  },
  {
    label: 'CLOTHING',
    list: [],
  },
  {
    label: 'NECK ACCESSORIES',
    list: [],
  },
  {
    label: 'SHOULDER ACCESSORIES',
    list: [],
  },
  {
    label: 'BACK ACCESSORIES',
    list: [],
  },
]

function Gallery() {
  return (
    <PageLayout>
      <div className="max-w-[1264px] m-x-auto mt-[188px]">
        <div className="flex justify-between">
          <img src={logo} className="w-[60px] h-[60px] mr-3 mt-[9px]" />
          <div>
            <p className="text-[64px] leading-[78px] font-bold uppercase text-white">E4C Rangers</p>
            <p className="text-[64px] leading-[78px] font-bold uppercase text-rust">Gallery</p>
          </div>
          <Opensea
            className="ml-auto mt-[3.75px]"
            sx={{
              fontSize: '52.5px',
            }}
          />
        </div>

        <div className="flex justify-between mt-[48px]">
          <div className="w-[300px]">
            <div className="w-[300px] h-[92px]  bg-black/20">
              <p className="text-4xl font-bold text-left uppercase text-white">#</p>
              <p className="opacity-20 text-4xl font-bold text-left uppercase text-white">ID</p>
            </div>
            <div className="w-[300px] h-[60px]">
              <div className="border-y-2 border-rust p-y-4 text-xl font-bold text-left uppercase text-white">
                Filters
              </div>
            </div>
            {filters.map((item, index) => (
              <div className="h-[50px]" key={index}>
                <div className="h-[49px] "></div>
                <div className="h-px bg-[#465358]"></div>
                <p className="text-sm text-left uppercase text-white">{item.label}</p>
                <p className="text-xs font-light text-right uppercase text-white">􀅽</p>
              </div>
            ))}
            {/* <div className="w-[300px] h-[42px] absolute left-[88px] top-[512px]">
            <div className="w-[300px] h-[41px] absolute left-[-1px] top-[-1px] bg-black"></div>
            <div className="w-[300px] h-px absolute left-[-1px] top-10 bg-[#2a2a2a]"></div>
            <p className="absolute left-[274px] top-3.5 text-xs text-left text-[#ff4125]">􀆅</p>
            <div className="flex justify-start items-start absolute left-3 top-3 gap-1">
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Rin</p>
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white/50">(1,111)</p>
            </div>
          </div>
          <div className="w-[300px] h-[42px] absolute left-[88px] top-[554px]">
            <div className="w-[300px] h-[41px] absolute left-[-1px] top-[-1px] bg-black"></div>
            <div className="w-[300px] h-px absolute left-[-1px] top-10 bg-[#2a2a2a]"></div>
            <div className="flex justify-start items-start absolute left-3 top-3 gap-1">
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Kit</p>
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white/50">(1,111)</p>
            </div>
          </div> */}
            {/* <div className="w-[300px] h-[42px] absolute left-[88px] top-[596px]">
            <div className="w-[300px] h-[41px] absolute left-[-1px] top-[-1px] bg-black"></div>
            <div className="w-[300px] h-px absolute left-[-1px] top-10 bg-[#2a2a2a]"></div>
            <div className="flex justify-start items-start absolute left-3 top-3 gap-1">
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Thorn</p>
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white/50">(1,111)</p>
            </div>
          </div>
          <div className="w-[300px] h-[42px] absolute left-[88px] top-[689px]">
            <div className="w-[300px] h-[41px] absolute left-[-1px] top-[-1px] bg-black"></div>
            <div className="w-[300px] h-px absolute left-[-1px] top-10 bg-[#2a2a2a]"></div>
            <p className="absolute left-[274px] top-3.5 text-xs text-left text-[#ff4125]">􀆅</p>
            <div className="flex justify-start items-start absolute left-3 top-3 gap-1">
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Cool Girl - Black</p>
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white/50">(713)</p>
            </div>
          </div>
          <div className="w-[300px] h-[42px] absolute left-[88px] top-[731px]">
            <div className="w-[300px] h-[41px] absolute left-[-1px] top-[-1px] bg-black"></div>
            <div className="w-[300px] h-px absolute left-[-1px] top-10 bg-[#2a2a2a]"></div>
            <div className="flex justify-start items-start absolute left-3 top-3 gap-1">
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Cool Girl - Pink</p>
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white/50">(309)</p>
            </div>
          </div>
          <div className="w-[300px] h-[42px] absolute left-[88px] top-[773px]">
            <div className="w-[300px] h-[41px] absolute left-[-1px] top-[-1px] bg-black"></div>
            <div className="w-[300px] h-px absolute left-[-1px] top-10 bg-[#2a2a2a]"></div>
            <div className="flex justify-start items-start absolute left-3 top-3 gap-1">
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white">Cool Girl - Gold</p>
              <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-white/50">(1)</p>
            </div>
          </div> */}
          </div>
          <div>
            <div className="flex items-center	justify-between">
              <div className="w-[120px] h-8 rounded-2xl bg-white/10 flex items-center justify-center">
                <p className="text-sm font-medium text-center leading-4.25 text-white">Reset Filters</p>
              </div>
              <p className="text-sm font-medium leading-4.25 text-white">7,777 items</p>
            </div>
            <div className="w-[928px] grid grid-cols-4 gap-3 mt-6">
              {GALLERYS.map((gallery, index) => (
                <div key={index} className="w-[223px] h-[223px] rounded overflow-hidden relative">
                  <img src={gallery.image} className="w-[100%] h-[100%] object-cover" />
                  <p className="absolute left-3 bottom-3 text-sm font-bold leading-4.25 uppercase text-white">
                    #{gallery.id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Gallery
