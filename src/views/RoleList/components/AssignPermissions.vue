<template>
  <!-- 分配权限 -->
  <el-dialog :model-value="modelValue" :title="`为【${title}】分配权限`" @close="btnPermCancel" center>
    <div class="check">
      <el-tree ref="treeRef" :data="tableData" :props="{ label: 'name' }" check-strictly node-key="_id" show-checkbox />
    </div>
    <template #footer>
      <span>
        <el-button type="success" @click="btnPermOK">确定</el-button>
        <el-button type="primary" @click="btnPermCancel">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { assignPermission } from '@/api/role'
import { getPermissionList } from '@/api/permission'
import { treeData } from '@/utils/tree'
import { ElTree } from 'element-plus';
const props = defineProps<{
  modelValue: boolean,
  title: string,
  rows: any
}>()

const emits = defineEmits(['update:modelValue'])
interface User {
  _id: string;
  name: string;
  code: string;
  description: string;
  pid: string
}
const tableData = ref<User[]>([])

const treeRef = ref<InstanceType<typeof ElTree>>()
/**
 * 获取菜单列表
 */
const getPermission = async () => {
  const { data } = await getPermissionList()
  const tree = treeData(data, '0')
  tableData.value = tree
  treeRef.value?.setCheckedKeys(props.rows.permIds)
}

/**
 * 确定
 */
const btnPermOK = async () => {
  const permIds = treeRef.value?.getCheckedKeys()
  await assignPermission({ id: props.rows._id, permIds })
}


/**
 * 取消
 */
const btnPermCancel = () => {
  emits('update:modelValue', false)
}


// 暴露给父组件的方法
defineExpose({
  getPermission
})
</script>

<script scoped></script>
