<template>
  <div class="messagelist ">
    <div class="search ">
      <el-input v-model="input" placeholder="请输入关键字" :prefix-icon="Search" size="large" />
      <div class="icon">
        <span>147</span>
        <SvgIcon icon="People" class-name="people-icon"></SvgIcon>
      </div>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane :label="$t('msg.message.chats')" name="first">
        <Chat v-for="item in 10" :key="item"></Chat>
      </el-tab-pane>
      <el-tab-pane :label="$t('msg.message.group')" name="second">{{ $t('msg.message.group') }}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import type { TabsPaneContext } from 'element-plus'
import Chat from '@/components/Chat/index.vue'

const activeName = ref<string>('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const input = ref('');

</script>

<style lang="scss" scoped>
::v-deep #pane-first {
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

  padding-bottom: 88px;
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
