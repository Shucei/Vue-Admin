<template>
  <div class="chat-window">
    <div class="header">
      <div class="user-info">
        <img src="user-avatar.png" alt="User Avatar" class="avatar">
        <h4 class="name">John Doe</h4>
      </div>
      <div class="actions">
        <button class="btn minimize"></button>
        <button class="btn maximize"></button>
        <button class="btn close">关闭</button>
      </div>
    </div>
    <div class="messages">
      <div class="message received">
        <p class="content">Hi there! How are you?</p>
        <span class="time">10:30 AM</span>
      </div>
      <div class="message sent">
        <p class="content">I'm doing great. How about you?</p>
        <span class="time">10:32 AM</span>
      </div>
      <div class="message received">
        <p class="content">I'm good too. Thanks for asking.</p>
        <span class="time">10:33 AM</span>
      </div>
    </div>
    <div class="input">
      <textarea placeholder="Type a message"></textarea>
      <button class="btn send">发送</button>
    </div>
  </div>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
.chat-window {
  flex: 1;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

.header {
  position: relative;
  height: 50px;
  padding: 10px;
  background-color: #f2f2f2;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #ddd;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.name {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.actions {
  position: absolute;
  top: 10px;
  right: 10px;
}

.btn {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border: none;
  cursor: pointer;
}


.messages {
  height: 280px;
  padding: 10px;
  overflow-y: scroll;
}

.message {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  max-width: 80%;
}

.received {
  background-color: #f2f2f2;
  float: left;
}

.sent {
  background-color: #dcf8c6;
  float: right;
}

.content {
  margin: 0;
}

.time {
  font-size: 12px;
  color: #999;
}

.input {
  position: relative;
  height: 60px;
  padding: 10px;
  border-top: 1px solid #ddd;
}

textarea {
  width: calc(100% - 40px);
  height: 40px;
  padding: 5px;
  margin: 0;
  border: none;
  border-radius: 5px;
  resize: none;
  font-size: 14px;
  font-family: Arial, sans-serif;
}

.send {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border: none;
  cursor: pointer;
}

.send:focus {
  outline: none;
}
</style>
