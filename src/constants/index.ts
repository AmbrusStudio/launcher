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
    BlindBoxMode: true,
    BlindBoxVideo: 'https://cdn.ambrus.studio/NFTs/Blindbox.mp4',
    BlindBoxPictures:
      'https://assets.raribleuserdata.com/testnet/v1/image/t_gif_preview/aHR0cHM6Ly9jZG4uYW1icnVzLnN0dWRpby9ORlRzL2JsaW5kYm94LmdpZg==',
  },
}
