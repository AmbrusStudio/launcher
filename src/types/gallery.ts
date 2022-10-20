import { Trait } from './metadata'
import { TokenMetadata } from './nft'

export type GALLERY_TRAIT_MAP = {
  trait: Map<Trait, string>
}

export type GALLERY_MAP = Omit<TokenMetadata, 'trait'> & GALLERY_TRAIT_MAP

export type GALLERY_FILTER_LIST = {
  label: string
  count: number
}

export type GALLERY_FILTER = {
  label: Trait
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
