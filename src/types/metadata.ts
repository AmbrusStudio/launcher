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
}

export type TraitItem = { trait_type: Trait; value: string }

export type Metadata = {
  name: string
  description: string
  image: string
  attributes: TraitItem[]
}
