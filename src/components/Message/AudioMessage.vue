<template>
  <div class="audio-message">
    <div class="videodisc">
      <div class="disc" :class="{ play: isPlay }" @click="toPlay">
        <el-icon v-if="loading">
          <Loading />
        </el-icon>
        <el-icon v-else-if="isPlay">
          <VideoPause />
        </el-icon>
        <el-icon v-else>
          <VideoPlay />
        </el-icon>
        <audio ref="audioRef" preload="auto" type="audio/mp3,audio/wav" :src="src" @timeupdate="timeupdate"
          @ended="ended" @canplay="canplay" @error="onError"></audio>
      </div>
    </div>
    <div class="detail">
      <div class="text">
        <el-icon>
          <Headset />
        </el-icon>
        <span>{{ getCurrDuration }} / {{ getTotalDuration }}</span>
      </div>
      <div class="process">
        <el-progress :percentage="progress" color="#ff5722" :show-text="false" :stroke-width="4" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { Headset, VideoPause, VideoPlay, Loading } from '@element-plus/icons-vue'
function formatSeconds(value: number): string {
  let theTime = parseInt(value.toString()); // 秒
  let theTime1 = 0; // 分
  let theTime2 = 0; // 小时
  if (theTime > 60) {
    theTime1 = parseInt((theTime / 60).toString());
    theTime = parseInt((theTime % 60).toString());
    if (theTime1 > 60) {
      theTime2 = parseInt((theTime1 / 60).toString());
      theTime1 = parseInt((theTime1 % 60).toString());
    }
  }

  let result = `${parseInt(theTime.toString())}`; // 秒
  if (theTime > 0 && theTime < 10) {
    result = `0${parseInt(theTime.toString())}`; // 秒
  } else {
    result = `${parseInt(theTime.toString())}`; // 秒
  }

  if (theTime > 0 && theTime < 10) {
    result = `0${parseInt(theTime1.toString())}:${result}`; // 分，不足两位数，首位补充0
  } else {
    result = `${parseInt(theTime1.toString())}:${result}`; // 分
  }

  if (theTime2 > 0) {
    result = `${parseInt(theTime2.toString())}:${result}`; // 时
  }
  return result;
}

export default defineComponent({
  name: 'AudioMessage',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  components: {
    Headset,
    VideoPause,
    VideoPlay,
    Loading
  },
  setup(props) {
    const loading = ref<boolean>(true); // 是否正在加载
    const isPlay = ref<boolean>(false); // 是否正在播放
    const duration = ref<number>(0); // 总时长
    const currentTime = ref<number>(0); // 当前播放时长
    const progress = ref<number>(0); // 进度
    const error = ref<boolean>(false); // 是否加载失败
    const audioRef = ref<HTMLAudioElement | null>(null); // audio dom
    const getTotalDuration = computed(() => {
      return formatSeconds(duration.value);
    });

    const getCurrDuration = computed(() => {
      return formatSeconds(currentTime.value);
    });

    const toPlay = () => {
      if (loading.value || error.value) {
        return;
      }
      if (isPlay.value) {
        audioRef.value?.pause();
      } else {
        audioRef.value?.play();
      }

      isPlay.value = !isPlay.value;
    };

    const timeupdate = () => {
      if (audioRef.value?.duration == 0) {
        progress.value = 0;
      } else {
        currentTime.value = audioRef.value?.currentTime as number;
        if (audioRef.value?.currentTime || audioRef.value?.duration) {
          progress.value = (audioRef.value?.currentTime / audioRef.value?.duration) * 100;
        }
      }
    };

    const canplay = () => {
      duration.value = audioRef.value?.duration as number;
      loading.value = false;
    };

    const ended = () => {
      isPlay.value = false;
      progress.value = 0;
    };

    const onError = () => {
      error.value = true;
      loading.value = false;
    };

    return {
      loading,
      isPlay,
      duration,
      currentTime,
      progress,
      error,
      audioRef,
      getTotalDuration,
      getCurrDuration,
      toPlay,
      timeupdate,
      canplay,
      ended,
      onError,
      Headset,
      VideoPause,
      VideoPlay,
      Loading
    };
  },
});
</script>

<style scoped lang="scss">
.audio-message {
  width: 200px;
  height: 60px;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  align-items: center;
  border: 1px solid #ff5722;
  overflow: hidden;

  >div {
    height: 100%;
  }

  .videodisc {
    flex-basis: 60px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .disc {
      width: 42px;
      height: 42px;
      background: #ff5722;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;

      &.play {
        background: #ff5722;
        animation: spin 3s linear infinite;
      }

      i {
        font-size: 24px;
      }

      &:active i {
        transform: scale(1.2);
      }
    }
  }

  .detail {
    flex: 1 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;

    .text {
      width: 90%;
      font-size: 12px;

      i {
        margin-right: 5px;
      }
    }

    .process {
      padding-top: 10px;
      height: 20px;
      width: 90%;
    }
  }
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
