<template>
  <div class="chat-container" v-if="id">
    <!-- 头部 -->
    <div class="header">
      <div class="message-left">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="用户头像">
        <div class="username">
          <div class="name">{{ userInfo.username }}</div>
          <div class="time" :class="{ 'Online_status': userInfo.online }">{{ userInfo.online ? '在线' : '离线' }}</div>
        </div>
      </div>
      <el-button :icon="MoreFilled" color="#1C5CFF" @click="openUserInfo"></el-button>
    </div>

    <!-- 聊天消息区域 -->
    <div class="messages" ref="MessageRef">
      <div class="load-toolbar">
        <span class="no-more"> 没有更多消息了</span>
      </div>
      <!-- 群邀请进入 -->
      <!-- <div class="message-item">
        <div class="message-box">
          <div class="invite-message">
            <div class="sys-text"><a>gzydong</a><span>邀请了</span><a>大飞</a><em
                style="display: none;">、</em><span>加入群聊</span></div>
          </div>
        </div>
        <div class="datetime" style="display: none;">13:47</div>
      </div> -->

      <div class="message-item" v-for="item, value in messageList" :key="item.user_id">
        <div class="datetime">{{ changeTime(item.time, value) }}</div>
        <div class="message-box record-box " :class="{
          'direction-rt': item?.user_id === self_id
        }">
          <aside class="avatar-column">
            <span class="pointer">
              <img loading="eager" :src="item.user_profile" alt="头像">
            </span>
          </aside>
          <main class="main-column">
            <div class="talk-title">
              <span class="nickname" v-if="item.user_id !== self_id">{{ item.user_name }}</span>
              <span>{{ formatDateShort(new Date(item.time).getTime(), true)}}</span>
            </div>
            <div class="talk-content">
              <div v-if="item.types === '0'" class="text-message right maxwidth">
                <pre> <span style="color:#2196F3;"></span><span v-html="isEmoji(item.content)"></span></pre>
              </div>

              <section v-if="item.types === '1'" class="image-message" max-width="true"
                style="width: 350px; height: 229px;">
                <div class="n-image">
                  <el-image :src="item.content" :zoom-rate="1.2" :hide-on-click-modal="true" :initial-index="1"
                    :preview-src-list="[item.content]" fit="cover" />
                </div>
              </section>
              <!-- 音频文件预留 -->
              <!-- <audio-message v-else-if="item.types == '2'" :src="item.content"
                @contextmenu.native="onCopy(idx, item, $event)" /> -->
              <AudioMessage v-else-if="item.types == '2'" :src="item.content" />
            </div>
          </main>
        </div>
      </div>
    </div>

    <!-- 发送 -->
    <div class="input">
      <div class="profile-img">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="头像">
      </div>
      <textarea placeholder="在这里输入信息···" v-model="ChatMessage"></textarea>
      <div class="rool-btn">
        <div class="smiley" @click="openEmoji">
          <SvgIcon icon="smiley"></SvgIcon>
        </div>
        <el-upload list-type="picture" class="upload-demo" auto-upload action="http://localhost:3000/api/friend/upload"
          :show-file-list="false" :on-success="handSuccess" name="file" method="post">
          <Toolbutton :icon="Paperclip"></Toolbutton>
        </el-upload>
        <Toolbutton :icon="Microphone" @click="openRecording"></Toolbutton>
      </div>
      <div class="send">
        <el-button color="#1C5CFF" size="default" :icon="Promotion" @click="sendMessage" />
      </div>
      <Emoji v-model="isOpenEmoji" @selectEmoji="selectEmoji"></Emoji>
    </div>
  </div>
  <div class="welcome" v-else>
    Welcome ShuceiIM
  </div>


  <Recording v-model="isOpenRecording" @submit="sendRecording"></Recording>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, nextTick } from 'vue'
import { Paperclip, Microphone, Promotion, MoreFilled } from '@element-plus/icons-vue'
import { getMessage, getFriendInfo, sendVoice } from '@/api/friend';
import Toolbutton from './Toolbutton.vue'
import Emoji from './Emoji.vue'
import AudioMessage from '@/components/Message/AudioMessage.vue'
import WebSocketService from '@/plugins/ws-socket';
import { useStore } from 'vuex';
import { formatDateShort } from '@/utils/data'
import { textReplaceEmoji } from '@/utils/emojis.js'
import { UploadFile, UploadFiles } from 'element-plus';
import Recording from './Recording.vue';
const socket = WebSocketService.getInstance('ws://localhost:8081');
const store = useStore()
// 接收父组件传递过来的值
const props = defineProps<{
  modelValue: boolean,
  id: string
}>();
const emit = defineEmits(['update:modelValue']);

/**
 * 获取消息列表
 */
const messageList = ref<any[]>([])
const { _id: self_id, username } = store.state.user.userInfo
const page = ref({
  page: '1',
  limit: '20'
})

