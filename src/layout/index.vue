<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 menu -->
    <sidebar id="guide-sidebar" class="sidebar-container" :style="{ backgroundColor: $store.getters.cssVar.menuBg }" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <Navbar />
        <TagsView id="guide-tags"></TagsView>
      </div>
      <!-- 内容区 -->
      <AppMain />

    </div>

  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import TagsView from '@/components/TagsView/index.vue'

import WebSocketService from '@/plugins/ws-socket.ts';
import { onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

let socket = WebSocketService.getInstance('ws://localhost:8081');
socket.connect();

const store = useStore();
const userId = store.getters.userInfo._id;
// 当连接成功时，将用户 ID 发送给服务器
socket.addEventListener('open', function (event) {
  if (socket) {
    socket.send(
      {
        type: 'register',
        userId: userId
      }
    );
  }
});
// socket.addEventListener('close', () => {
//   console.log('WebSocket连接已关闭');
// });
// socket.addEventListener('message', (event) => {
//   console.log('接收到消息：', event.data);
// })
// socket.addEventListener('error', (error) => {
//   console.error('WebSocket连接错误：', error);
// });

onBeforeUnmount(() => {
  // socket.removeEventListener('open', this.onOpen);
  // socket.removeEventListener('message', this.onMessage);
  // socket.removeEventListener('close', this.onClose);
  // socket.removeEventListener('error', this.onError);
  socket.close();
  socket = null
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
