import { Metadata } from '../types'
import metadadaGoldEdition from './Gold_Edition/E4C_Rangers.json'
import metadadaRangersEdition from './Rangers_Edition/E4C_Rangers.json'

// ALL Edition
// Gold Trait 14
// Rangers Trait 15(one more "Particles" trait)
export const METADATA_ALL: Metadata[] = [...metadadaGoldEdition, ...metadadaRangersEdition] as Metadata[]

// Gold Edition
export const METADATA_GOLD: Metadata[] = metadadaGoldEdition as Metadata[]

// Rangers Edition
export const METADATA_RANGERS: Metadata[] = metadadaRangersEdition as Metadata[]
