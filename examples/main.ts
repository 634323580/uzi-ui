import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import components from '../packages'

// iconfont字体
import 'https://at.alicdn.com/t/font_1881329_o5kiq6ywfhk.js?spm=a313x.7781069.1998910419.85&file=font_1881329_o5kiq6ywfhk.js'
// element-plus/icons
import {
  Setting,
} from "@element-plus/icons";

// import components from 'components'
// import 'components/dist/style.css'

createApp(App).use(ElementPlus).use(components).component('Setting', Setting).mount('#app')
