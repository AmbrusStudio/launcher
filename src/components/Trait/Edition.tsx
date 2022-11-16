import { TraitEdition } from '../../types'

/**
 * Edition Background
 * @param edition
 * @returns
 */
export const EditionBackground = (edition?: TraitEdition) => ({
  'bg-[#FFB600]': edition === TraitEdition.Gold,
  'bg-gradient-linear-[(90deg,_#FFB600_0%,_#EB456D_100%)]': edition === TraitEdition.ColdPlus,
  'bg-[#7024C4]': edition === TraitEdition.Rangers,
  'bg-gradient-linear-[(90deg,_#7024C4_0%,_#EB456D_100%)]': edition === TraitEdition.RangersPlus,
  'bg-gradient-linear-[(90deg,_#5C5C5C_0%,_#484848_100%)]': edition === TraitEdition.Ultimate,
})

/**
 * Edition Color
 * @param edition
 * @returns
 */
export const EditionColor = (edition?: TraitEdition) => ({
  'text-[#FFB600]': edition === TraitEdition.Gold,
  'bg-gradient-linear-[(90deg,_#FFB600_0%,_#EB456D_100%)] text-gradient-linear': edition === TraitEdition.ColdPlus,
  'text-[#7024C4]': edition === TraitEdition.Rangers,
  'bg-gradient-linear-[(90deg,_#7024C4_0%,_#EB456D_100%)] text-gradient-linear': edition === TraitEdition.RangersPlus,
  'text-[#505050]': edition === TraitEdition.Ultimate,
})

/**
 * Edition PureGold Color
 * @param state
 * @returns
 */
export const EditionPureGoldColor = (state: boolean) => ({
  'bg-gradient-linear-[(90deg,_#001AFF_0%,_#00D1FF_100%)] text-gradient-linear': state,
})
