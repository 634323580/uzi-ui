<template>
  <div class="container">
    <!-- aside -->
    <div v-if="!panelData.menuHidden" :style="asideStyle" class="container__aside">Aside</div>
    <!-- mainLayout -->
    <div :style="mainLayoutStyle" class="container__main">
      <!-- header -->
      <div :class="panelData.appBarType" class="container__header">
        <div :class="panelData.contentWidth" style="height: 60px">header</div>
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
            <div :class="panelData.contentWidth" style="height: 60px">
              footer
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <right-panel v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "container",
});
</script>
<script setup lang="ts">
import { computed } from "vue";
import rightPanel from "./components/right-panel.vue";
import store from "./store";

interface Props {
  asideWidth?: string;
  asideCollapsedWidth?: string;
}
const props = withDefaults(defineProps<Props>(), {
  asideWidth: "200px",
  asideCollapsedWidth: "60px",
});

// 设置面板数据
const panelData = computed(() => store.state.panelData);
// 侧边栏样式
const asideStyle = computed(() => {
  const { menuCollapsed } = panelData.value;
  const { asideWidth, asideCollapsedWidth } = props;
  return {
    width: menuCollapsed ? asideCollapsedWidth : asideWidth
  };
});
// 主要内容外框样式
const mainLayoutStyle = computed(() => {
  const { menuCollapsed, menuHidden } = panelData.value;
  const { asideWidth, asideCollapsedWidth } = props;
  let marginLeft = "";
  if (!menuHidden) {
    if (menuCollapsed) {
      marginLeft = asideCollapsedWidth;
    } else {
      marginLeft = asideWidth;
    }
  }
  return {
    marginLeft,
  };
});

defineExpose({
  panelData,
});
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
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  transition: 0.3s ease;
}
.container__main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: 0.3s ease;
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
.slide-bottom-leave-active {
  transition: 0.3s ease;
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  transform: translate3d(0, 100%, 0);
}
</style>
