import { Trait, TraitEdition, TraitName } from '../types'

/** Local Storage Key Access Token */
export const LSK_ACCESS_TOKEN = 'access_token'
/** Local Storage Key Immutable X Wallet Info */
export const LSK_IMX_WALLET_INFO = 'imx_wallet_info'

// Blind box
export const BlindBoxTrait = [Trait.Name]

export const Blindbox = {
  [TraitName.Rin]: {
    BlindBoxMode: false,
    BlindBoxVideo: 'https://cdn.ambrus.studio/NFTs/Blindbox.mp4',
    BlindBoxPictures: 'https://cdn.ambrus.studio/NFTs/blind_box.jpg',
  },
  [TraitName.Kit]: {
    BlindBoxMode: false,
    BlindBoxVideo: 'https://ambrus.s3.amazonaws.com/1667537607898_0.88_Blindbox.mp4',
    BlindBoxPictures: 'https://ambrus.s3.amazonaws.com/1667538431877_0.51_blindbox.gif',
  },
}

/**
 * Role Number <Rin | Kit>
 */
export const RoleNumber = {
  [TraitEdition.Gold]: {
    [TraitName.Rin]: {
      start: 1,
      end: 450,
    },
    [TraitName.Kit]: {
      start: 451,
      end: 900,
    },
  },
  [TraitEdition.Rangers]: {
    [TraitName.Rin]: {
      start: 1,
      end: 646,
    },
    [TraitName.Kit]: {
      start: 647,
      end: 1292,
    },
  },
  [TraitEdition.Ultimate]: {
    [TraitName.Rin]: {
      start: 1,
      end: 15,
    },
    [TraitName.Kit]: {
      start: 16,
      end: 30,
    },
  },
}
