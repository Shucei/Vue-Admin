<template>
  <ul class="context-menu-container" @click="onClose($event)">
    <li data-close="0">
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <li data-close="right">
      {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li data-close="other">
      {{ $t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})
const store = useStore()
const router = useRouter()

const onClose = (e) => {
  const information = e.target.dataset.close
  if (information === '0') {
    router.go(0)
  } else if (information === 'right') {
    store.commit('app/removeTagsView', {
      type: 'right',
      index: props.index
    })
  } else {
    store.commit('app/removeTagsView', { type: 'other', index: props.index })
  }

}

</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
