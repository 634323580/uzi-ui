<template>
  <container :routes="routes" :defaultActive="defaultActive" :asideWidth="300">
    <template #logo>logo</template>
    <!-- <template #header></template> -->
    {{ data }}
    <p v-for="(item, index) in 100" :key="index">{{ index }}</p>
  </container>
  <setting-panel :button="true" v-model="data" />
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { SIDEBAR_STYLE_KEY } from "../packages/index";

// 设置侧边栏样式
provide(SIDEBAR_STYLE_KEY, {
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

// setTimeout(() => {
//   data.value.menuHidden = true
// }, 2000)
const defaultActive = "/test/test2/test2-1";
const routes = ref([
  {
    path: "/page",
    name: "page",
    meta: {
      title: "page",
      icon: "_iconreturn",
    },
  },
  {
    path: "/test/",
    alwaysShow: true, // will always show the root menu
    name: "test",
    meta: {
      title: "test",
      icon: "Setting",
    },
    children: [
      {
        path: "https:www.baidu.com",
        name: "test1",
        meta: {
          title: "Page",
          icon: "_iconicon_shangsheng3x",
        },
      },
      {
        path: "test2/",
        name: "test2",
        meta: {
          title: "test2",
          icon: "_iconicon_tuijian",
        },
        children: [
          {
            path: "test2-1",
            name: "test2-1",
            meta: {
              title: "test2-1",
              icon: "_iconicon_xianshimianfei",
            },
          },
          {
            path: "test2-2",
            name: "test2-2",
            meta: {
              title: "test2-2",
              icon: "_iconreturn",
            },
          },
        ],
      },
      {
        path: "test3",
        name: "test3",
        meta: {
          title: "test3",
          icon: "_iconreturn",
        },
      },
    ],
  },
]);
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
