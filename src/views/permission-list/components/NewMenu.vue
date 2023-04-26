<template>
  <el-dialog :model-value="modelValue" :title="!isId ? '添加菜单' : '修改菜单'" @close="closeDialog">
    <el-form ref="ruleFormRef" :model="formData" :rules="rules">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="formData.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="default" type="primary" @click="btnOk">确定</el-button>
      <el-button size="default" @click="closeDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { addPermission, updatePermission } from '@/api/permission'

const props = defineProps<{
  modelValue: boolean,
}>()// 定义props

const emits = defineEmits(['update:modelValue', 'getPermission']) // 定义emit

interface formDataInstance {
  name: string
  code: string
  description: string
  pid: string
}

const formData = ref<formDataInstance>({
  name: '',
  code: '',
  description: '',
  pid: '0'
})

const ruleFormRef = ref<FormInstance>() // 表单实例

// 表单验证规则
const rules = reactive<FormRules>({
  name: [{
    required: true,
    message: '权限名称不能为空',
    trigger: 'blur'
  }],
  description: [{
    required: true,
    message: '权限描述为必填信息',
    trigger: 'blur'
  },],
  code: [{
    required: true,
    message: '权限标识为必填信息',
    trigger: 'blur'
  }],
})

// 取消
const closeDialog = () => {
  // ruleFormRef.value?.resetFields()
  ruleFormRef.value?.clearValidate()
  formData.value = {
    name: '',
    code: '',
    description: '',
    pid: '0'
  }
  isId.value = ''
  emits('update:modelValue', false)
}

// 确定
const isId = ref<string>('')
const btnOk = () => {
  if (isId.value) {
    updatePermission(isId.value, formData.value).then(res => {
      if (res.data) {
        emits('update:modelValue', false)
        closeDialog()
        emits('getPermission')
      }
    })
  } else {
    ruleFormRef.value?.validate(async (valid) => {
      if (valid) {
        const { data } = await addPermission(formData.value)
        if (data) {
          emits('update:modelValue', false)
          closeDialog()
          emits('getPermission')
        }
      }
    })
  }
}


const update = (row: any) => {
  isId.value = row._id
  formData.value = row
}

defineExpose({
  update
})

</script>

<script scoped></script>
