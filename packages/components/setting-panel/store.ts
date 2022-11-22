import { reactive } from 'vue'
import storage from 'good-storage'
import { CATCH_KEY, SettingData } from '@/components/setting-panel'

export interface State {
  panelData: SettingData
}

const store = {
  debug: process.env.NODE_ENV === 'development',
  state: reactive<State>({
    panelData: {}
  }),
  /**
   * @description 修改panelData，缓存数据到本地
   * @param { string } cacheKey 需要缓存的key
   * @param { any } cacheValue 需要缓存的值
   */
  setPanelDataAction(
    newPanelData: SettingData,
    cacheKey?: string,
    cacheValue?: any
  ) {
    if (cacheKey) {
      const cacheData = storage.get<SettingData>(CATCH_KEY, {})
      cacheData[cacheKey] = cacheValue
      storage.set(CATCH_KEY, cacheData)
    }
    this.state.panelData = newPanelData
  }
}

export default store
