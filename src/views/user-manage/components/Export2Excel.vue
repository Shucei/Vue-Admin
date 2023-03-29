<template>
  <el-dialog :title="$t('msg.excel.title')" :model-value="modelValue" @close="closed" width="30%">
    <el-input v-model="excelName" :placeholder="$t('msg.excel.placeholder')"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>

import { getEmployeeList } from '@/api/user-manage';
import { watchSwitchLang } from '@/utils/i18n';
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n';
import EmployeeEnum from '@/utils/employees'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  page: {
    type: Object,
    default: () => { }
  }
})
const i18n = useI18n()
const emits = defineEmits(['update:modelValue'])
/**
 * 国际化处理
 */
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // const allUser = await getEmployeeSimple()
  // console.log(allUser);
  // 导出
  exportData()
  closed()
}

/**
 * 导出细节
 */
const exportData = async () => {
  const headers = {
    '手机号': 'mobile',
    '姓名': 'username',
    '入职日期': 'timeOfEntry',
    '聘用形式': 'formOfEmployment',
    '转正日期': 'correctionTime',
    '工号': 'workNumber',
    '部门': 'departmentName'
  }
  const data = []
  const { rows } = await getEmployeeList({
    page: 1,
    size: props.page.total
  })
  console.log(rows);
  // 也可以用两个map，就不需要a作为接受了，可以在a=处直接return，forEach改为map
  let a
  rows.forEach(item => {
    a = Object.keys(headers).map(key => {
      // 对时间进行处理
      if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {

        if (!item[headers[key]]) {
          return
        }
        // return this.formatDate(item[headers[key]])
        return item[headers[key]].split('T')[0]
      } else if (headers[key] === 'formOfEmployment') {
        // 对聘用形式进行处理
        const obj = EmployeeEnum.hireType.find(obj => parseInt(obj.id) === parseInt(item[headers[key]]))
        return obj ? obj.value : '未知'
      }
      return item[headers[key]]
    })
    console.log(a);
    data.push(a)
  })

  import('@/utils/Export2Excel').then(excel => {
    excel.export_json_to_excel({
      header: Object.keys(headers),
      data: data,
      filename: '员工资料表',
      // autoWidth: true // 单元格是否要自适应
      bookType: 'xlsx' // 导出文件类型
    })
  })
}


/**
 * 关闭
 */
const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}

</script>
