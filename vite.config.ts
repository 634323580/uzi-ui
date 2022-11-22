const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'packages')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'packages/index.ts'),
      // vue-container to vueContainer
      name: pkg.name.replace(/-\w/g, function (v) {
        return v.substring(1).toUpperCase()
      }),
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'lodash-es'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    dts({
      include: [
        'packages/**/*.ts',
        'packages/**/*.d.ts',
        'packages/**/*.tsx',
        'packages/**/*.vue'
      ]
    }),
    vue()
  ]
})
