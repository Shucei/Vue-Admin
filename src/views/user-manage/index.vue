<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick"> {{ $t('msg.excel.importExcel') }}</el-button>
        <el-button type="success" @click="onToExcelClick">
          {{ $t('msg.excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column align="center" label="#" type="index" width="100" />
        <el-table-column align="center" prop="username" :label="$t('msg.excel.name')">
        </el-table-column>
        <!-- 手机 -->
        <el-table-column align="center" prop="mobile" :label="$t('msg.excel.mobile')">
        </el-table-column>
        <!-- 头像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <img class="avatar" v-lazy :src="row.profile" alt="" srcset="">
            <!-- <el-image class="avatar" :onerror="img" :src="row.staffPhoto" :preview-src-list="[row.staffPhoto]"> -->
            <!-- </el-image> -->
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column align="center" :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.roleIds && row.roleIds.length > 0">
              <el-tag v-for="item in row.roleIds" :key="item.id" size="small">{{
                item.name
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column align="center" :label="$t('msg.excel.openTime')">
          <template v-slot="{ row }">
            <span>{{ fillteTime(row.createTime) }}</span>
          </template>
        </el-table-column>
        <!-- 查看、角色、删除 -->
        <el-table-column align="center" :label="$t('msg.excel.action')" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row.id)">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button type="info" size="small" @click="onShowRoleClick(row._id)">{{
              $t('msg.excel.showRole')
            }}</el-button>
            <el-button type="danger" size="small" @click="onRemove(row)">{{
              $t('msg.excel.remove')
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
    <export-to-excel :page="page" v-model="exportToExcelVisible"></export-to-excel>
    <RolesDialog ref="rolesRef" v-model="roleDialogVisible" @getUserMessageList="getUserMessageList"></RolesDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import ExportToExcel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'
import { getUserList, delEmployee } from '@/api/user-manage'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { List } from './types';
const router = useRouter()
const i18n = useI18n()
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

const list = ref<List[]>([])
const getUserMessageList = async () => {
  const { total, data } = await getUserList({
    page: page.value.page,
    pageSize: page.value.pageSize
  })
  page.value.total = total ?? 0
  list.value = data
}

// 时间处理
const fillteTime = (time: string) => {
  return new Date(time).toLocaleDateString()
}

const handleSizeChange = (currentSize: number) => {
  page.value.pageSize = currentSize
}
const handleCurrentChange = (currentPage: number) => {
  page.value.page = currentPage
}

watch(page.value, () => {
  getUserMessageList()
}, { immediate: true })

/**
 * excel 导入点击事件
 */
const onImportExcelClick = () => {
  router.push('/user/import')
}

// 删除用户
const onRemove = (row: List) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') + row.username + i18n.t('msg.excel.dialogTitle2'),
    { type: 'warning' }
  ).then(async () => {
    await delEmployee(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getUserMessageList()
  })
}

// 导出
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

/**
 * 查看按钮点击事件
 */
const onShowClick = (id: string) => {
  router.push(`/user/info/${id}`)
}

/**
 * 查看角色的点击事件
 */
const rolesRef = ref<InstanceType<typeof RolesDialog> | null>(null)// 获取子组件的实例
const roleDialogVisible = ref<boolean>(false)
const onShowRoleClick = (id: string) => {
  if (rolesRef.value !== null) {
    rolesRef.value.checkedCities = []
    rolesRef.value.userId = id
    rolesRef.value?.getUserDetailById(id)
  }
  roleDialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
}

.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
