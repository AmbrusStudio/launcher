import RollupInject from '@rollup/plugin-inject'
import react from '@vitejs/plugin-react'
// Switch from @esbuild-plugins/node-modules-polyfill to node-stdlib-browser because of https://github.com/remorses/esbuild-plugins/issues/14
import NodeStdLibBrowser from 'node-stdlib-browser'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...RollupInject({
        global: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'global'],
        process: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'process'],
        Buffer: [require.resolve('node-stdlib-browser/helpers/esbuild/shim'), 'Buffer'],
      }),
      enforce: 'post',
    },
    react(),
    Unocss(),
  ],
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  resolve: {
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
    alias: NodeStdLibBrowser,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
