import GameBackgroundFA from '../assets/images/games/game-background-fa.jpeg'
import GameBackgroundFA2x from '../assets/images/games/game-background-fa@2x.jpeg'
import GameBackgroundFA3x from '../assets/images/games/game-background-fa@3x.jpeg'
import GameBannerFA from '../assets/images/games/game-banner-fa.png'
import GameBannerFA2x from '../assets/images/games/game-banner-fa@2x.png'
import GameBannerFA3x from '../assets/images/games/game-banner-fa@3x.png'
import GameIconFA from '../assets/images/games/game-icon-fa.png'
import { GameInfo } from '../types'

export const ALL_GAMES: GameInfo[] = [
  {
    id: 2,
    active: true,
    name: 'E4C Fallen Arena',
    type: 'client',
    icon: { src: GameIconFA, activeColor: '#465358' },
    banner: [GameBannerFA, GameBannerFA2x, GameBannerFA3x],
    background: [GameBackgroundFA, GameBackgroundFA2x, GameBackgroundFA3x],
    download: {
      win: 'https://download.ambrus.studio/Win/index.html',
      mac: 'https://download.ambrus.studio/Mac/index.html',
    },
  },
]
