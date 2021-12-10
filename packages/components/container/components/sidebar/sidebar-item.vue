<template>
  <div v-if="!item.hidden">
    <!-- 无子节点 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        onlyOneChild &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <el-menu-item :index="resolvePath(onlyOneChild.path, isRoot)">
        <el-icon><SettingIcon /></el-icon>
        <template #title>
          <!-- {{ onlyOneChild.meta.title }} -->
          <span>
          {{resolvePath(onlyOneChild.path, isRoot)}}

          </span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子节点 -->
    <template v-else>
      <el-sub-menu :index="resolvePath(item.path, isRoot)" popper-append-to-body>
        <template #title v-if="item.meta">
          <el-icon><SettingIcon /></el-icon>
          <!-- <span class="title">{{ item.meta.title }}</span> -->
          <span class="title">{{resolvePath(item.path, isRoot)}}</span>
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        />
      </el-sub-menu>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "sidebar-item",
});
</script>
<script setup lang="ts">
import { ref } from "vue";
import {
  Setting as SettingIcon,
  Close as CloseIcon,
} from "@element-plus/icons";
import { SidebarItemProps } from "./index";

const props = defineProps<{
  item: SidebarItemProps;
  basePath: string;
  isRoot?: boolean
}>();

let onlyOneChild = ref<SidebarItemProps>();

function hasOneShowingChild(
  children: SidebarItemProps[] = [],
  parent: SidebarItemProps
) {
  // 所有显示的子节点
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false;
    } else {
      //临时设置（如果只有一个显示子项，则将使用）
      onlyOneChild.value = item;
      return true;
    }
  });

  // 当只有一个子路由器时，默认情况下显示子路由器
  if (showingChildren.length === 1) {
    return true;
  }

  // 如果没有要显示的子路由器，则显示父路由器
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
}

function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

function resolvePath(routePath: string, isRoot?: boolean) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  if(isRoot) {
    return props.basePath.replace(/\/+$/, '');
  }
  return `${props.basePath}/${routePath}`.replace(/\/+/g, "/").replace(/\/$/, '');
}

</script>
<style scoped lang="scss"></style>
