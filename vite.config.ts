import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

// https://github.com/AmbrusStudio/Website/blob/mint/vite.config.ts
const production = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss(),
    !production &&
      nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')],
      }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
    // https://github.com/vitejs/vite/discussions/4479
    alias: {
      stream: 'stream-browserify',
      https: 'agent-base',
      http: 'agent-base',
      util: 'util',
    },
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
