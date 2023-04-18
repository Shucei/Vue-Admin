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
            <img class="avatar" v-lazy :src="row.staffPhoto" alt="" srcset="">
            <!-- <el-image class="avatar" :onerror="img" :src="row.staffPhoto" :preview-src-list="[row.staffPhoto]"> -->
            <!-- </el-image> -->
          </template>
        </el-table-column>
        <!-- 描述 -->
        <el-table-column align="center" :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{
                item.title
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
            <span>{{ fillteTime(row.timeOfEntry) }}</span>
          </template>
        </el-table-column>
        <!-- 查看、角色、删除 -->
        <el-table-column align="center" :label="$t('msg.excel.action')" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row.id)">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button type="info" size="small" @click="onShowRoleClick(row)">{{
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
          :page-sizes="[2, 5, 10, 20]" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper"
          :total="100">
        </el-pagination>
      </div>
    </el-card>
    <export-to-excel :page="page" v-model="exportToExcelVisible"></export-to-excel>
    <roles-dialog v-model="roleDialogVisible"></roles-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ExportToExcel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'
import { getUserList, delEmployee } from '@/api/user-manage'
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
const router = useRouter()
const i18n = useI18n()
const page = ref({
  page: 1, // 当前页码
  size: 5,
  total: 0 // 总数
})
const list = ref([])
const getUserMessageList = async () => {
  const { total, rows } = await getUserList({
    page: page.value.page,
    size: page.value.size
  })
  page.value.total = total
  list.value = rows
}
getUserMessageList()
// 时间处理
const fillteTime = (time) => {
  return new Date(time).toLocaleDateString()
}


const handleSizeChange = currentSize => {
  page.value.size = currentSize
}
const handleCurrentChange = currentPage => {
  page.value.page = currentPage
}

watch(page, () => {
  getUserMessageList()
}, { immediate: true, deep: true })
/**
 * excel 导入点击事件
 */
const onImportExcelClick = () => {
  router.push('/user/import')
}

// 删除用户
const onRemove = row => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') + row.username + i18n.t('msg.excel.dialogTitle2'),
    { type: 'warning' }
  ).then(async () => {
    await delEmployee(row.id)
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
const onShowClick = id => {
  router.push(`/user/info/${id}`)
}

/**
 * 查看角色的点击事件
 */
const roleDialogVisible = ref(false)
const onShowRoleClick = row => {
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
