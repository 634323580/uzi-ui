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
      <Link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <Icon
            v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
            :iconClass="onlyOneChild.meta.icon"
          />
          <template #title>
            <span>
              {{ onlyOneChild.meta.title }}
              <!-- {{resolvePath(onlyOneChild.path)}} -->
            </span>
          </template>
        </el-menu-item>
      </Link>
    </template>
    <!-- 有子节点 -->
    <template v-else>
      <el-sub-menu :index="resolvePath(item.path)" popper-append-to-body>
        <template #title v-if="item.meta">
          <Icon v-if="item.meta.icon" :iconClass="item.meta.icon" />
          <span class="title">{{ item.meta.title }}</span>
          <!-- <span class="title">{{resolvePath(item.path)}}</span> -->
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
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'sidebar-item'
})
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { normalizePath } from '@/utils'
import Link from './link.vue'
import Icon from './icon.vue'
import { isExternal } from '@/utils/validate'
import { SidebarItemProps } from './sidebar'

const props = defineProps<{
  item: SidebarItemProps
  basePath: string
}>()

let onlyOneChild = ref<SidebarItemProps>()

function hasOneShowingChild(
  children: SidebarItemProps[] = [],
  parent: SidebarItemProps
) {
  // 所有显示的子节点
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      //临时设置（如果只有一个显示子项，则将使用）
      onlyOneChild.value = item
      return true
    }
  })

  // 当只有一个子路由器时，默认情况下显示子路由器
  if (showingChildren.length === 1) {
    return true
  }

  // 如果没有要显示的子路由器，则显示父路由器
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return normalizePath(props.basePath, routePath)
}
</script>
