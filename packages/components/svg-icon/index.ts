import SvgIcon from './svg-icon.vue'
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'

SvgIcon.install = (app: App) => {
  app.component(SvgIcon.name, SvgIcon)
}

export default SvgIcon as SFCWithInstall<typeof SvgIcon>