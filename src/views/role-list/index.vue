<template>
  <div class="">
    <el-card>
      <el-table :data="allPermission" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column align="center" type="index" :label="$t('msg.role.index')" width="120">
        </el-table-column>
        <el-table-column align="center" prop="name" :label="$t('msg.role.dialogRole')" width="180">
        </el-table-column>
        <el-table-column align="center" prop="description" :label="$t('msg.role.dialogDesc')">
        </el-table-column>
        <el-table-column align="center" prop="" label="操作" width="300">
          <el-button type="success" size="small" @click="addRole"> {{
            $t('msg.role.dialogTitle')
          }}</el-button>
          <el-button type="primary" size="small" @click="AssignPermissions"> {{
            $t('msg.role.assignPermissions')
          }}</el-button>
          <el-button size="small" type="danger" @click="">{{ $t('msg.role.removeRole') }}</el-button>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.page"
          :page-sizes="[2, 5, 10, 20]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { addRole, getRoleList } from '@/api/role';
import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
/**
 * 权限分级：
 * 1. 一级权限为页面权限
 *  permissionMark 对应 路由名称
 * 2. 二级权限为功能权限
 *  permissionMark 对应 功能权限表
 */
// 所有权限
interface Page {
  page: string | number;
  pageSize: string | number;
  total: string | number;
}

const page = ref<Page>({
  page: 1, // 当前页码
  pageSize: 5,
  total: 0 // 总数
})

interface List {
  _id: number;
  name: string;
  description: string;
  permIds: Array<{ _id: number; name: string }>;
  createTime: string;
}
const allPermission = ref<List[]>()
const getPermissionList = async () => {
  const { data, total } = await getRoleList({
    page: page.value.page, // 当前页码
    pageSize: page.value.pageSize,
  })
  page.value.total = total ?? 0
  allPermission.value = data
}

const handleSizeChange = (currentSize: number) => {
  page.value.pageSize = currentSize
}
const handleCurrentChange = (currentPage: number) => {
  page.value.page = currentPage
}

const AssignPermissions = () => {

}

watch(page.value, () => {
  getPermissionList()
}, { immediate: true })

watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped>

</style>
