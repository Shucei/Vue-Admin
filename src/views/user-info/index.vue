<template>
  <div class="">
    <el-card class="box-card">
      <pan-thumb :detailData="detailData" :image="$store.getters.avatar0" :height="'100px'" :width="'100px'"
        :hoverable="false">
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
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb/index.vue'
import { getPersonalDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { defineProps, ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 数据相关
const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await getPersonalDetail(props.id)
  console.log(detailData.value);
}
getUserDetail()
// 语言切换
watchSwitchLang(getUserDetail)
</script>

<style lang="scss" scoped>
.box-card {
  text-align: center;
}
</style>
