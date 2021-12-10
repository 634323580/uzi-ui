import { reactive } from 'vue'
import storage from 'good-storage'
import { SettingData } from '@/components/right-panel/'
export interface State {
  panelData: SettingData
}

const store = {
  debug: true,
  state: reactive<State>({
    panelData: {}
  }),
  /**
   * @description 修改panelData，缓存数据到本地
   * @param { string } cacheKey 需要缓存的key
   * @param { any } cacheValue 需要缓存的值
   */
  setPanelDataAction(newPanelData: SettingData, cacheKey?: string, cacheValue?: any) {
    if(cacheKey) {
      let cacheData = storage.get<SettingData>('__panelData__', {})
      cacheData[cacheKey] = cacheValue
      storage.set('__panelData__', cacheData);
    }
    this.state.panelData = newPanelData
  }
}

export default store