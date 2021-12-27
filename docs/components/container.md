# Container

用于布局的容器组件，方便快速搭建页面的基本结构，内置侧边栏，可配合[SettingPanel](/components/setting-panel.html#基础用法)一起使用，SettingPanel修改默认配置会应用到Container上



## 基本使用
::: details 点击查看代码
```vue
<container :routes="routes" :defaultActive="activeMenu">
  content
</container>
<!-- <setting-panel :button="true" v-model="data" /> -->
<script lang="ts" setup>
import { computed } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

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
        path: "test2",
        name: "test2",
        meta: {
          title: "test2",
          icon: "_iconicon_tuijian",
        }
      },
    ],
  },
]);
</script>
```
:::

## 自定义侧边栏样式

通过`provide`注入样式

::: details 查看类型定义
```typescript
interface Config {
  logo?: string;
  collapsedLogo?: string;
  textColor?: string;
  activeTextColor?: string;
  backgroundColor?: string;
  subBackgroundColor?: string;
  subHoverBackgroundColor?: string;
}

```
:::

``` vue
.....
<script>
import { SIDEBAR_STYLE_KEY } from "container";

// 设置侧边栏样式
provide(SIDEBAR_STYLE_KEY, {
  logo: 'https://us1-dev.propertyraptor.com/hornet/src?p=/ims/hornet/prp/system/d8abb3a0d7f64f8a8d90e65e0b8ac75e.png',
  collapsedLogo: 'https://us1-dev.propertyraptor.com/hornet/src?p=/ims/hornet/prp/system/ab0d570ffcf346f2acb29b6c22d86d02.png',
  backgroundColor: "#334154",
  textColor: "#fff",
  activeTextColor: "#ffd04b",
  subBackgroundColor: "#222d3c",
  subHoverBackgroundColor: "#001528",
});
</script>
```

## 属性
属性 | 说明 | 类型 | 可选值 | 默认值
---|--|---|---|---
asideWidth | 侧边栏菜单宽度 | number | - | 200
asideCollapsedWidth | 缩小后菜单宽度 | number | - | 60
routes | 侧边栏菜单 | [SidebarItemProps[]](/components/container.html#sidebaritemprops) | - | -
defaultActive | 菜单高亮 | string | - | -


## 插槽

属性 | 说明
---|--|
default | 内容
header | 头部
footer | 底部



## 类型定义

### Props
```typescript
interface Props {
  asideWidth?: number;
  asideCollapsedWidth?: number;
}
const props = withDefaults(defineProps<Props>(), {
  asideWidth: 200,
  asideCollapsedWidth: 60,
});

```
### SidebarItemProps
```typescript
export interface SidebarItemProps {
  name: string;
  path: string;
  // 如果设置为true，项目将不会显示在侧栏中（默认值为false）
  hidden?: boolean;
  // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
  alwaysShow?: boolean;
  meta: {
    title: string;
    // _开头为自定义icon，使用element icon需要全局安装
    icon?: string;
    // 当路由设置了该属性，则会高亮相对应的侧边栏。
    // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
    // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    activeMenu?: string;
    [propName: string]: any;
  };
  children?: Array<SidebarItemProps>; // 嵌套路由
  [propName: string]: any;
}

```
