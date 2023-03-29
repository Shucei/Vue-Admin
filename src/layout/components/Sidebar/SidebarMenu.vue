<template>
  <el-menu :default-active="activeMenu" :collapse="!$store.getters.sidebarOpened"
    :background-color="$store.getters.cssVar.menuBg" :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText" :unique-opened="true" router>

    <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>

  </el-menu>


</template>

<script  setup>
import { useRouter } from 'vue-router';
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './Sidebaritem.vue'
const router = useRouter()

const routes = computed(() => {
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
  background: linear-gradient(270deg, #2E95FB 50%, #FEFEFE 100%) !important;
  border-radius: 5px;
}

::v-deep .el-menu-item.is-active {
  color: #fbcd31 !important;
  background: linear-gradient(270deg, #2E95FB 50%, #FEFEFE 100%) !important;
  border-radius: 5px;
}

::v-deep .el-sub-menu__title:hover {
  color: #fbcd31 !important;
  background: linear-gradient(270deg, #2E95FB 50%, #FEFEFE 100%) !important;
  border-radius: 5px;
}
</style>
