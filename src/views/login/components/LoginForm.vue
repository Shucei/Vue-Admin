<template>
  <div>
    <el-form ref="formRef" :model="LoginForm" :rules="loginRules">
      <el-form-item prop="username">
        <el-input placeholder="用户名：用户名 / 邮箱" v-model="LoginForm.username">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" placeholder="密码：123456" show-password autocomplete="new-password"
          v-model="LoginForm.password">
          <template #prefix>
            <el-icon class="el-input__icon">
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <div class="title">
        <div>还没有账号？注册账号</div>
        <div>忘记密码</div>
      </div>

      <el-form-item>
        <el-button class="bnt-flex" :icon="UserFilled" size="large" type="primary" :loading="loading"
          @click="handerLogin">
          {{ $t('msg.login.loginBtn') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { validatePassword, validateUserName } from '@/utils/rules';
import 'element-plus/es/components/message/style/css'
import { CircleClose, UserFilled, Lock, User } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n'
const formRef = ref<FormInstance>()
// 数据源
interface LogForm {
  username: string,
  password: string
}
const LoginForm = ref<LogForm>({
  username: '1003823477@qq.com',
  password: '123456'
})
const i18n = useI18n()
// 验证规则
const loginRules = reactive<FormRules>({
  username: [
    { required: true, trigger: 'blur', validator: validateUserName() },

  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    },
  ]
})


// // 重置
// const resetForm = () => {
//   formRef.value?.resetFields()
// }

// 处理登录
const loading = ref(false)
const store = useStore()

const router = useRouter()
const handerLogin = () => {
  // 表单校验
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      try {
        loading.value = true
        await store.dispatch('user/login', LoginForm.value)
        router.push('/')
      } catch (error) {
        console.log(error)
      } finally {
        // 不论成功还是失败都要关闭loading
        loading.value = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  font-size: 13px;

  // 文本不可选中
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  div {
    color: rgb(153, 153, 179);
    cursor: pointer;

    &:hover {
      color: aqua;
    }
  }
}

.bnt-flex {
  display: flex;
  flex: 1;
}
</style>