/**
 *  获取消息列表
 * @param id 用户id
 */
const userInfo = ref<any>({})
const getLastMessage = async (id: string) => {
  const res = await getMessage({ sender_id: id, receiver_id: self_id, page: page.value.page, limit: page.value.limit }) // 获取消息列表
  const user = await getFriendInfo(id) // 获取用户信息
  userInfo.value = user.data
  messageList.value = res.data.map((message: any) => {
    const { sender_id, receiver_id, ...rest } = message; //rest是剩余参数
    return {
      ...rest,
      user_id: sender_id ? sender_id?._id : receiver_id?._id,
      user_name: sender_id ? sender_id?.username : receiver_id?.username,
      user_profile: sender_id ? sender_id?.profile : receiver_id?.profile
    };
  })
  // 滚动到底部
  nextTick(() => {
    if (MessageRef?.value?.scrollHeight) {
      MessageRef.value.scrollTop = MessageRef.value?.scrollHeight
    }
  })
}

/**
 * 改变时间格式
 * @param time 时间戳
 */
const changeTime = (time: string, value: number) => {
  const Data = new Date(time).getTime()
  if (value != 0) {
    const newDate = new Date(messageList.value[value - 1].time).getTime()
    if (Data - newDate < 500000) {
      return
    } // 5分钟内不显示时间
  }
  return formatDateShort(Data, true)
}


/**
 * 打开用户信息
 */
const openUserInfo = () => {
  emit('update:modelValue', true)
}

/**
 * 发送消息
 */
const ChatMessage = ref<string>('')
const sendMessage = () => {
  socket.send({
    type: 'private',
    user_id: self_id,
    receiver_id: props.id,
    content: ChatMessage.value,
    types: '0',
    user_name: username,
    user_profile: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    time: new Date().getTime()
  })
  ChatMessage.value = ''
}

/**
 *
 * 监听消息,并添加到消息列表,并滚动到底部
 **/
const MessageRef = ref<any>(null)
socket.addEventListener('message', (event: any) => {
  let data = event.data
  data = JSON.parse(data)
  if (data.type === 'private') {
    messageList.value.push(data)
    nextTick(() => {
      if (MessageRef?.value?.scrollHeight) {
        MessageRef.value.scrollTop = MessageRef.value?.scrollHeight
      }
    })
  }
})

/**
 * 打开表情包
 */
const isOpenEmoji = ref<boolean>(false)
const openEmoji = () => {
  isOpenEmoji.value = !isOpenEmoji.value
}

/*
  * 判断是否发送的动态表情
  */
const isEmoji = (value: string): any => {
  const reg = /\[.+?\]/g
  if (value?.match(reg)?.length === 0) {
    return value
  }
  value.match(reg)?.forEach((item: any) => {
    value = value.replace(item, `<img src="${textReplaceEmoji(item)}" />`)
  })
  return value
}

/**
 * 接受子组件传递过来的值,用于添加到输入框，表情包
 */
const selectEmoji = (value: string) => {
  ChatMessage.value += value
}

/**
 * 图片
 */
const handSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  socket.send({
    type: 'private',
    user_id: self_id,
    receiver_id: props.id,
    content: response.imageUrl,
    types: '1',
    user_name: username,
    user_profile: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    time: new Date().getTime()
  })
}

/**
 * 录音
 */
const isOpenRecording = ref<boolean>(false)
const openRecording = () => {
  isOpenRecording.value = !isOpenRecording.value
}

/**
 * 发送录音
 */
const sendRecording = async (file: any) => {
  const formData = new FormData();
  formData.append('audioFile', file);
  const { data } = await sendVoice(formData)
  socket.send({
    type: 'private',
    user_id: self_id,
    receiver_id: props.id,
    content: data,
    types: '2',
    user_name: username,
    user_profile: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    time: new Date().getTime()
  })
}

/**
 * 暴露给父组件的方法
 */
defineExpose({
  getLastMessage
})
</script>

<style lang="scss" scoped>
.welcome {
  width: 100%;
  height: 100%;
  font-size: 30px;
  color: #3d3a3a;
  z-index: 999;

}

/* 全屏聊天窗口 */
.chat-container {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 50px - 74px);
  margin: 0 10px;
  flex: 1;
  background-color: rgba(233, 242, 255, 0.4);
  font-family: Arial, sans-serif;
}

/* 头部标题栏 */
.header {
  display: flex;
  height: 83px;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  color: #fff;
  padding: 0 20px;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.1);
}


