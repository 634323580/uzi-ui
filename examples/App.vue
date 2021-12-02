<template>
  <container
  >
    <p v-for="(item, index) in 100" :key="index">{{ index }}</p>
  </container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const initPanelSetting = {
  fixedHeader: {
    type: "el-switch",
    label: "Fixed Header",
  },
};
const initPanelData = ref({
  fixedHeader: false,
  tagsView: true
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
p{
  height: 30px;
  background: #e8e8e8;
  color: #333;
  margin: 10px 0;
}
</style>
