<template>
  <teleport to="body">
    <div class="rightPanel-container" v-if="button" :class="{ show: show }">
      <div class="rightPanel-background" @click="show = !show" />
      <div class="rightPanel">
        <div class="handle-button" v-if="button" @click="show = !show">
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
                @change="handleChange($event, field as string)"
                v-bind="item.attrs"
                v-model="panelData[field]"
                class="drawer-component"
              >
                <template
                  v-if="item.options && item.subComponent"
                  v-slot:default
                >
                  <component
                    :is="item.subComponent"
                    v-for="option in item.options"
                    :key="option.value"
                    :label="
                      item.type === 'el-radio-group'
                        ? option.value
                        : option.text
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
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'setting-panel'
})
</script>
<script setup lang="ts">
import { ref, watchEffect, watch, computed } from 'vue'
import { Setting as SettingIcon, Close as CloseIcon } from '@element-plus/icons'
import { flattenDeep } from 'lodash-es'
import storage from 'good-storage'
import store from '@/components/setting-panel/store'
import {
  defaultSetting,
  CATCH_KEY,
  Setting,
  SettingData
} from './setting-panel'

interface Props {
  button?: boolean
  modelValue?: SettingData
  customSetting?: Setting[]
}
const props = withDefaults(defineProps<Props>(), {
  button: true
})

const emit = defineEmits(['update:modelValue'])

const show = ref(false)

const panelData = computed<SettingData>(() => {
  return { ...store.state.panelData }
})

const setting = ref<Setting[]>(defaultSetting)

init()

watchEffect(() => {
  let body = document.querySelector('body')
  if (show.value) {
    body?.classList.add('showRightPanel')
  } else {
    body?.classList.remove('showRightPanel')
  }
})

watch(
  () => props.modelValue,
  (data) => {
    data && store.setPanelDataAction(data)
  },
  {
    deep: true
  }
)

// window.addEventListener('click', (e: Event) => {
//   console.log((e.target as HTMLElement).closest('.rightPanel-container'))
// })

function init() {
  const { modelValue = {}, customSetting = [] } = props

  // 声明默认设置
  let defaultPanelData: SettingData = {
    sidebarLogo: true,
    contentWidth: 'fullWidth',
    appBarType: 'fixed',
    footerType: 'static',
    menuLayout: 'vertical',
    menuCollapsed: false,
    menuHidden: false,
    ...modelValue
  }

  // 获取本地缓存设置
  const catchPanelData = storage.get<SettingData>(CATCH_KEY, {})

  if (customSetting.length) {
    setting.value = customSetting
  }
  // 删除不存在选项配置中的缓存
  const initPanelKeys: string[] = flattenDeep(
    setting.value.map((section) => {
      return Object.keys(section.desc)
    })
  )
  Object.keys(catchPanelData).forEach((panelDataKey) => {
    if (!initPanelKeys.includes(panelDataKey)) {
      delete catchPanelData[panelDataKey]
    }
  })
  // 缓存设置覆盖默认设置
  store.setPanelDataAction({
    ...defaultPanelData,
    ...catchPanelData
  })
  storage.set(CATCH_KEY, catchPanelData)
  // setTimeout(() => {
  emit('update:modelValue', panelData.value)
  // });
}

function handleChange(value: any, field: string) {
  store.setPanelDataAction(panelData.value, field, value)
  emit('update:modelValue', panelData.value)
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
  top: 250px;
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
