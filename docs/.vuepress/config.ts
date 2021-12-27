import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const { path } = require('@vuepress/utils')


export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: 'en-US',
  title: 'Vue Container',
  description: 'Just playing around',
  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [],
   // 侧边栏数组
    // 所有页面会使用相同的侧边栏
    sidebar: [
      // SidebarItem
      {
        text: '指南',
        children: [
          '/guide/getting-started',
        ],
      },
      {
        text: '组件',
        children: [
          '/components/container',
          '/components/setting-panel',
          '/components/svg-icon'
        ],
      },
    ],
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    ['@vuepress/search', {
      searchMaxSuggestions: 10
    }],
    '@vuepress/back-to-top'
  ],
})