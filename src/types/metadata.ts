export enum Trait {
  WaistAccessory = 'Waist Accessory',
  Background = 'Background',
  Earrings = 'Earrings',
  Eyes = 'Eyes',
  Hair = 'Hair',
  Jacket = 'Jacket',
  Makeup = 'Makeup',
  Mask = 'Mask',
  Particles = 'Particles',
  RoboticArms = 'Robotic Arms',
  ShoulderArmor = 'Shoulder Armor',
  Weapon = 'Weapon',
  Edition = 'Edition',
  Zodiac = 'Zodiac',
}

export type TraitItem = { trait_type: Trait; value: string }

export type Metadata = {
  name: string
  description: string
  image: string
  attributes: TraitItem[]
}
