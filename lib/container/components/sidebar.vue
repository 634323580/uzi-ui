<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <p v-for="(item, index) in 100" :key="index">{{index}}</p>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 210px;
}
</style>