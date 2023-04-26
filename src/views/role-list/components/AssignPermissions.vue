<template>
  <!-- 分配权限 -->
  <el-dialog :model-value="modelValue" :title="`为【${title}】分配权限`" @close="btnPermCancel" center>
    <div class="check">
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check
        all</el-checkbox>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :key="city" :label="city">{{
          city
        }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <template #footer>
      <span>
        <el-button @click="btnPermOK">确定</el-button>
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
const props = defineProps<{
  modelValue: boolean,
  title: string,
  rows: any
}>()

const emits = defineEmits(['update:modelValue'])

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}


const btnPermOK = () => {

}

const btnPermCancel = () => {
  emits('update:modelValue', false)
}


// 暴露给父组件的方法
defineExpose({

})
</script>

<script scoped></script>
