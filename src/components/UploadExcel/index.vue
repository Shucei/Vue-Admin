<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input ref="excelUploadInput" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleChange" />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <!--drop拖拽到可释放区域释放时触发、dragover，dragenter拖拽到可释放区域时触发   -->
    <div class="drop" @drop.stop.prevent="handleDrop" @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover">
      <i class="el-icon-upload" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as XLSX from 'xlsx'
import { ref, defineProps, Ref } from 'vue'
import { getHeaderRow, isExcel } from './utils/index'
import { ElMessage } from 'element-plus'

interface ExcelData {
  header: string[]
  results: Record<string, unknown>[]
}

const props = defineProps<{
  beforeUpload?: (file: File) => boolean
  onSuccess?: (data: any) => void
}>()

/**
 * 点击上传触发
 */
const loading = ref(false)
const excelUploadInput = ref<Ref | null>(null)

const handleUpload = () => {
  excelUploadInput.value?.click()
}
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files ?? []
  // if (!files) return
  const rawFile = files[0] // only use files[0]
  if (!rawFile) return
  upload(rawFile)
}

/**
 * 触发上传事件
 */
const upload = (rawFile: File) => {
  excelUploadInput.value.value = null
  // 如果没有指定上传前回调的话
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果指定了上传前回调，那么只有返回 true 才会执行后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

/**
 * 读取数据（异步）
 */
const readerData = (rawFile: File): Promise<void> => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    // 允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
    const reader = new FileReader()
    // 该事件在读取操作完成时触发
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
    reader.onload = e => {
      // 1. 获取解析到的数据
      const data = e.target?.result
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName]
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet)
      // 6. 解析数据体
      const results: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet)
      // 7. 传入解析之后的数据
      generateData({ header, results })
      // 8. loading 处理
      loading.value = false
      // 9. 异步完成
      resolve()
    }
    // 启动读取指定的 Blob 或 File 内容
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 根据导入内容，生成数据
 */
const generateData = (excelDatas: ExcelData) => {
  props.onSuccess && props.onSuccess(excelDatas)
}

const handleDrop = (e: DragEvent) => {
  // 上传中时，不允许操作
  if (loading.value) return
  const files = e.dataTransfer?.files
  if (files?.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  // 触发上传事件
  upload(rawFile)
}


const handleDragover = (e: DragEvent) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  if (!e.dataTransfer) return
  e.dataTransfer.dropEffect = 'copy'
}


</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;

  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }

  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;

    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
