import { handler } from '@unocss/preset-mini/utils'
import { defineConfig, presetUno, presetWebFonts, transformerDirectives } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Montserrat',
        montserrat: {
          name: 'Montserrat',
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          italic: true,
        },
      },
    }),
    presetScrollbar({
      // config
    }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      rust: '#FF4125',
      rustDark: '#B7220C',
      rustLight: '#FF5940',
      greyDark: '#465358',
      greyLight: '#A8A8A8',
      greyMedium: '#A0A4B0',
      greyBorder: '#F0F0F0',
      blackBg: '#2A2A2A',
      ligntGreen: '#CCFF00',
      metamask: '#F6851B',
      tips: '#4A4A4A',
      card: '#333333',
    },
    boxShadow: {
      'nft-sale': '0px 4px 12px rgba(0, 0, 0, 0.15)',
      'statusCheck-drawer-modal': '0px -4px 8px rgba(0, 0, 0, 0.2)',
      'sidebar-nav-item': '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    dropShadow: {
      'nft-modal': '0px 4px 24px rgba(0, 0, 0, 0.4)',
      'statusCheck-head-modal': '0px 4px 8px rgba(0, 0, 0, 0.2)',
      'wallet-popover': '0px 4px 10px rgba(0, 0, 0, 0.2)',
      'account-info': 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
      'account-nav': 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
    },
  },
  rules: [
    [
      /^bg-gradient-(?:repeating-)?linear-(.+)$/,
      ([, s]) => ({
        'background-image': `linear-gradient${handler.bracket(s)}`,
      }),
    ],
  ],
})
