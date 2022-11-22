<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isExternal as isExternalFn } from '@/utils/validate'

const props = defineProps<{
  to: string
}>()

// eslint-disable-next-line vue/no-setup-props-destructure
const { to } = props

const isExternal = computed(() => {
  return isExternalFn(to)
})

const type = computed(() => (isExternal.value ? 'a' : 'router-link'))

const linkProps = computed(() => {
  if (isExternal.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to
  }
})
</script>
