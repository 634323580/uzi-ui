import { reactive } from 'vue'
import storage from 'good-storage'

export interface State {
  panelData: PanelData
}

export interface PanelData {
  [key: string]: any
}

const store = {
  debug: true,
  state: reactive<State>({
    panelData: storage.get('__panelData__', {
      fixedHeader: true
    })
  }),
  setPanelDataAction(newPanelData: PanelData) {
    this.state.panelData = newPanelData
    storage.set('__panelData__', newPanelData)
  }
}

export default store