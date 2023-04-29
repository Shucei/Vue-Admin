<template>
  <el-dialog :title="$t('msg.excel.roleDialogTitle')" :model-value="modelValue" @close="closed">
    <el-checkbox-group v-model="checkedCities">
      <el-checkbox v-for="city in cities" :key="city._id" :label="city._id">{{
        city.name
      }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { getRoleList } from '@/api/role';
import { setUserassignRolesApi } from '@/api/user';
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()
const emits = defineEmits(['update:modelValue', 'getUserMessageList'])
const userId = ref<string>('') // 用户id
/**
 * 角色列表
 */
interface List {
  _id: number;
  name: string;
  description: string;
  permIds: Array<{ _id: number; name: string }>;
  createTime: string;
}
const cities = ref<List[]>([])
const getPermissionList = async () => {
  const { data } = await getRoleList({
    page: 1, // 当前页码
    pageSize: 100,
  })
  cities.value = data
}

/**
 * 选中的角色
 * 角色可以只存储id，这里之所以拿到整个对象时因为渲染时需要用到name，所以直接存储整个对象
 */
const checkedCities = ref<any[]>([])



/**
* 确定按钮点击事件
*/
const onConfirm = async () => {
  await setUserassignRolesApi({
    userId: userId.value,
    roleIds: checkedCities.value
  })
  closed()
  emits('getUserMessageList')
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

watch(() => props.modelValue, (val) => {
  if (val) {
    getPermissionList()
  }
})


// 暴露给父组件的方法
defineExpose({
  userId, // 用户id
  checkedCities
})

</script>

<style lang="scss" scoped>

</style>
