<template>
  <el-icon v-bind="$attrs">
    <svg class="svg-icon" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </el-icon>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "svg-icon",
});
</script>
<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  iconClass: string;
}>();

const iconName = computed(() => `#${props.iconClass}`);

</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>