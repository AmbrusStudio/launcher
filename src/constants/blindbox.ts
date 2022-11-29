import { Goerli, Mainnet } from '@usedapp/core'

import { Trait, TraitName } from '../types'
import { getDefaultChainId } from '../utils'
import countdown from '../utils/countdown'

const defaultChainId = getDefaultChainId()

// Blind box
export const BlindBoxTrait = [Trait.Name]

/**
 * showBlindBoxMode
 * https://tool.chinaz.com/tools/unixtime.aspx
 * @param ms
 * @returns
 */
const showBlindBoxMode = (ms: number) => {
  const time = (countdown as countdown.CountdownStatic)(ms) as countdown.Timespan
  console.log('time', time)
  if (time.value) {
    return time.value < 0
  }
  return false
}

const BlindBoxModes = {
  [Mainnet.chainId]: {
    [TraitName.Rin]: false,
    [TraitName.Kit]: false,
  },
  [Goerli.chainId]: {
    [TraitName.Rin]: false,
    [TraitName.Kit]: showBlindBoxMode(1669704480000),
  },
}

export const Blindbox = {
  [TraitName.Rin]: {
    BlindBoxMode: BlindBoxModes[defaultChainId][TraitName.Rin],
    BlindBoxVideo: 'https://cdn.ambrus.studio/NFTs/Blindbox.mp4',
    BlindBoxPictures: 'https://cdn.ambrus.studio/NFTs/blind_box.jpg',
  },
  [TraitName.Kit]: {
    BlindBoxMode: BlindBoxModes[defaultChainId][TraitName.Kit],
    BlindBoxVideo: 'https://ambrus.s3.amazonaws.com/1667537607898_0.88_Blindbox.mp4',
    BlindBoxPictures: 'https://ambrus.s3.amazonaws.com/1667538431877_0.51_blindbox.gif',
  },
}
