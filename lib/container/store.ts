import { reactive } from 'vue'

export interface State {
  panelData: PanelData
}

export interface PanelData {
  [key: string]: any
}

const store = {
  debug: true,
  state: reactive<State>({
    panelData: {
      fixedHeader: true
    }
  }),
  setPanelDataAction(newPanelData: PanelData) {
    this.state.panelData = newPanelData
  }
}

export default store