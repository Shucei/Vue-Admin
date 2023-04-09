<template>
  <div class="">
    <div class="logo-container">
      <SvgIcon icon="logo"></SvgIcon>
      <h1 class="logo-title" v-if="flag = $store.getters.sidebarOpened">
        Shu-Admin
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import SidebarMenu from './SidebarMenu'

const margin = ref('auto')
const flag = ref(false)

</script>

<style lang="scss" scoped>
.logo-container {
  height: 50px;
  // padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  // justify-content: center;
  padding: 0 var(--el-menu-base-level-padding);
  font-size: 20px;
  width: 250px;

  .logo-title {
    color: #fff;
    font-weight: 600;
    // line-height: 50px;
    font-size: 20px;
    white-space: nowrap;
  }
}

::v-deep .el-menu-item {
  width: 250px !important;
}
</style>
