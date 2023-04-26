<template>
  <div>
    <PageTools :showBefore=false>
      <template #after>
        <el-button type="success" @click="addPermission">{{ $t('msg.permission.addPermission') }}</el-button>
      </template>
    </PageTools>
    <el-card>
      <el-table :data="filterTableData" style="width: 100%" row-key="_id" border lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column :label="$t('msg.permission.name')" prop="name" />
        <el-table-column :label="$t('msg.permission.mark')" prop="code" />
        <el-table-column :label="$t('msg.permission.desc')" prop="description" />
        <el-table-column align="center" width="300">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button v-if="scope.row.pid === '0'" type="primary" size="small"
              @click="addPermission(scope.$index, scope.row)">添加功能权限</el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <NewMenu ref="EditMenu" v-model="isNewMenu" @getPermission="getPermission"></NewMenu>

  </div>
</template>

<script lang="ts" setup>
import PageTools from '@/components/PageTools/index.vue'
import { ref, computed } from 'vue'
import { getPermissionList, removePermission } from '@/api/permission'
import { ElMessageBox } from 'element-plus'
import NewMenu from './components/NewMenu.vue';
import { treeData } from '@/utils/tree'

interface User {
  _id: string;
  name: string;
  code: string;
  description: string;
  pid: string
}
const tableData = ref<User[]>([])
const search = ref<string>('')
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
/**
 * 获取菜单列表
 */
const getPermission = async () => {
  const { data } = await getPermissionList()
  const tree = treeData(data, '0')
  tableData.value = tree
}
getPermission()


/**
 * 删除权限
 */
const handleDelete = (index: number, row: User) => {
  ElMessageBox.confirm('删除该权限, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await removePermission(row._id)
    getPermission()
    // 删除
  }).catch(() => {
    // 取消
  });
}

/**
 * 修改权限
 */
const EditMenu = ref<InstanceType<typeof NewMenu>>()
const handleEdit = (index: number, row: User) => {
  isNewMenu.value = true
  EditMenu.value?.update(row)
}

/**
 * 添加菜单
 */
const isNewMenu = ref<boolean>(false)
const addPermission = (index: number, row: User) => {
  isNewMenu.value = true
}
</script>

<style lang="scss" scoped>

</style>
