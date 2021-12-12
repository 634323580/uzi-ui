<template>
  <container :asideWidth="300">
    {{ data }}
    <p v-for="(item, index) in 100" :key="index">{{ index }}</p>
  </container>
  <setting-panel
    :button="true"
    v-model="data"
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

const customSetting = [
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
const data = ref({
  fixedHeader: true,
  sidebarLogo: true,
  menuCollapsed: false,
  menuHidden: false,
  // menuLayout: "horizontal",
});

setTimeout(() => {
  data.value.menuHidden = true
}, 2000)
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
