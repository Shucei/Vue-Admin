<template>
  <div class="my-container">
    <el-row>
      <el-col :span="8">
        <project-card class="user-card"></project-card>
      </el-col>
      <el-col :span="15">
        <el-card>
          <el-tabs class="demo-tabs" v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.information')" name="information">
              <Information></Information>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.account')" name="account">
              <Account></Account>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Information from './components/Informmation.vue'
import Account from './components/Account.vue'
import { ref } from 'vue'
const activeName = ref('information')
const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
