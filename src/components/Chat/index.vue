<template>
  <!-- active -->
  <div class="chat">
    <div class="top">
      <div class="message-left">
        <img src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" alt="用户头像">
        <div class="username">
          <div class="name">Shu</div>
          <div class="time Online_status">在线</div>
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



