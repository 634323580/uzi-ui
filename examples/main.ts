import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import components from '../lib'

// import components from 'components'
// import 'components/dist/style.css'

createApp(App).use(ElementPlus).use(components).mount('#app')
