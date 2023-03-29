<template>
  <div class="form">
    <el-form :model="ruleForm" style="width: 500px" label-width="120px" class="demo-ruleForm" status-icon>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介" prop="profile">
        <el-input v-model="ruleForm.profile" type="textarea" />
      </el-form-item>
      <el-form-item label="标签" prop="profile">
        <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
          <el-tag closable @close="handleClose(tag)" style="margin-right: 8px" type='success' effect="dark">怕麻烦</el-tag>
          <el-tag closable style="margin-right: 8px" type='success' effect="dark">腹黑</el-tag>
          <el-tag closable style="margin-right: 8px" type='success' effect="dark">人傻钱多</el-tag>
          <el-tag closable style="margin-right: 8px;margin-bottom: 5px;" type='info' effect="dark">自信</el-tag>
          <el-tag closable style="margin-right: 8px;margin-bottom: 5px;" type='info' effect="dark">自信</el-tag>
          <el-input ref="reference" style="width: 80px" v-if="cutInput" type="text" v-model="ruleForm.input" max="7"
            autofocus @blur="blurInput" />
          <el-button v-else plain @click="increase">添加</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          保存
        </el-button>

      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, nextTick } from 'vue';
const ruleForm = reactive({
  name: 'shucei',
  nickname: 'ShuAdmin',
  sex: '1',
  profile: 'Abouthu Admin，基于 Vue3.2、Vite4、Element-Plus 开发的一套后台管理框架。',
  input: ''
})
const cutInput = ref(false)
const reference = ref(null)
// 保存
const submitForm = () => {
  ElMessage.success('模拟保存成功')
}

// 添加
const increase = () => {
  cutInput.value = true
  nextTick(() => {
    reference.value.focus()
  })

}

// 失去焦点
const blurInput = () => {
  cutInput.value = false
  reference.value.clear()
}


</script>

<style lang="scss" scoped>

</style>
