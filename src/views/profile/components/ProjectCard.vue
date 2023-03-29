<template>
  <el-card class="box-card">
    <pan-thumb :image="$store.getters.avatar0" :height="'100px'" :width="'100px'" :hoverable="false">
      {{ $store.getters.userInfo.username }}
    </pan-thumb>
    <div class="tag-group my-2 flex flex-wrap gap-1 items-center">
      <el-tag style="margin-right: 8px" type='success' effect="dark">怕麻烦</el-tag>
      <el-tag style="margin-right: 8px" type='success' effect="dark">腹黑</el-tag>
      <el-tag style="margin-right: 8px" type='success' effect="dark">人傻钱多</el-tag>
      <el-tag style="margin-right: 8px;margin-bottom: 5px;" type='info' effect="dark">自信</el-tag>
      <el-tag style="margin-right: 8px;margin-bottom: 5px;" type='info' effect="dark">自信</el-tag>
    </div>
  </el-card>
</template>

<script  setup>

</script>

<style lang="scss" scoped>
.box-card {
  text-align: center;
}
</style>
