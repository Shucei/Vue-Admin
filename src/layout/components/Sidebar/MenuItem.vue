<template>
  <i v-if="icon.includes('el-icon')" class="sub-el-icon" :class="icon"></i>
  <svg-icon class="iconfont" v-else :icon="icon"></svg-icon>
  <span class="title" v-if="$store.getters.sidebarOpened">{{ generateTitle(title) }}</span>
</template>
<script setup>
import { defineProps } from 'vue'
import { generateTitle } from '@/utils/i18n'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.title {
  // 文本不可选中
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.iconfont {
  font-size: 22px;
  vertical-align: middle;
}

.title {
  vertical-align: middle;
}
</style>
