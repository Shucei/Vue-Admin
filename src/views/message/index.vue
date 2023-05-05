<template>
  <div class="container">
    <MessageList></MessageList>
    <MessageWindow></MessageWindow>
    <UserInformation></UserInformation>
  </div>
</template>

<script lang="ts" setup>
import MessageList from './components/MessageList.vue';
import MessageWindow from './components/MessageWindow.vue';
import UserInformation from './components/UserInformation.vue';

</script>

<style scoped lang="scss">
.container {
  height: 100%;
  min-width: 500px;
  display: flex;

}
</style>
