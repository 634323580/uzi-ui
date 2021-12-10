<template>
  <div style="height: 100%">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="https:www.baidu.com"
        text-color="#fff"
        active-text-color="#ffd04b"
        background-color="#2D384B"
        :collapse="menuCollapsed"
        :collapse-transition="false"
      >
        <sidebar-item
          v-for="route in asyncRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          isRoot
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { Sidebar } from "./index";

import SidebarItem from "../sidebar/sidebar-item.vue";

import store from "../../store";

const menuCollapsed = computed(() => store.state.panelData.menuCollapsed);

const asyncRoutes: Sidebar[] = [
  {
    path: "/page",
    name: 'page',
    meta: {
      title: "page",
    },
  },
  {
    path: "/test/",
    alwaysShow: true, // will always show the root menu
    name: "test",
    meta: {
      title: "test",
    },
    children: [
      {
        path: "https:www.baidu.com",
        name: "test1",
        meta: {
          title: "Page",
        },
      },
      {
        path: "/test2/",
        name: "test2",
        meta: {
          title: "test2",
        },
      },
      {
        path: "test3",
        name: "test3",
        meta: {
          title: "test3",
        },
      },
    ],
  },
];
</script>

<style scoped lang="scss">
:deep(.el-menu) {
  border: none;
  width: 100% !important;
  .el-menu-item > div{
    display: flex !important;
    align-items: center;
  }
  .el-icon{
    width: auto !important;
  }
}
:deep(.el-menu--collapse) {
  .el-sub-menu {
    .el-sub-menu__title {
      & > span,
      & > .el-sub-menu__icon-arrow {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
    }
  }
}
</style>
