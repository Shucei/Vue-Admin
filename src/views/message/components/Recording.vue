<template>
  <div class="lum-dialog-mask animated" v-if="modelValue">
    <el-container class="lum-dialog-box">
      <el-header class="no-padding header no-select">
        <p>语音消息</p>
        <p class="tools">
          <el-icon @click="closeBox">
            <CloseBold />
          </el-icon>
          <!-- <i class="el-icon-close" @click="closeBox" /> -->
        </p>
      </el-header>

      <el-main class="no-padding header mian">
        <div class="music">
          <span class="line line1" :class="{ 'line-ani': animation }"></span>
          <span class="line line2" :class="{ 'line-ani': animation }"></span>
          <span class="line line3" :class="{ 'line-ani': animation }"></span>
          <span class="line line4" :class="{ 'line-ani': animation }"></span>
          <span class="line line5" :class="{ 'line-ani': animation }"></span>
        </div>
        <div style="margin-top: 35px; color: #676262; font-weight: 300">
          <template v-if="recorderStatus == 0">
            <p style="font-size: 13px; margin-top: 5px">
              <span>语音消息，让聊天更简单方便 ...</span>
            </p>
          </template>
          <template v-else-if="
            recorderStatus == 1 || recorderStatus == 2 || recorderStatus == 3
          ">
            <p>{{ datetime }}</p>
            <p style="font-size: 13px; margin-top: 5px">
              <span v-if="recorderStatus == 1">正在录音...</span>
              <span v-else-if="recorderStatus == 2">已暂停录音</span>
              <span v-else-if="recorderStatus == 3">录音时长</span>
            </p>
          </template>
          <template v-else-if="
            recorderStatus == 4 || recorderStatus == 5 || recorderStatus == 6
          ">
            <p>{{ formatPlayTime }}</p>
            <p style="font-size: 13px; margin-top: 5px">
              <span v-if="recorderStatus == 4">正在播放</span>
              <span v-else-if="recorderStatus == 5">已暂停播放</span>
              <span v-else-if="recorderStatus == 6">播放已结束</span>
            </p>
          </template>
        </div>
      </el-main>

      <el-footer class="footer" height="50px">
        <!-- 0:未开始录音 1:正在录音 2:暂停录音 3:结束录音 4:播放录音 5:停止播放 -->
        <el-button v-show="recorderStatus == 0" type="primary" round :icon="Microphone" @click="startRecorder">开始录音
        </el-button>
        <el-button v-show="recorderStatus == 1" type="primary" round :icon="VideoPause" @click="pauseRecorder">暂停录音
        </el-button>
        <el-button v-show="recorderStatus == 2" type="primary" round @click="resumeRecorder">继续录音
        </el-button>
        <el-button v-show="recorderStatus == 2" type="primary" round @click="stopRecorder">结束录音
        </el-button>

        <el-button v-show="recorderStatus == 3 || recorderStatus == 6" type="primary" round :icon="VideoPlay"
          @click="playRecorder">播放录音</el-button>

        <el-button v-show="
          recorderStatus == 3 || recorderStatus == 5 || recorderStatus == 6
        " type="primary" round :icon="VideoPlay" @click="startRecorder">重新录音</el-button>

        <el-button v-show="recorderStatus == 4" type="primary" round :icon="VideoPause"
          @click="pausePlayRecorder">暂停播放</el-button>

        <el-button v-show="recorderStatus == 5" type="primary" round :icon="VideoPlay"
          @click="resumePlayRecorder">继续播放</el-button>

        <el-button v-show="
          recorderStatus == 3 || recorderStatus == 5 || recorderStatus == 6
        " type="primary" round @click="submit">立即发送
        </el-button>
      </el-footer>
    </el-container>


  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import Recorder from 'js-audio-recorder'
