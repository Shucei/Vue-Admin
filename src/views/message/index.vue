<template>
  <div class="container">
    <div class="messagelist ">
      <div class="search ">
        <el-input v-model="input" placeholder="请输入关键字" :prefix-icon="Search" size="large" />
        <div class="icon">
          <span>{{ friendList.length }}</span>
          <SvgIcon icon="People" class-name="people-icon"></SvgIcon>
        </div>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane :label="$t('msg.message.chats')" name="first">
          <Chat :class="{ active: selectActive === item.user._id }" v-for="item in friendList" :key="item.user._id"
            @click="openWindow" :user="item"></Chat>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.message.group')" name="second">
          <!-- <Chat v-for="item in 2" :key="item"></Chat> -->
        </el-tab-pane>
      </el-tabs>
    </div>
    <MessageWindow ref="window" v-model="isShowUserInformation" :id="selectActive"></MessageWindow>
    <transition name="userinfo">
      <UserInformation v-model="isShowUserInformation"></UserInformation>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import { getFriendListApi } from '@/api/friend';
import store from '@/store';
import MessageWindow from './components/MessageWindow.vue';
import UserInformation from './components/UserInformation.vue';
import Chat from './components/Chat.vue'

const isShowUserInformation = ref<boolean>(false); // 用户信息弹窗
const input = ref(''); // 搜索框

const activeName = ref<string>('first')
const selectActive = ref<string>('') //
/**
 * 点击tab
 * @param tab
 * @param event
 */
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

/**
 * 获取好友列表
 */
const userID = store.state.user.userInfo._id
const friendList = ref<any[]>([])
const getFriendList = async () => {
  const res = await getFriendListApi({ userID: userID })
  friendList.value = res.data
  console.log(friendList.value);
}
getFriendList()

const window = ref<InstanceType<typeof MessageWindow>>()
const openWindow = (id: string) => {
  selectActive.value = id
  // 使用$refs调用子组件的方法
  window?.value?.getLastMessage(id)
}


</script>

<style scoped lang="scss">
::v-deep .active {
  background: rgba(41, 47, 76, 1);
  border-left: 4px solid rgba(251, 164, 20, .8);

  .bottom,
  .name,
  .right {
    color: white !important;
  }

  &:hover {
    transform: none;
  }
}

.container {
  height: 100%;
  min-width: 500px;
  display: flex;

}

::v-deep .el-tabs__content {
  //  perspective: 1000px;
  max-height: calc(100vh - 50px - 74px); // 你可以设置固定或者最大最小高度
  overflow: hidden; // 隐藏超出部分
  overflow-y: scroll; // 设置纵向滚动效果，x为横向

  &::-webkit-scrollbar {
    width: 0;
    height: 6px;
  }

  &:hover {
    &::-webkit-scrollbar {
      width: 3px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;
      background-color: rgba(251, 164, 20, .6)
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
  }

  padding-bottom: 90px !important;
}



.messagelist {
  width: 25%;
  // min-height: calc(100vh - 50px - 74px);
  max-height: calc(100vh - 50px - 74px); // 你可以设置固定或者最大最小高度
  text-align: left;

  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    vertical-align: middle;

    .icon {
      display: flex;
      width: 100px;
      height: 40px;
      text-align: right;
      align-items: center;
      justify-content: flex-end;

      .icon span {
        font-size: 14px;
        color: #999999;
      }

      .people-icon {
        font-size: 24px;
        vertical-align: middle;
      }
    }


  }
}

.el-input {
  width: 290px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1) inset;
  border-radius: 24px;

  ::v-deep .el-input__wrapper {
    width: 50px;
    height: 40px;
    border-radius: 24px;
    background-color: rgba(201, 196, 196, 0.1);
    // box-shadow: none;
  }
}

.demo-tabs {
  margin-top: 10px;

  ::v-deep .el-tabs__nav-wrap::after {
    width: 0;
  }
}
</style>
