<template>
  <!-- active -->
  <div class="chat" @click="handleClick">
    <div class="top">
      <div class="message-left">
        <img :src="user.user.profile" alt="用户头像">
        <div class="username">
          <div class="name">{{ user.user.username }}</div>
          <div class="time " :class="{ 'Online_status': user.user.online }">{{ user.user.online ? '在线' : '离线' }}</div>
        </div>
      </div>

      <div class="right">
        {{ formatDateShort(lastTime,true) }}
      </div>
    </div>
    <div class="bottom">
      {{ lastMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref, defineProps, onMounted } from 'vue'
import { useStore } from 'vuex';
import { formatDateShort } from '@/utils/data'
import WebSocketService from '@/plugins/ws-socket';
const socket = WebSocketService.getInstance('ws://localhost:8081');
const store = useStore()
// 父组件传递的数据
const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click'])
// 点击事件
const handleClick = () => {
  emit('click', props.user.user._id)
}

/**
 * 获取最后一条消息
 */
const lastMessage = ref('')
const lastTime = ref<string | number>(new Date(props.user.lastMessage.time).getTime()) // 最后一条消息的时间
const self_id = store.state.user.userInfo._id
const getlastMessage = () => {
  lastMessage.value = props.user.lastMessage.sender_id === self_id ? '你：' + props.user.lastMessage.content : '对方：' + props.user.lastMessage.content
}


/**
 * 监听最后一条消息
 */
socket.addEventListener('message', (event: any) => {
  let data = event.data
  data = JSON.parse(data)
  if (data === 'PONG' || data === 'PING') {
    return
  }
  lastMessage.value = data.receiver_id === self_id ? '对方：' + data.content : '我：' + data.content
  lastTime.value = data.time
})

onMounted(() => {
  getlastMessage()
})


</script>

<style lang="scss" scoped>
.chat {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 355px;
  height: 121px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  padding: 0 14px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  transition: all .3s;
  /* 开启透视 */
  // perspective: 1000px;
  // transform-style: preserve-3d;
  cursor: pointer;
  margin-left: 1px;

  &:hover {
    transform: translateY(-7px);
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px,
      rgba(17, 17, 26, 0.1) 0px 20px 30px;
    background-color: rgba(233, 242, 255, 0.5);
  }




  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {

      opacity: 0.4;
      /** 文本1 */
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 22px;
      color: rgba(24, 28, 47, 1);
      text-align: right;
      vertical-align: top;
    }
  }

  .bottom {
    width: 327px;
    height: 18.66px;
    opacity: 1;
    /** 文本1 */
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(24, 28, 47, 1);
    text-align: left;
    vertical-align: top;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 弹性伸缩盒子模型显示 */
    display: -webkit-box;
    /* 限制在一个块元素显示的文本的行数 */
    -webkit-line-clamp: 1;
    /* 设置或检索伸缩盒对象的子元素的排列方式 */
    -webkit-box-orient: vertical;
  }

}
</style>