/* 消息区域 */
.messages {
  box-sizing: border-box;
  height: 645px;
  padding: 20px;
  overflow: hidden; // 隐藏超出部分，要放在scroll之前，否则会失效
  overflow-y: scroll; // 设置纵向滚动效果，x为横向

  &::-webkit-scrollbar {
    width: 3px;
    height: 4px;
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

  // 没有更多消息了
  .load-toolbar {
    height: 38px;
    color: #409eff;
    text-align: center;
    line-height: 20px;
    font-size: 13px;
    cursor: pointer;
  }

  // 消息列表
  .message-box {
    width: 100%;
    min-height: 30px;
    margin-bottom: 5px;

    // 邀请加入群聊消息提示
    .invite-message {
      display: flex;
      justify-content: center;
    }

    .sys-text {
      margin: 10px auto;
      background-color: #f5f5f5;
      font-size: 11px;
      line-height: 30px;
      padding: 0 8px;
      word-wrap: break-word;
      color: #979191;
      user-select: none;
      font-weight: 300;
      display: inline-block;
      border-radius: 3px;
      max-width: 80%;
      text-align: center;

      a {
        color: #939596;
        cursor: pointer;
        font-size: 12px;
        font-weight: 400;
      }

      span {
        margin: 0 5px;
      }
    }
  }

  // 左边
  .record-box {
    display: flex;
    flex-direction: row;
    transition: .5s ease;

    // 头像
    .avatar-column {
      width: 40px;
      flex-basis: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      order: 2;
      user-select: none;
      padding-top: 7px;
      flex-direction: column;

      img {
        width: 42px;
        height: 42px;
        border-radius: 50%;

      }
    }

    // 内容
    .main-column {
      flex: 1 auto;
      order: 3;
      position: relative;
      box-sizing: border-box;
      padding: 5px;
      /* overflow: hidden; */
      min-height: 30px;

      .talk-title {
        display: flex;
        align-items: center;
        height: 15px;
        margin-bottom: 2px;
        font-size: 12px;
        user-select: none;
        color: #a7a0a0;
        transition: .5s ease;
        opacity: 1;

        span {
          transform: scale(.88);
          transform-origin: left center;
        }
      }

      .talk-content {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        box-sizing: border-box;
        width: 100%;

        .text-message .maxwidth {
          max-width: 70%;
        }

        .text-message {
          position: relative;
          min-width: 30px;
          min-height: 30px;
          padding: 3px;
          color: #333;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.1);
          border-radius: 0 10px;
        }

        .text-message>pre {
          white-space: pre-wrap;
          overflow: hidden;
          word-break: break-word;
          word-wrap: break-word;
          font-size: 14px;
          padding: 3px 5px;
          font-family: PingFang SC, Microsoft YaHei, "Alibaba PuHuiTi 2.0 45";
          line-height: 25px;
        }
      }

      section {
        display: block;
      }

      .image-message {
        overflow: hidden;
        padding: 5px;
        border-radius: 5px;
        background-color: #daf3fd;
        min-width: 30px;
        min-height: 30px;

        .n-image {
          display: inline-flex;
          max-height: 100%;
          max-width: 100%;
        }
      }
    }


  }

  // 控制方向
  .direction-rt {
    .avatar-column {
      order: 3;
    }

    .main-column {
      order: 2;

      .talk-title {
        justify-content: flex-end;
      }

      .talk-content {
        flex-direction: row-reverse;

        .maxwidth {
          max-width: 70%;
        }

        .text-message .right {
          background-color: #daf3fd;
          border-radius: 10px 0;
        }
      }
    }

  }

  // 时间
  .datetime {
    height: 30px;
    line-height: 30px;
    color: #ccc9c9;
    font-size: 12px;
    text-align: center;
    margin: 5px 0;
  }

}



/* 消息输入框和发送按钮 */
.input {
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 60px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -8px 30px 0px rgba(0, 0, 0, 0.06);


  textarea {
    width: calc(100% - 40px);
    flex: 1;
    height: 40px;
    margin: 0;
    border: none;
    border-radius: 5px;
    resize: none;
    font-size: 14px;
    font-family: Arial, sans-serif;
    color: #333;
    outline: none;
    overflow-y: scroll;
    overflow: hidden; // 隐藏超出部分
    margin-top: 20px;
    margin-left: 20px;

    &::-webkit-scrollbar {
      width: 0;
      height: 6px;
    }
  }

  .profile-img {
    border-right: 2px solid #eee;
    padding: 0 15px;
    line-height: 13px;
    margin-left: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .rool-btn {
    display: flex;

    .smiley {
      width: 36px;
      height: 36px;
      margin-right: 12px;
      background-color: var(--el-color-primary);
      border-radius: var(--el-border-radius-base);
      line-height: 36px;
      cursor: pointer;
      font-size: 13px;

      &:hover {
        background-color: var(--el-color-primary-light-5);
      }
    }
  }

  .send {
    width: 80px;
    margin-left: 15px;
    border-left: 2px solid #eee;
  }
}

.upload-demo {
  margin-right: 13px;
}

// /* 媒体查询 */
// @media (max-width: 768px) {
//   .chat-container {
//     width: 90%;
//     height: 90%;
//     left: 5%;
//     top: 5%;
//   }
// }
</style>
