// Fixed sort order
export enum Trait {
  Name = 'Name',
  Edition = 'Edition',
  Zodiac = 'Zodiac',
  OneOfOne = 'One of One',
  Hair = 'Hair',
  Earrings = 'Earrings',
  Eyes = 'Eyes',
  Makeup = 'Makeup',
  Mask = 'Mask',
  RoboticArms = 'Robotic Arms',
  ShoulderArmor = 'Shoulder Armor',
  Jacket = 'Jacket',
  Body = 'Body',
  ArmAccessory = 'Arm Accessory',
  WristAccessory = 'Wrist Accessory',
  Weapon = 'Weapon',
  WaistAccessory = 'Waist Accessory',
  Pants = 'Pants',
  Background = 'Background',
  Particles = 'Particles',
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
