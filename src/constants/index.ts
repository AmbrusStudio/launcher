import { Trait, TraitName } from '../types'

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
