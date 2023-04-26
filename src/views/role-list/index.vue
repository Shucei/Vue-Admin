<template>
  <div class="">
    <PageTools :showBefore=false>
      <template #after>
        <el-button type="success" @click="addRole">{{ $t('msg.role.dialogTitle') }}</el-button>
      </template>
    </PageTools>
    <el-card>
      <el-table :data="allPermission" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column align="center" type="index" :label="$t('msg.role.index')" width="120">
        </el-table-column>
        <el-table-column align="center" prop="name" :label="$t('msg.role.dialogRole')" width="180">
        </el-table-column>
        <el-table-column align="center" prop="description" :label="$t('msg.role.dialogDesc')">
        </el-table-column>
        <el-table-column align="center" prop="" label="操作" width="260">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="AssignPermissions(row)"> {{
              $t('msg.role.assignPermissions')
            }}</el-button>
            <el-button size="small" type="danger" @click="removeRole(row._id)">{{
              $t('msg.role.removeRole')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.page"
          :page-sizes="[2, 5, 10, 20]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </el-card>
    <NewRole v-model="showDialog" @getPermissionList="getPermissionList"></NewRole>
    <AssignPermission ref="distribution" v-model="isShowAssignPermissions" :title="title" :rows="rows">
    </AssignPermission>
  </div>
</template>

<script lang="ts" setup>
import { getRoleList, deleteRole } from '@/api/role';
import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
import PageTools from '@/components/PageTools/index.vue'
import NewRole from './components/NewRole.vue';
import AssignPermission from './components/AssignPermissions.vue';
import { ElMessageBox } from 'element-plus'
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


watch(page.value, () => {
  getPermissionList()
}, { immediate: true })

watchSwitchLang(getPermissionList)

/**
 * 新增角色
*/
const showDialog = ref<boolean>(false)
const addRole = async () => {
  showDialog.value = true
}

/**
 * 删除角色
 */
const removeRole = async (id: string) => {
  ElMessageBox.confirm(
    '确定要删除该角色吗?',
    '消息提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    await deleteRole(id)
    getPermissionList()
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * 权限分配
 */
const title = ref<string>('')
const rows = ref<List>()
//获得子组件的实例
const distribution = ref<InstanceType<typeof AssignPermission>>()
const isShowAssignPermissions = ref<boolean>(false)
const AssignPermissions = (row: List) => {
  title.value = row.name
  rows.value = row
  distribution.value?.getPermission()
  isShowAssignPermissions.value = true
}
</script>

<style lang="scss" scoped>

</style>
