<template>
  <div class="userinfo" v-if="modelValue">
    <div class="user">
      <div class="userimg">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="">
      </div>
      <div class="username">
        <div class="name">Shu</div>
        <div class="address">中国 • 北京</div>
      </div>
      <div class="signature">
        帮助人们更便捷地获取信息，找到所需，发现新鲜事物。
      </div>
      <div class="social-tools">
        <SvgIcon icon="weixin"></SvgIcon>
        <SvgIcon icon="qq2"></SvgIcon>
        <SvgIcon icon="GitHub"></SvgIcon>
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="contact">
      <div class="phone">
        <div class="title">电话：</div>
        <div class="phone-item">
          +(86) 45550110
        </div>
      </div>
      <div class="email">
        <div class="title">E-mail：</div>
        <div class="email-item">
          info@uxdesigner.im
        </div>
      </div>
      <div class="birthday">
        <div class="title">出生日期：</div>
        <div class="birthday-item">
          1999-03-21
        </div>
      </div>
    </div>

    <!-- 留言 -->
    <div class="message-board">
      <div class="title">
        <p>留言(20)</p>
        <span>更多 ></span>
      </div>
      <div class="board">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="留言信息">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="留言信息">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="留言信息">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="留言信息">
      </div>
    </div>

    <!-- 删除 -->
    <el-button type="danger">删除好友</el-button>

    <!-- 关闭 -->
    <el-button :icon="CloseBold" class="close" @click="closeUserInfo"></el-button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
const props = defineProps<{
  modelValue: boolean
}>();

const emit = defineEmits(['update:modelValue']);

const closeUserInfo = () => {
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.userinfo {
  position: relative;
  width: 20%;
  padding: 0 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 248, 248, 1) 70.12%, rgba(255, 255, 255, 1) 100%);
  min-width: 300px;

  .user {
    display: flex;
    flex: 40%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.1);
    padding: 20px 0;

    .userimg {
      width: 160px;
      height: 160px;
      margin: 20px 0;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .username {
      font-size: 20px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 22px;
      color: rgba(24, 28, 47, 1);
      text-align: center;
      vertical-align: top;

      div {
        padding: 4px 0;
      }

      .address {
        font-size: 16px;
        line-height: 23.17px;
        color: #979191;
      }
    }

    .signature {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0px;
      line-height: 20.27px;
      color: rgba(24, 28, 47, 1);
      text-align: center;
    }

    .social-tools {
      font-size: 30px;
      padding-top: 20px;

      // 字边距样式
      svg {
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }

  .contact {
    display: flex;
    flex: 30%;

    justify-content: center;
    flex-direction: column;
    // align-items: center;
    box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.1);
    padding: 20px 20px;

    .phone,
    .email,
    .birthday {
      display: flex;


      div {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 40px;
        color: rgba(24, 28, 47, 1);
        text-align: left;
        vertical-align: top;
      }
    }
  }

  .message-board {
    .title {
      display: flex;
      padding: 20px 0;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 20.27px;
      color: rgb(183, 184, 189);
      text-align: left;
      vertical-align: top;

      span {
        color: rgba(244, 74, 74, 1);
        cursor: pointer;
      }
    }

    .board {
      display: flex;

      img {
        width: 60px;
        height: 60px;
        margin-right: 6px;
        box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.08);
      }
    }
  }
}

.el-button--danger {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
}

.close {
  position: absolute;
  right: 0;
  top: 0;
  border: none;
}
</style>
