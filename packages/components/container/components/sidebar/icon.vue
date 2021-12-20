<template>
  <icon-svg v-if="isCustom" :iconClass="iconName" />
  <el-icon v-else>
    <component :is="iconName"></component>
  </el-icon>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { startsWith } from 'lodash-es'
import IconSvg from "@/components/svg-icon/svg-icon.vue";

const props = defineProps<{
  iconClass: string
}>()

const { iconClass } = props

const isCustom = computed(() => startsWith(iconClass, '_'))

const iconName = isCustom.value ? `${iconClass.slice(1)}` : iconClass

</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>