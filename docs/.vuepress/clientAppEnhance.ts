import { defineClientAppEnhance } from '@vuepress/client'
import container from '../../dist/index.es'
import  '../../dist/style.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "https://at.alicdn.com/t/font_1881329_o5kiq6ywfhk.js?spm=a313x.7781069.1998910419.85&file=font_1881329_o5kiq6ywfhk.js";


export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(ElementPlus as any).use(container)
})