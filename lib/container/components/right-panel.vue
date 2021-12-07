<template>
  <div class="rightPanel-container" :class="{ show: show }">
    <div class="rightPanel-background" @click="show = !show" />
    <div class="rightPanel">
      <div class="handle-button" @click="show = !show">
        <el-icon class="icon" :size="24">
          <setting-icon v-if="!show" />
          <close-icon v-else />
        </el-icon>
      </div>
      <div class="drawer-container">
        <div
          class="drawer-section"
          v-for="section in setting"
          :key="section.title"
        >
          <div class="drawer-title">
            {{ section.title }}
          </div>
          <div
            class="drawer-item"
            v-for="(item, field) in section.desc"
            :key="field"
          >
            <div class="label">{{ item.label }}</div>
            <component
              :is="item.type"
              @change="handleChange($event, field)"
              v-bind="item.attrs"
              v-model="panelData[field]"
              class="drawer-component"
            >
              <template v-if="item.options && item.subComponent" v-slot:default>
                <component
                  :is="item.subComponent"
                  v-for="option in item.options"
                  :key="option.value"
                  :label="
                    item.type === 'el-radio-group' ? option.value : option.text
                  "
                  :value="option.value"
                >
                  {{ option.text }}
                </component>
              </template>
            </component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import {
  Setting as SettingIcon,
  Close as CloseIcon,
} from "@element-plus/icons";
import { flattenDeep } from 'lodash-es'
import storage from "good-storage";
import store from "../store";
import { Setting, SettingData } from '../types/right-panel'

const props = defineProps<{
  initPanelData?: SettingData;
  initPanelSetting?: Setting[];
}>();

const show = ref(false);

const panelData = computed<SettingData>(() => {
  return { ...store.state.panelData }
});

const setting = ref<Setting[]>([
  {
    title: "Page style setting",
    desc: {
      sidebarLogo: {
        type: "el-switch",
        label: "Sidebar Logo",
      },
    },
  },
  {
    title: "Layout",
    desc: {
      contentWidth: {
        type: "el-radio-group",
        label: "Content Width",
        subComponent: "el-radio",
        options: [
          {
            text: "Full Width",
            value: "fullWidth",
          },
          {
            text: "Boxed",
            value: "boxed",
          },
        ],
        attrs: {
          style: {
            width: "100%",
          },
        },
      },
      appBarType: {
        type: "el-radio-group",
        label: "AppBar Type",
        subComponent: "el-radio",
        options: [
          {
            text: "Fixed",
            value: "fixed",
          },
          {
            text: "Static",
            value: "static",
          },
        ],
        attrs: {
          style: {
            width: "100%",
          },
        },
      },
      footerType: {
        type: "el-radio-group",
        label: "Footer Type",
        subComponent: "el-radio",
        options: [
          {
            text: "Fixed",
            value: "fixed",
          },
          {
            text: "Static",
            value: "static",
          },
          {
            text: "Hidden",
            value: "hidden",
          },
        ],
        attrs: {
          style: {
            width: "100%",
          },
        },
      },
    },
  },
  {
    title: "MENU",
    desc: {
      menuLayout: {
        type: "el-radio-group",
        label: "Menu Layout",
        subComponent: "el-radio",
        options: [
          {
            text: "Vertical",
            value: "vertical",
          },
          {
            text: "Horizontal",
            value: "horizontal",
          },
        ],
        attrs: {
          style: {
            width: "100%",
          },
        },
      },
      menuCollapsed: {
        type: "el-switch",
        label: "Menu Collapsed",
      },
      menuHidden: {
        type: "el-switch",
        label: "Menu Hidden",
      },
    },
  },
]);

init();

watchEffect(() => {
  let body = document.querySelector("body");
  if (show.value) {
    body?.classList.add("showRightPanel");
  } else {
    body?.classList.remove("showRightPanel");
  }
});

function init() {
  const { initPanelData, initPanelSetting } = props;
  if (initPanelData) {
    store.setPanelDataAction({
      ...panelData.value,
      ...initPanelData,
      ...storage.get("__panelData__", {}),
    });
  }
  if (initPanelSetting) {
    setting.value = initPanelSetting;
  }
  // 删除不存在选项配置中的缓存
  const clonePanelData = { ...store.state.panelData }
  const initPanelKeys: string[] = flattenDeep(setting.value.map(section => {
    return Object.keys(section.desc)
  }))
  Object.keys(clonePanelData).forEach(panelDataKey => {
    if(!initPanelKeys.includes(panelDataKey)) {
      delete clonePanelData[panelDataKey]
    }
  })
  store.setPanelDataAction({
    // ...store.state.panelData,
    ...initPanelData,
    ...clonePanelData
  })
  storage.set("__panelData__", clonePanelData)
}

function handleChange(value: any, field: string) {
  console.log(value, field)
  store.setPanelDataAction(panelData.value, field, value);
}
</script>

<style lang="scss" scoped>
:global(.showRightPanel) {
  overflow: hidden;
}
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 1000;
}
.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 999;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}
.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  top: 260px;
  text-align: center;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 45px;
  background-color: rgb(24, 144, 255);
  i {
    vertical-align: middle;
    font-size: 24px;
  }
}
.drawer-container {
  padding: 24px 0;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  color: rgba(94, 86, 105, 0.87);
  height: 100%;
  overflow-y: auto;
  .drawer-section {
    margin-bottom: 20px;
    border-bottom: 1px solid #e5e3e762;
    padding: 0 24px;
  }
  .drawer-title {
    margin-bottom: 10px;
    font-size: 12px;
    color: rgba(94, 86, 105, 0.38);
    font-weight: bold;
  }

  .drawer-item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    .label {
      font-size: 14px;
    }
    :deep(.el-radio) {
      height: 24px;
      .el-radio__label {
        font-weight: normal;
      }
    }
  }
}
</style>
