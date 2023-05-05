<template>
  <div class="navbar">
    <!-- 侧边栏控制按钮 -->
    <Hamburger class="hamburger-container"></Hamburger>
    <!-- 面包屑 -->
    <breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <guide class="right-menu-item hover-effect" />
      <header-search class="right-menu-item hover-effect"></header-search>
      <screenfull class="right-menu-item hover-effect" />
      <theme-picker class="right-menu-item hover-effect"></theme-picker>
      <lang-select class="right-menu-item hover-effect" />
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="33" fit
            src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> {{ $t('msg.navBar.home') }} </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/Shucei/Vue-Admin">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item @click="Logout" divided>
              {{ $t('msg.navBar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 用户名 -->
      <div class="username">
        {{ $store.state.user.userInfo.username }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Hamburger from '@/components/hamburger.vue'
import breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemeSelect/index.vue'
import Screenfull from '@/components/Screenfull'
import headerSearch from '@/components/headerSearch/index.vue';
import Guide from '@/components/Guide'
const store = useStore()
const router = useRouter()
const Logout = () => {
  store.dispatch('user/logout')
  store.commit('app/resetTagsView')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .breadcrumb-container {
    float: left;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;


    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      margin-top: 10px;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;

      .avatar-wrapper {
        margin-top: 7px;
        position: relative;

        vertical-align: middle;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}

.username {
  display: inline-block;
  vertical-align: text-bottom;
  margin-top: 10px;
  color: #5a5e66;
}
</style>
