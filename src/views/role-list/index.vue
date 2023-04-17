<template>
  <div class="">
    <el-card>
      <el-table :data="allPermission" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column align="center" type="index" :label="$t('msg.role.index')" width="120">
        </el-table-column>
        <el-table-column align="center" prop="name" :label="$t('msg.permission.name')" width="180">
        </el-table-column>
        <el-table-column align="center" prop="description" :label="$t('msg.permission.desc')">
        </el-table-column>

        <el-table-column align="center" prop="" label="操作" width="180">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)"> {{
            $t('msg.role.assignPermissions')
          }}</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { getRoleList } from '@/api/role';
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'
/**
 * 权限分级：
 * 1. 一级权限为页面权限
 *  permissionMark 对应 路由名称
 * 2. 二级权限为功能权限
 *  permissionMark 对应 功能权限表
 */
// 所有权限
const allPermission = ref([])
// const getPermissionList = async () => {
//   let { rows } = await getRoleList()
//   allPermission.value = rows
//   console.log(allPermission);
// }
// getPermissionList()
// watchSwitchLang(getPermissionList)
</script>

<style lang="scss" scoped>

</style>
