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

      <div class="rightPanel-items">
        <div class="drawer-container">
          <div>
            <h3 class="drawer-title">Page style setting</h3>
            <div
              class="drawer-item"
              v-for="(item, field) in setting"
              :key="field"
            >
              <div class="label">{{ item.label }}</div>
              <component
                :is="item.type"
                @change="handleChange"
                v-bind="item.attrs"
                v-model="panelData[field]"
                class="drawer-component"
              >
                <template v-if="item.options" v-slot:default>
                  <component
                    :is="item.subComponent"
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.text"
                    :value="option.value"
                  >
                  </component>
                </template>
              </component>
            </div>
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
import storage from 'good-storage'
import store, { PanelData } from "../store";
import { Console } from "console";

interface Setting {
  [propName: string]: {
    type: string;
    label: string;
    options?: { text: string; value: any }[];
    subComponent?: string;
    attrs?: any;
  };
}

const props = defineProps<{
  initPanelData?: PanelData;
  initPanelSetting?: Setting;
}>();

const show = ref(false);

let panelData = computed(() => JSON.parse(JSON.stringify(store.state.panelData)));
const setting = ref<Setting>({
  sidebarLogo: {
    type: "el-switch",
    label: "Sidebar Logo",
  },
  fixedHeader: {
    type: "el-switch",
    label: "Fixed Header",
  },
  fixedFooter: {
    type: "el-switch",
    label: "Fixed footer",
  },
  // theme: {
  //   type: "el-select",
  //   label: "theme color",
  //   subComponent: "el-option",
  //   options: [
  //     {
  //       text: "214",
  //       value: 214,
  //     },
  //   ],
  //   attrs: {
  //     size: 'mini'
  //   }
  // },
});

init();

watchEffect(() => {
  let body: HTMLBodyElement | null = document.querySelector("body");
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
      ...storage.get('__panelData__', {})
    });
  }
  if (initPanelSetting) {
    setting.value = initPanelSetting;
  }
}

function handleChange() {
  store.setPanelDataAction(panelData.value);
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
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
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
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }
}
</style>
