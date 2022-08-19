import { NFT_TRAIT } from './nft'

export type GALLERY_TRAIT = {
  key: NFT_TRAIT
  value: string
}

export type GALLERY_TRAIT_MAP = {
  trait: Map<NFT_TRAIT, string>
}

export type GALLERY = {
  id: number
  image: string
  opensea_url: string
  looksrare_url: string
  etherscan_url: string
  trait: GALLERY_TRAIT[]
}

export type GALLERY_MAP = Omit<GALLERY, 'trait'> & GALLERY_TRAIT_MAP

export type GALLERY_FILTER_LIST = {
  label: string
  count: number
}

export type GALLERY_FILTER = {
  label: NFT_TRAIT
  list: GALLERY_FILTER_LIST[]
}

export type GALLERY_INFO_TYPE = {
  title: string
  description: string
  opensea_url: string
}

export type FilterList = GALLERY_FILTER_LIST & {
  is_checked: boolean
}

export type Filter = GALLERY_FILTER & {
  is_open: boolean
  list: FilterList[]
}
