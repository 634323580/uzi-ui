<template>
  <pre>{{ data }}</pre>
  <setting-panel v-model="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const data = ref({
  fixedHeader: true,
  sidebarLogo: true,
  menuCollapsed: false,
  menuHidden: false
  // menuLayout: "horizontal",
})
</script>
