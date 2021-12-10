<template>
  <container ref="containerRef" :asideWidth="300">
    {{ panelData }}
    <p v-for="(item, index) in 100" :key="index">{{ index }}</p>
  </container>
  <right-panel
    :button="true"
    :initPanelData="initPanelData"
  />
</template>

<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { SIDEBAR_STYLE_KEY } from "../packages/index";

// 设置侧边栏样式
provide(SIDEBAR_STYLE_KEY, {
  defaultActive: "https:www.baidu.com",
  backgroundColor: "#334154",
  textColor: "#fff",
  activeTextColor: "#ffd04b",
  subBackgroundColor: "#222d3c",
  subBackgroundHoverColor: "#001528",
});

const initPanelSetting = [
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
      },
    },
  },
];
const initPanelData = ref({
  fixedHeader: true,
  sidebarLogo: true,
  menuCollapsed: false,
  menuHidden: false,
  // menuLayout: "horizontal",
});
const containerRef = ref<any>(null);
const panelData = computed(() => {
  const containerReVal = containerRef.value;
  return containerReVal ? containerReVal.panelData : {};
});
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
