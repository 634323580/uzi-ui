import SettingPanel from './setting-panel.vue'
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'

SettingPanel.install = (app: App) => {
  app.component(SettingPanel.name, SettingPanel)
}

export * from './setting-panel'

export default SettingPanel as SFCWithInstall<typeof SettingPanel>
