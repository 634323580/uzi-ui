import Container from './container.vue'
import type { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'

Container.install = (app: App) => {
  app.component(Container.name, Container)
}

export * from './components/sidebar/sidebar'

export default Container as SFCWithInstall<typeof Container>