import { Microphone, VideoPause, VideoPlay, CloseBold } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'MeEditorRecorder',
  components: {
    CloseBold
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'submit'],
  setup(props, { emit }) {
    const recorder = ref<any>(null) // 录音实例
    const duration = ref<number>(0) // 录音时长
    const playTime = ref<number>(0) // 播放时长
    const animation = ref<boolean>(false)
    // 当前状态
    const recorderStatus = ref<number>(0) // 0:未开始录音 1:正在录音 2:暂停录音 3:结束录音 4:播放录音 5:停止播放 6:播放结束
    const playTimeout = ref<any>(null) // 播放定时器



    const datetime = computed(() => {
      let hour: number | string = parseInt(((duration.value / 60 / 60) % 24).toString()) // 小时
      let minute: number | string = parseInt(((duration.value / 60) % 60).toString()) // 分钟
      let seconds: number | string = parseInt((duration.value % 60).toString()) // 秒

      if (hour < 10) hour = `0${hour}`
      if (minute < 10) minute = `0${minute}`
      if (seconds < 10) seconds = `0${seconds}`

      return `${hour}:${minute}:${seconds}`
    })

    const formatPlayTime = computed(() => {
      let hour: number | string = parseInt(((playTime.value / 60 / 60) % 24).toString()) // 小时
      let minute: number | string = parseInt(((playTime.value / 60) % 60).toString()) // 分钟
      let seconds: number | string = parseInt((playTime.value % 60).toString()) // 秒

      if (hour < 10) hour = `0${hour}`
      if (minute < 10) minute = `0${minute}`
      if (seconds < 10) seconds = `0${seconds}`

      return `${hour}:${minute}:${seconds}`
    })

    const closeBox = () => {
      if (recorder.value == null) {
        emit('update:modelValue', false)
        return
      }

      if (recorderStatus.value === 1) {
        stopRecorder()
      } else if (recorderStatus.value === 4) {
        pausePlayRecorder()
      }

      // 销毁录音后关闭窗口
      destroyRecorder(() => {
        emit('update:modelValue', false)
      })
    }

    // 开始录音
    const startRecorder = () => {
      recorder.value = new Recorder()
      recorder.value.onprocess = (durations: number) => {
        const res = parseInt(durations.toString())
        duration.value = res
      }

      recorder.value.start().then(
        () => {
          recorderStatus.value = 1
          animation.value = true
        },
        () => {
          recorderStatus.value = 0
        } // 拒绝授权
      )
    }

    // 暂停录音
    const pauseRecorder = () => {
      recorder.value?.pause()
      recorderStatus.value = 2
      animation.value = false
    }



    // 继续录音
    const resumeRecorder = () => {
      recorderStatus.value = 1
      recorder.value?.resume()
      animation.value = true
    }

    // 结束录音
    const stopRecorder = async () => {
      recorderStatus.value = 3
      await recorder.value?.stop()
      animation.value = false
    }

    // 播放录音
    const playRecorder = () => {
      recorderStatus.value = 4
      recorder.value?.play()
      playTimeouts()
      animation.value = true
    }

    // 停止播放
    const stopPlayRecorder = () => {
      recorder.value?.stopPlay()
      recorderStatus.value = 5
      if (playTimeout.value !== null) {
        clearInterval(playTimeout.value)
        playTimeout.value = null
      }
      playTime.value = 0
    }

    // 暂停播放
    const pausePlayRecorder = () => {
      recorderStatus.value = 5
      recorder.value?.pausePlay()
      clearInterval(playTimeout.value)
      animation.value = false
    }

    // 继续播放
    const resumePlayRecorder = () => {
      recorderStatus.value = 4
      recorder.value.resumePlay()
      playTimeouts()
      animation.value = true
    }

    // 销毁录音
    const destroyRecorder = async (callback: any) => {
      await recorder.value.destroy()
      recorder.value = null
      duration.value = 0
      playTime.value = 0
      recorderStatus.value = 0
      if (callback) {
        callback()
      }
    }

    const submit = () => {
      // TODO: 提交录音
      const blob = recorder.value.getWAVBlob()
      const file = new File([blob], '在线录音.wav', {
        type: blob.type,
        lastModified: Date.now(),
      })

      if (recorderSize() > 1024 * 1024 * 10) {
        ElMessage.error('录音文件大小不能超过10M')
        return
      }
      emit('submit', file)
      closeBox()
      emit('update:modelValue', false)
    }


    watch(recorderStatus, (newVal) => {
      if (newVal === 3 || newVal === 5 || newVal === 6) {
        animation.value = false
      }
    })

    // 获取录音文件大小（单位：字节）
    const recorderSize = () => {
      return recorder.value.fileSize
    }

    // 获取录音时长（单位：秒）
    const playTimeouts = () => {
      playTimeout.value = setInterval(() => {
        const time = parseInt(recorder.value?.getPlayTime()) // 获取播放时长
        playTime.value = time
        if (time == duration.value) {
          clearInterval(playTimeout.value)
          animation.value = false
          recorderStatus.value = 6
        }
      }, 100)
    }

    return {
      recorder,
      duration,
      playTime,
      animation,
      recorderStatus,
      playTimeout,
      datetime,
      formatPlayTime,
      closeBox,
      startRecorder,
      pauseRecorder,
      resumeRecorder,
      stopRecorder,
      playRecorder,
      stopPlayRecorder,
      pausePlayRecorder,
      resumePlayRecorder,
      destroyRecorder,
      submit,
      Microphone,
      VideoPause,
      VideoPlay,
      CloseBold
    }
  }
})
</script>


