import { NFT_TRAIT } from './nft'

export type GALLERY = {
  id: number
  image: string
  opensea_url: string
  looksrare_url: string
  etherscan_url: string
  property: {
    key: NFT_TRAIT
    value: string
  }[]
}

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
