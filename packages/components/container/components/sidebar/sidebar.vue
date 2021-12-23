<template>
  <div class="sidebar-wrapper">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="logo" v-if="showLogo">
        <transition name="logo-fade" mode="out-in">
          <img
            v-if="!menuCollapsed"
            :src="styleConfig.logo || styleConfig.collapsedLogo"
          />
          <img
            v-else
            :src="styleConfig.collapsedLogo || styleConfig.logo"
          />
        </transition>
      </div>
      <el-menu
        v-bind="styleConfig"
        :defaultActive="defaultActive"
        :collapse="menuCollapsed"
        :collapse-transition="false"
        :mode="mode"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject } from "vue";
import { SidebarItemProps, SIDEBAR_STYLE_KEY } from "./sidebar";
import SidebarItem from "../sidebar/sidebar-item.vue";
import store from "@/components/setting-panel/store";

interface Props {
  mode?: "vertical" | "horizontal";
  routes?: SidebarItemProps[];
  defaultActive?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mode: "vertical",
});

interface Config {
  logo?: string;
  collapsedLogo?: string;
  textColor?: string;
  activeTextColor?: string;
  backgroundColor?: string;
  subBackgroundColor?: string;
  subHoverBackgroundColor?: string;
}

const defaultConfig: Config = {
  backgroundColor: "#334154",
  textColor: "#fff",
  activeTextColor: "#ffd04b",
  subBackgroundColor: "#222d3c",
  subHoverBackgroundColor: "#001528",
};

const config = inject<Config>(SIDEBAR_STYLE_KEY, {});

const styleConfig = computed<Config>(() => {
  return {
    ...defaultConfig,
    ...config,
  };
});

const menuCollapsed = computed(() => store.state.panelData.menuCollapsed);

const sidebarLogo = computed(() => store.state.panelData.sidebarLogo);

const showLogo = computed(() => {
  const styleConfigVal = styleConfig.value
  return props.mode === 'vertical' && sidebarLogo.value && (styleConfigVal.logo || styleConfigVal.collapsedLogo)
})

</script>

<style scoped lang="scss">
.sidebar-wrapper {
  height: 100%;
  background: v-bind("styleConfig.backgroundColor");
}
:deep(.el-menu) {
  border: none;
  width: 100% !important;
  .el-icon {
    width: auto !important;
  }
  .el-sub-menu__title:hover {
    background: var(--el-menu-hover-bg-color) !important;
  }
}
:deep(.el-sub-menu) {
  .el-menu {
    .el-menu-item {
      background: v-bind("styleConfig.subBackgroundColor") !important;
      &:hover {
        background: v-bind("styleConfig.subHoverBackgroundColor") !important;
      }
    }
  }
  .el-sub-menu {
    .el-sub-menu__title {
      background-color: v-bind("styleConfig.subBackgroundColor") !important;
      &:hover {
        background-color: v-bind(
          "styleConfig.subHoverBackgroundColor"
        ) !important;
      }
    }
  }
}
:deep(.el-menu--collapse) {
  .el-menu-item {
    & > div {
      display: flex !important;
      align-items: center;
    }
  }
  .el-sub-menu {
    .el-sub-menu__title {
      .title,
      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }
}

:deep(.el-menu--horizontal) {
  .el-menu-item {
    & > div {
      position: static !important;
      padding: 0 !important;
    }
  }
  .el-sub-menu {
    .el-sub-menu__icon-arrow {
      position: static;
      vertical-align: middle;
      margin-left: 8px;
      margin-top: -3px;
    }
  }
}
.logo {
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  height: 60px;
  padding: 5px;
  img {
    vertical-align: middle;
    max-width: 100%;
    height: 100%;
  }
}

.logo-fade-enter-active {
  transition: opacity 0.3s ease;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}
</style>
