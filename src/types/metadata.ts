// Fixed sort order
export enum Trait {
  Name = 'Name',
  Edition = 'Edition',
  Zodiac = 'Zodiac',
  Hair = 'Hair',
  Earrings = 'Earrings',
  Eyes = 'Eyes',
  Makeup = 'Makeup',
  Mask = 'Mask',
  RoboticArms = 'Robotic Arms',
  ShoulderArmor = 'Shoulder Armor',
  Jacket = 'Jacket',
  Weapon = 'Weapon',
  WaistAccessory = 'Waist Accessory',
  Background = 'Background',
  Particles = 'Particles',
  OneOfOne = 'One of One', // Ultimate
}

export type TraitItem = { trait_type: Trait; value: string }

export type Metadata = {
  name: string
  description: string
  image: string
  trait: TraitItem[]
}

export type MetadataResponse = {
  name: string
  description: string
  image: string
  attributes: TraitItem[]
}

export enum TraitName {
  Rin = 'Rin',
  Kit = 'Kit',
}

// reference status https://docs.x.immutable.com/docs/how-to-get-data#get-details-about-a-collection
export enum MetadataStatus {
  'Ethereum' = 'Ethereum',
  'ImmutableX' = 'ImmutableX',
}
