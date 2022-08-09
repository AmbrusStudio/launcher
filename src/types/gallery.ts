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
