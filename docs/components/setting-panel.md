# SettingPanel
设置面板，配合Container使用，修改后改变Container布局样式，也可单独使用

::: tip
通过鼠标修改设置面板后会自动缓存到本地，而直接修改v-mode并不会缓存
:::

## 基本使用
内置一份默认设置，可通过`customSetting`自定义设置面板

::: details 点击查看默认配置
```js
export const defaultSetting: Setting[] = [
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
];
```
:::

可点击屏幕右侧查看 <Badge text="演示" />
<setting />

@[code](../.vuepress/components/setting.vue)


## 自定义设置面板

::: warning
只会缓存设置面板存在的设置，以前设置过的缓存如果不存在`customSetting`则会自动清除不存在的缓存
:::

::: details 点击查看代码
```vue
<setting-panel :customSetting="customSetting" />

<script setup lang="ts">
const customSetting = [
  {
    title: "自定义",
    desc: {
      sidebarLogo: {
        type: "el-switch",
        label: "sidebarLogo",
      },
      appBarType: {
        // 自定义控件
        type: "el-radio-group",
        label: "AppBar Type",
        // 控件子组件
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
            // 控件和label独占一行
            width: "100%",
          },
        },
      },
    },
  },
];
</script>
```
:::

## 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|--|---|---|---
button | 显示设置按钮 | boolean | - | true
modelValue | v-model | [SettingData](/components/setting-panel.html#settingdata) | - | -
customSetting | 自定义设置面板 | [Setting[]](/components/setting-panel.html#setting) | - | -

## 类型定义
### props

``` typescript
interface Props {
  button?: boolean;
  modelValue?: SettingData;
  customSetting?: Setting[];
}
const props = withDefaults(defineProps<Props>(), {
  button: true,
});
```

### Setting
```typescript
export interface SettingDesc {
  type: string;
  label: string;
  options?: { text: string; value: any }[];
  subComponent?: string;
  attrs?: {
    [propName: string]: any
  };
}

export interface Setting {
  title: string;
  desc: {
    sidebarLogo?: SettingDesc;
    contentWidth?: SettingDesc;
    appBarType?: SettingDesc;
    footerType?: SettingDesc;
    menuLayout?: SettingDesc;
    menuCollapsed?: SettingDesc;
    menuHidden?: SettingDesc;
    [propName: string]: any;
  };
}

```

### SettingData

```typescript
export interface SettingData {
  sidebarLogo?: boolean;
  contentWidth?: "fullWidth" | "boxed";
  appBarType?: "fixed" | "static";
  footerType?: "fixed" | "static" | "hidden";
  menuLayout?: "vertical" | "horizontal";
  menuCollapsed?: boolean;
  menuHidden?: boolean;
  [propName: string]: any;
}
```

