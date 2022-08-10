export enum GALLERY_PROPERTY {
  Character = 'Character',
  Hair = 'Hair',
  FaceAccessories = 'Face Accessories',
  Eyes = 'Eyes',
  Makeup = 'Makeup',
  Earrings = 'Earrings',
  Hat = 'Hat',
  Skin = 'Skin',
  Tattoo = 'Tattoo',
  Clothing = 'Clothing',
  NeckAccessories = 'Neck Accessories',
  ShoulderAccessories = 'Shoulder Accessories',
  BackAccessories = 'Back Accessories',
}

export type GALLERY = {
  id: number
  image: string
  url: string
  property: {
    key: GALLERY_PROPERTY
    value: string
  }[]
}

export type GALLERY_FILTER_LIST = {
  label: string
  count: number
}

export type GALLERY_FILTER = {
  label: GALLERY_PROPERTY
  list: GALLERY_FILTER_LIST[]
}

export type GALLERY_INFO_TYPE = {
  title: string
  description: string
  opensea_url: string
}
