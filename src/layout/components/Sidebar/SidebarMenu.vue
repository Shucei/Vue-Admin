<template>
  <el-menu :default-active="activeMenu" :collapse="!$store.getters.sidebarOpened"
    :background-color="$store.getters.cssVar.menuBg" :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText" :unique-opened="true" router>
    <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>
  </el-menu>
</template>

<script  setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { filterRouters, generateMenus } from '@/utils/route.ts'
import SidebarItem from './Sidebaritem.vue'
const router = useRouter()

const routes = computed(() => {
  console.log(router.getRoutes()); // 打印出来的是所有的路由
  // 过滤掉不需要显示在 menu 上的路由
  // 这里的 filterRouters 方法是在 utils/route.js 中定义的
  // 用于过滤掉不需要显示在 menu 上的路由
  // 例如：404、login、redirect 等
  // 你可以根据自己的需求自定义
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}



::v-deep .el-menu-item:hover {
  outline: 0 !important;
  color: #fbcd31;
  background: #399ee6 !important;
}

::v-deep .el-menu-item.is-active {
  color: #fbcd31 !important;
  background: #399ee6 !important;
}

::v-deep .el-sub-menu__title:hover {
  color: #fbcd31 !important;
  background: #399ee6 !important;
}
</style>
