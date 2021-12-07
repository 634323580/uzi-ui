import { reactive } from 'vue'
import storage from 'good-storage'
import { SettingData } from './types/right-panel'
export interface State {
  panelData: SettingData
}

const store = {
  debug: true,
  state: reactive<State>({
    panelData: {
      sidebarLogo: true,
      contentWidth: "fullWidth",
      appBarType: 'fixed',
      footerType: 'static',
      menuLayout: 'vertical',
      menuCollapsed: false,
      menuHidden: false,
      ...storage.get('__panelData__', {})
    }
  }),
  setPanelDataAction(newPanelData: SettingData, cacheKey?: string, cacheValue?: any) {
    console.log(1)
    if(cacheKey) {
      let cacheData = storage.get<{[propName: string]: any}>('__panelData__', {})
      cacheData[cacheKey] = cacheValue
      storage.set('__panelData__', cacheData);
    }
    this.state.panelData = newPanelData
  }
}

export default store