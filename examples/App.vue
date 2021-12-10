<template>
  <container
    ref="containerRef"
    :asideWidth="300"
  >
    {{ panelData }}
    <p v-for="(item, index) in 100" :key="index">{{ index }}</p>
  </container>
  <right-panel :button="true" :initPanelData="initPanelData" :initPanelSetting="initPanelSetting"/>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Setting } from '../dist/packages/components/right-panel'
const initPanelSetting: Setting[] = [
  {
    title: "自定义",
    desc: {
      sidebarLogo: {
        type: "el-switch",
        label: "sidebarLogo",
      },
      menuCollapsed: {
        type: "el-switch",
        label: "Menu Collapsed",
      }
    },
  },
];
const initPanelData = ref({
  fixedHeader: true,
  sidebarLogo: true,
  menuCollapsed: true,
  menuHidden: false
});
const containerRef = ref<any>(null);
const panelData = computed(() => {
  const containerReVal = containerRef.value
  return containerReVal ? containerReVal.panelData : {}
})
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
p {
  height: 30px;
  background: #e8e8e8;
  color: #333;
  margin: 10px 0;
}
</style>
