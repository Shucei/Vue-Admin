<template>
  <!-- 新增编辑弹窗 -->
  <el-dialog :model-value="modelValue" title="新增角色" @close="btnCancel">
    <el-form ref="ruleFormRef" :model="roleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="roleForm.description" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="btnOK">确定</el-button>
        <el-button type="primary" @click="btnCancel">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FormRules } from 'element-plus';
import { defineProps, ref, defineEmits, reactive } from 'vue'
import { addRole } from '@/api/role'

const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits(['update:modelValue', 'getPermissionList'])

const ruleFormRef = ref<null | HTMLFormElement>(null)

const roleForm = ref<{
  name: string;
  description: string;
}>({
  name: '',
  description: ''
})

// 表单验证规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
  description: [{ required: true, message: '角色描述为必填信息', trigger: 'blur' },],
})


// 确定
const btnOK = () => {
  ruleFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const { data } = await addRole(roleForm.value)
      if (data) {
        emits('getPermissionList')
        btnCancel()
      }
    } else {
      return false
    }
  })
}

// 取消
const btnCancel = () => {
  ruleFormRef.value?.resetFields()
  emits('update:modelValue', false)
}

</script>

<script scoped></script>
