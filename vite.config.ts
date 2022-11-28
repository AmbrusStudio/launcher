import RollupInject from '@rollup/plugin-inject'
import react from '@vitejs/plugin-react'
// Switch from @esbuild-plugins/node-modules-polyfill to node-stdlib-browser because of https://github.com/remorses/esbuild-plugins/issues/14
import NodeStdLibBrowser from 'node-stdlib-browser'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

// hhttps://github.com/vitejs/vite/issues/2906#issuecomment-816797355
const vendor = {
  'vendor-react': [
    'react',
    'react-dom',
    'react-router-dom',
    'redux',
    'react-redux',
    'redux-persist',
    '@reduxjs/toolkit',
  ],
  // 'vendor-ui': ['@mui/material', '@emotion/react', '@emotion/styled', '@headlessui/react', 'notistack'],
  // 'vendor-util': [
  //   'lodash',
  //   'ahooks',
  //   '@ahooksjs/use-url-state',
  //   'bignumber.js',
  //   'axios',
  //   'ethers',
  //   'numbro',
  //   '@sentry/react',
  //   '@sentry/tracing',
  //   'react-hook-form',
  // ],
}

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
    chunkSplitPlugin({
      strategy: 'single-vendor',
      customSplitting: vendor,
    }) as unknown as Plugin,
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
