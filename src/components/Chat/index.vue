<template>
  <div class="chat active">
    <div class="top">
      <div class="left">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="用户头像">
        <div class="username">
          <div class="name">Shu</div>
          <div class="time Online_status">线上</div>
        </div>
      </div>
      <div class="right">
        3小时以前
      </div>
    </div>
    <div class="bottom">
      欢迎宁奥克兰的腹肌拉伤雕刻技法拉动房价爱上了阿斯顿发射点发射点发的
    </div>
  </div>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 362px;
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

  &:hover {
    transform: translateY(-7px);
  }



  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;


    .left {
      display: flex;
      align-items: center;
      flex: 1;

      img {
        width: 46px;
        height: 39.02px;
        border-radius: 50%;
        margin-right: 15px;
      }

      .name {
        width: 72px;
        height: 22px;
        /** 文本1 */
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 22px;
        color: rgba(24, 28, 47, 1);
        text-align: left;
        vertical-align: top;
      }

      .time {
        width: 28px;
        height: 22px;
        opacity: 0.3;
        /** 文本1 */
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 22px;
        color: rgba(24, 28, 47, 1);
        text-align: left;
        vertical-align: top;
      }

      .Online_status {
        opacity: 1;
        color: rgba(52, 216, 89, 1);
      }
    }

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

.active {
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
</style>



