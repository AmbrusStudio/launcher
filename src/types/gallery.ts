export type GALLERY = {
  id: number
  image: string
}

export type GALLERY_FILTER_LIST = {
  label: string
  count: number
}

export type GALLERY_FILTER = {
  label: string
  list: GALLERY_FILTER_LIST[]
}
