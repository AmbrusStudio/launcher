import { defineConfig, presetUno, presetWebFonts, transformerDirectives } from 'unocss'

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
  ],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      rust: '#FF4125',
      greyDark: '#465358',
      greyLight: '#A8A8A8',
      greyMedium: '#A0A4B0',
      blackBg: '#2A2A2A',
      ligntGreen: '#CCFF00',
      gameNavImg: 'linear-gradient(180deg, #3F3F3F 0%, #444444 100%)',
      metamask: '#F6851B',
    },
    boxShadow: {
      'nft-sale': '0px 4px 12px rgba(0, 0, 0, 0.15)',
    },
    dropShadow: {
      'nft-modal': '0px 4px 24px rgba(0, 0, 0, 0.4)',
    },
  },
})
