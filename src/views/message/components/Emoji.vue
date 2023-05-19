<template>
  <transition name="emotion">
    <div class="emoji" v-if="modelValue">
      <div class="emoji-content">
        <div class="emoji-content-header">
          <div class="emoji-content-header-title">QQ表情/符号表情</div>

          <div class="emoji-content-header-close">
            <el-icon @click="close">
              <CircleCloseFilled />
            </el-icon>
          </div>
        </div>
        <div class="emoji-content-body">
          <div class="emoji-content-body-item" v-for="item, value in emojiList.emojis" :key="value"
            @click="selectEmoji(value)">
            <img :src="item" alt="value">
          </div>
          <div class="emoji-content-body-item" v-for="item in emojiList.symbol" :key="item" @click="selectEmoji(item)">
            {{
  item
            }}</div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script lang="ts" setup>
import { emojiList } from '@/utils/emojis.js'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { defineProps, defineEmits, watch } from 'vue'
const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits(['update:modelValue', 'selectEmoji'])


const selectEmoji = (item: string): void => {
  emits('selectEmoji', item)
}

const close = (e: any): void => {
  if (e.target.className !== 'smiley' && e.target.className !== 'svg-icon') {
    emits('update:modelValue', false);
  }
}
watch(() => props.modelValue, val => {
  if (val) {
    document.body.addEventListener('click', close)
  } else {
    document.body.removeEventListener('click', close)
  }
})

</script>

<style lang="scss" scoped>
.emoji {
  position: absolute;
  bottom: 70px;
  left: 50%;
  width: 400px;
  height: 260px;
  opacity: 1;
  border-radius: 21px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);




  .emoji-content {
    width: 100%;
    height: 100%;

    .emoji-content-header {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .emoji-content-header-title {
        font-size: 16px;
        font-weight: bold;
      }

      .emoji-content-header-close {
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }
    }

    .emoji-content-body {
      width: 100%;
      height: calc(100% - 40px);
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      overflow-y: scroll;

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
      }

      .emoji-content-body-item {
        width: 35px;
        height: 35px;
        margin: 5px;
        cursor: pointer;
        font-size: 30px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
