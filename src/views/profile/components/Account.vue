<template>
  <div class="">
    <el-form :model="ruleForm" style="width: 500px" label-width="120px" class="demo-ruleForm" status-icon>
      <el-form-item label="手机号" prop="mobile">
        <el-input :disabled="disabled" v-model="ruleForm.mobile" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input :disabled="disabled" type="password" v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="text">
        <el-input :disabled="disabled" v-model="ruleForm.passwords" />
      </el-form-item>

      <el-form-item label-width="80px">
        <!-- <el-divider /> -->
        <div class="box-card clearfix">
          <div class="ql">
            <svg-icon class="qq" icon="qq"></svg-icon>
          </div>
          <div class="binding">
            <div class="bindingText">
              <span>绑定QQ</span>
              <span>当前未绑定QQ账号</span>
            </div>

            <div class="qqBtn">
              <span>更改绑定</span>
            </div>
          </div>

        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm(ruleFormRef)">
          保存
        </el-button>
        <el-button type="primary" @click="resetForm(ruleFormRef)">
          修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const ruleForm = reactive({
  mobile: '13800000002',
  password: 'ShuAdmin',
  passwords: '123456789@qq.com',
})
const disabled = ref(true)
// 保存
const submitForm = () => {
  ElMessage.success('模拟保存成功')
  disabled.value = true
}
// 修改密码
const resetForm = () => {
  disabled.value = false
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 500px;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--el-color-primary);
  font-weight: 400;

  .ql {
    float: left;
  }

  .qq {
    font-size: 30px;
  }

  .binding {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // 文本不换行
    white-space: nowrap;
    // 文本不可选中
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .bindingText {
      float: left;
      display: flex;
      flex-direction: column;
      margin-left: 13px;
    }

    .qqBtn {
      cursor: pointer;
      color: #158bb8;
    }
  }


}
</style>
