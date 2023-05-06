<template>
  <div class="chat-container">
    <div class="header">
      <div class="message-left">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="用户头像">
        <div class="username">
          <div class="name">Shu</div>
          <div class="time">离线</div>
        </div>
      </div>
      <el-icon size="24" color="#1C5CFF">
        <MoreFilled />
      </el-icon>
    </div>
    <div class="messages">
      <!-- 聊天消息区域 -->
      <div class="load-toolbar">
        <span class="no-more"> 没有更多消息了</span>
      </div>
      <div class="message-item">
        <div class="message-box">
          <div class="invite-message">
            <div class="sys-text"><a>gzydong</a><span>邀请了</span><a>大飞</a><em
                style="display: none;">、</em><span>加入群聊</span></div>
          </div>
        </div>
        <div class="datetime" style="display: none;">13:47</div>
      </div>
      <div class="message-item">
        <div class="message-box record-box">
          <aside class="avatar-column">
            <img loading="eager"
              src="https://im.gzydong.club/public/media/image/avatar/20230221/d14a500282dd3c4df2cc2bbfc9a77671_200x200.png">
          </aside>
          <main class="main-column">
            <div class="talk-title">
              <span class="nickname">猪八戒2</span>
              <span>05/06 13:47</span>
            </div>
            <div class="talk-content">
              <div class="text-message left maxwidth">
                <pre>测试  <span style="color:#2196F3;">@所有人</span>  给太热</pre>
              </div>
            </div>
          </main>
        </div>
        <div class="datetime" style="display: none;">13:47</div>
      </div>
      <div class="message-item">
        <div class="message-box record-box direction-rt">
          <aside class="avatar-column">
            <span class="n-avatar __avatar-fzck4p-mb pointer">
              <img loading="eager" src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif">
            </span>
          </aside>
          <main class="main-column">
            <div class="talk-title">
              <span class="nickname" style="display: none;">大飞</span>
              <span>05/06 13:47</span>
            </div>
            <div class="talk-content">
              <div class="text-message right maxwidth">
                <pre><span style="color:#2196F3;">@大飞</span>  i你好</pre>
              </div>
            </div>
          </main>
        </div>
        <div class="datetime">13:47</div>
      </div>
    </div>
    <div class="input">
      <div class="profile-img">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="头像">
      </div>
      <textarea placeholder="在这里输入信息···"></textarea>
      <div class="rool-btn">
        <div class="smiley">
          <SvgIcon icon="smiley"></SvgIcon>
        </div>
        <Toolbutton :icon="Paperclip"></Toolbutton>
        <Toolbutton :icon="Microphone"></Toolbutton>
      </div>
      <div class="send">
        <el-button color="#1C5CFF" size="default" :icon="Promotion" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Paperclip, Microphone, Promotion, MoreFilled } from '@element-plus/icons-vue'
import Toolbutton from './Toolbutton.vue'
const input3 = ref('');

</script>

<style lang="scss" scoped>
/* 全屏聊天窗口 */
.chat-container {
  position: relative;
  width: 100%;
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
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
  overflow: hidden; // 隐藏超出部分

  &::-webkit-scrollbar {
    width: 3px;
    height: 6px;
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
