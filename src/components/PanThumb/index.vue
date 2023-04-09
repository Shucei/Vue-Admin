<template>
  <div class="information">
    <div :style="{ zIndex: zIndex, height: height, width: width }" class="pan-item">
      <div :style="{ backgroundImage: `url(${image})` }" class="pan-thumb"></div>
    </div>
    <div class="username">
      <div class="name">ShuAdmin</div>
      <p class="sign">术有专攻 业精于勤</p>
    </div>
    <el-button class="icon" type="primary" :icon="User" round><a href="https://github.com/Shucei/">Follow
        me</a></el-button>
    <div class="Information-list">
      <div class="user">
        <el-icon>
          <User />
        </el-icon>
        <span>前端小白</span>
      </div>
      <div class="birthday">
        <el-icon>
          <Star />
        </el-icon>
        <span>1999/03/22</span>
      </div>
      <div class="sex">
        <el-icon>
          <Female />
        </el-icon>
        <span>男</span>
      </div>
      <div class="department">
        <el-icon>
          <OfficeBuilding />
        </el-icon>
        <span>集团-事业群-技术部</span>
      </div>
      <div class="address">
        <el-icon>
          <LocationInformation />
        </el-icon>
        <span>中国▪广东省▪深圳市</span>
      </div>
      <el-divider />
    </div>
  </div>



</template>

<script setup>
import { defineProps } from 'vue'
import {
  User, Star, Female, LocationInformation, Male, OfficeBuilding
} from '@element-plus/icons-vue'
defineProps({
  image: {
    type: String,
    default: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif'
  },
  zIndex: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: '150px'
  },
  height: {
    type: String,
    default: '150px'
  },
  detailData: {
    type: Object,
    default: () => { }
  }
})
</script>

<style lang="scss" scoped>
.information {
  word-break: keep-all;
  white-space: nowrap;
}

.pan-item {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: default;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}


.pan-thumb {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  transform-origin: 95% 40%;
  transition: all 0.3s ease-in-out;
}

.username {
  height: 100%;
  line-height: 28px;
  padding: 10px 0;

  .name {
    font-weight: 500;
    font-size: 20px;
  }
}

.information {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
}

.Information-list {
  text-align: center;
  line-height: 2;
  padding: 10px 80px 0 80px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  div {
    display: flex;
    align-items: center;
    font-weight: 400;
    color: var(--el-color-primary);

    span {
      margin-left: 10px;
    }
  }

}
</style>
