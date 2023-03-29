<template>
  <div class="home">

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})

</script>

<style lang="scss" scoped>
.home {
  background-image: url('@/assets/images/welcome.png');
  min-height: calc(100vh - 50px - 43px);
  background-size: 80% 80%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
