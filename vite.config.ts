import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import ModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'
import react from '@vitejs/plugin-react'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Unocss()],
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
        ModulesPolyfills(),
      ],
    },
  },
  resolve: {
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
    // https://github.com/vitejs/vite/discussions/4479 and https://medium.com/@ftaioli/using-node-js-builtin-modules-with-vite-6194737c2cd2
    alias: {
      stream: 'stream-browserify',
      https: 'agent-base',
      http: 'agent-base',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
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
