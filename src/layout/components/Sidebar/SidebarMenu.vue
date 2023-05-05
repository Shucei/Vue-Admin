<template>
  <el-menu :default-active="activeMenu" :collapse="!sidebarOpened" :background-color="cssVar.menuBg"
    :text-color="cssVar.menuText" :active-text-color="cssVar.menuActiveText" :unique-opened="true" router>
    <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>
  </el-menu>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './Sidebaritem.vue'
import { useStore } from 'vuex';
const router = useRouter()
// 计算 menu 的方法
const store = useStore()
const routes = computed<RouteRecordRaw[]>(() => {
  // 用于过滤掉不需要显示在 menu 上的路由
  // 例如：404、login、redirect 等
  // 你可以根据自己的需求自定义
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes, '')
})
// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed<string>(() => {
  const { path } = route
  return path
})

const cssVar = computed(() => {
  return {
    menuBg: store.getters.cssVar.menuBg,
    menuText: store.getters.cssVar.menuText,
    menuActiveText: store.getters.cssVar.menuActiveText
  }
})
const sidebarOpened = computed(() => {
  return store.getters.sidebarOpened
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
  background-image: linear-gradient(98deg, rgb(147, 221, 92), rgb(86, 202, 0) 94%);
  box-shadow: rgba(58, 53, 65, 0.42) 0px 4px 8px -4px;
}

::v-deep .el-menu-item.is-active {
  color: #fbcd31 !important;
  background: #399ee6 !important;
  background-image: linear-gradient(98deg, rgb(147, 221, 92), rgb(86, 202, 0) 94%);
  box-shadow: rgba(58, 53, 65, 0.42) 0px 4px 8px -4px;
}

::v-deep .el-sub-menu__title:hover {
  color: #fbcd31 !important;
  background: #399ee6 !important;
}
</style>
