<template>
  <container
    ref="containerRef"
    asideWidth="200px"
    asideCollapsedWidth="60px"
    :initPanelData="initPanelData"
    :initPanelSetting="initPanelSetting"
  >
    {{ panelData }}
    <p v-for="(item, index) in 100" :key="index">{{ index }}</p>
  </container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const initPanelSetting = [
  {
    title: "自定义",
    desc: {
      sidebarLogo: {
        type: "el-switch",
        label: "Fixed Header",
      },

    },
  },
];
const initPanelData = ref({
  fixedHeader: true,
  sidebarLogo: true,
  menuCollapsed: false,
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
