<template>
  <el-button type="primary" :icon="icon" />
</template>

<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: Object,
    default: null
  }
})

</script>

<style lang="scss" scoped>
.el-button--primary {
  width: 36px;
  height: 36px;
}
</style>
