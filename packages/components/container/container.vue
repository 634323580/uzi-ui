<template>
  <div class="container">
    <!-- aside -->
    <transition name="slide-left">
      <div
        v-if="!panelData.menuHidden && panelData.menuLayout !== 'horizontal'"
        :style="asideStyle"
        class="container__aside"
      >
        <sidebar v-bind="$attrs"></sidebar>
      </div>
    </transition>
    <!-- mainLayout -->
    <div :style="mainLayoutStyle" class="container__main">
      <!-- header -->
      <div :class="panelData.appBarType" class="container__header">
        <div :class="panelData.contentWidth">
          <sidebar
            v-bind="$attrs"
            v-if="!panelData.menuHidden && panelData.menuLayout !== 'vertical'"
            mode="horizontal"
          ></sidebar>
          <slot name="header"></slot>
        </div>
      </div>
      <div class="container__content">
        <div class="content-width" :class="panelData.contentWidth">
          <slot></slot>
        </div>
        <!-- footer -->
        <transition name="slide-bottom">
          <div
            v-if="panelData.footerType !== 'hidden'"
            :class="panelData.footerType"
            class="container__footer"
          >
            <div :class="panelData.contentWidth">
              <slot name="footer"></slot>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'container',
  inheritAttrs: false
})
</script>
<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from './components/sidebar/sidebar.vue'
import store from '@/components/setting-panel/store'

interface Props {
  asideWidth?: number
  asideCollapsedWidth?: number
}
const props = withDefaults(defineProps<Props>(), {
  asideWidth: 200,
  asideCollapsedWidth: 60
})

// 设置面板数据
const panelData = computed(() => store.state.panelData)
// 侧边栏样式
const asideStyle = computed(() => {
  const { menuCollapsed } = panelData.value
  const { asideWidth, asideCollapsedWidth } = props
  return {
    width: (menuCollapsed ? asideCollapsedWidth : asideWidth) + 'px'
  }
})
// 主要内容外框样式
const mainLayoutStyle = computed(() => {
  const { menuCollapsed, menuHidden, menuLayout } = panelData.value
  const { asideWidth, asideCollapsedWidth } = props
  let marginLeft = ''
  if (!menuHidden && menuLayout !== 'horizontal') {
    marginLeft = (menuCollapsed ? asideCollapsedWidth : asideWidth) + 'px'
  }
  return {
    marginLeft
  }
})
</script>

<style lang="scss" scoped>
%boxed {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}
.container__aside {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  width: 200px;
  transition: width 0.2s ease;
}
.container__main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: 0.2s ease;
}
.container__content,
.container__header {
  background-color: #b3c0d1;
  &.fixed {
    position: sticky;
    top: 0;
    z-index: 998;
  }
  .boxed {
    @extend %boxed;
  }
}
.container__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #e9eef3;
  .boxed {
    @extend %boxed;
  }
}

.container__footer {
  background-color: #b3c0d1;
  &.fixed,
  &.hidden {
    position: sticky;
    bottom: 0;
    z-index: 998;
  }
  .boxed {
    @extend %boxed;
  }
}

.slide-bottom-enter-active,
.slide-left-enter-active {
  transition: 0.2s ease;
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  transform: translate3d(0, 100%, 0);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}
</style>
