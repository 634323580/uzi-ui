<template>
  <svg-icon v-if="isCustom" :iconClass="iconName" />
  <el-icon v-else>
    <component :is="iconName"></component>
  </el-icon>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { startsWith } from 'lodash-es'
import SvgIcon from '@/components/svg-icon/svg-icon.vue'

const props = defineProps<{
  iconClass: string
}>()

// eslint-disable-next-line vue/no-setup-props-destructure
const { iconClass } = props

const isCustom = computed(() => startsWith(iconClass, '_'))

const iconName = isCustom.value ? `${iconClass.slice(1)}` : iconClass
</script>