<style lang="scss" scoped>
.lum-dialog-box {
  position: fixed;
  top: 30%;
  left: 50%;
  width: 400px;
  max-width: 500px;
  height: 450px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
  }

  .mian {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .footer {
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-top: 1px solid #f7f3f3;
  }
}

.music {
  position: relative;
  width: 180px;
  height: 160px;
  border: 8px solid #eae8e8;
  border-bottom: 0px;
  border-top-left-radius: 110px;
  border-top-right-radius: 110px;
}

.music:before,
.music:after {
  content: '';
  position: absolute;
  bottom: -20px;
  width: 40px;
  height: 82px;
  background-color: #eae8e8;
  border-radius: 15px;
}

.music:before {
  right: -25px;
}

.music:after {
  left: -25px;
}

.line {
  position: absolute;
  width: 6px;
  min-height: 30px;
  transition: 0.5s;

  vertical-align: middle;
  bottom: 0 !important;
  box-shadow: inset 0px 0px 16px -2px rgba(0, 0, 0, 0.15);
}

.line-ani {
  animation: equalize 4s 0s infinite;
  animation-timing-function: linear;
}

.line1 {
  left: 30%;
  bottom: 0px;
  animation-delay: -1.9s;
  background-color: #ff5e50;
}

.line2 {
  left: 40%;
  height: 60px;
  bottom: -15px;
  animation-delay: -2.9s;
  background-color: #a64de6;
}

.line3 {
  left: 50%;
  height: 30px;
  bottom: -1.5px;
  animation-delay: -3.9s;
  background-color: #5968dc;
}

.line4 {
  left: 60%;
  height: 65px;
  bottom: -16px;
  animation-delay: -4.9s;
  background-color: #27c8f8;
}

.line5 {
  left: 70%;
  height: 60px;
  bottom: -12px;
  animation-delay: -5.9s;
  background-color: #cc60b5;
}

@keyframes equalize {
  0% {
    height: 48px;
  }

  4% {
    height: 42px;
  }

  8% {
    height: 40px;
  }

  12% {
    height: 30px;
  }

  16% {
    height: 20px;
  }

  20% {
    height: 30px;
  }

  24% {
    height: 40px;
  }

  28% {
    height: 10px;
  }

  32% {
    height: 40px;
  }

  36% {
    height: 48px;
  }

  40% {
    height: 20px;
  }

  44% {
    height: 40px;
  }

  48% {
    height: 48px;
  }

  52% {
    height: 30px;
  }

  56% {
    height: 10px;
  }

  60% {
    height: 30px;
  }

  64% {
    height: 48px;
  }

  68% {
    height: 30px;
  }

  72% {
    height: 48px;
  }

  76% {
    height: 20px;
  }

  80% {
    height: 48px;
  }

  84% {
    height: 38px;
  }

  88% {
    height: 48px;
  }

  92% {
    height: 20px;
  }

  96% {
    height: 48px;
  }

  100% {
    height: 48px;
  }
}
</style>
