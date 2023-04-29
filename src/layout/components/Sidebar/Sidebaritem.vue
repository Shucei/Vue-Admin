<template>
  <el-sub-menu default-active="1" router :index="route.path" v-if="route.children?.length > 0">
    <template #title>
      <!-- <el-icon>
        <location />
      </el-icon>
      <span>{{ route.meta.title }}</span> -->
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <el-menu-item v-for="item in route.children" :key="item.path" :index="item.path" :route="item">
      {{
        generateTitle(item.meta?.title)
      }}</el-menu-item>
  </el-sub-menu>

  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue';
import { defineProps } from 'vue'
import { generateTitle } from '@/utils/i18n'
// 定义 props
const props = defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
// ::v-deep .el-sub-menu__title,
// .el-menu-item {
//   display: block !important;
// }
</style>
