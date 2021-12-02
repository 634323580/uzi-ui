<template>
  <div class="container">
    <div class="container__aside">Aside</div>
    <div class="container__main">
      <div
        :class="{ fixedHeader: panelData.fixedHeader }"
        class="container__header"
      >
        header
      </div>
      <div class="container__content">
        <div>
          {{ panelData }}
          <slot></slot>
        </div>
        <div
          :class="{ fixedFooter: panelData.fixedFooter }"
          class="container__footer"
        >
          footer
        </div>
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
const panelData = computed(() => store.state.panelData);
</script>

<style lang="scss" scoped>
.container__aside {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 9;
  width: 200px;
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  transition: 0.3s ease;
}
.container__main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 200px;
}
.container__content,
.container__header {
  background-color: #b3c0d1;
  min-height: 60px;
  &.fixedHeader {
    position: sticky;
    top: 0;
    z-index: 999;
  }
}
.container__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #e9eef3;
}

.container__footer {
  background-color: #b3c0d1;
  min-height: 60px;
  &.fixedFooter {
    position: sticky;
    bottom: 0;
    z-index: 999;
  }
}
</style>
