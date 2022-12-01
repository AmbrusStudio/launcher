import { Trait } from './metadata'
import { TokenMetadata } from './nft'

export type GALLERY_TRAIT_MAP = {
  trait: Map<Trait, string>
}

export type GALLERY_MAP = Omit<TokenMetadata, 'trait'> & GALLERY_TRAIT_MAP

export type GALLERY_INFO_TYPE = {
  title: string
  description: string
  opensea_url: string
}

export type FilterList = {
  label: string
  count: number
  isChecked: boolean
}

export type Filter = {
  label: string
  isOpen: boolean
  list: FilterList[]
}
