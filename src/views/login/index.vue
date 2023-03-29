<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="dark">
        <el-switch v-model="isDark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" />
      </div>
      <div class="login-left">
        <img src="@/assets/images/login_left.svg" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo-text">Shu-Admin</h2>
        </div>
        <LoginForm />
      </div>
    </div>

  </div>
</template>


<script setup  lang="ts" name="login">
// 导入组件之后无需注册可直接使用
import LoginForm from './components/LoginForm.vue';
import { useDark } from '@vueuse/core'
import { Sunny, Moon } from '@element-plus/icons-vue';
const isDark = useDark()
</script>

<style lang="scss" scoped>
.login-container {

  height: 100%;
  min-height: 550px;
  // background-color: #eeeeee;
  background-image: url("@/assets/images/login_bg.svg");
  background-size: 100% 100%;
  background-size: cover;



  .login-box {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 94%;
    height: 92%;
    padding: 0 50px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: hsl(0deg 0% 100% / 80%);
    border-radius: 10px;
    box-shadow: 1px 1px 15px 1px #e4e4e4;


    .dark {
      position: absolute;
      top: 13px;
      right: 15px;
    }

    .login-left {
      width: 800px;
      margin: 0 10px 0 0;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .login-form {
      width: 420px;
      padding: 50px 40px 45px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);

      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 45px;

        .login-icon {
          width: 60px;
          height: 52px;
        }

        .logo-text {
          padding: 0 0 0 25px;
          margin: 0;
          font-size: 42px;
          font-weight: bold;
          color: #34495e;
          // 文本不换行
          white-space: nowrap;
          // 文本不可选中
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      }

      .el-form-item {
        margin-bottom: 40px;
      }

      .login-btn {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 40px;
        white-space: nowrap;

        .el-button {
          width: 185px;
        }
      }
    }
  }
}

@media screen and (max-width: 1250px) {
  .login-left {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .login-form {
    width: 97% !important;
  }
}
</style>
