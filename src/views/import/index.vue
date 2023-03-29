<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { importEmployee } from '@/api/user-manage'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const router = useRouter()
const i18n = useI18n()
/**
 * 数据解析成功之后的回调
 */
const onSuccess = ({ header, results }) => {
  UserRelattons(header, results)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}
// 将数据转换为服务端能接受的数据
const UserRelattons = async (header, results) => {
  const userRelations = {
    入职日期: 'timeOfEntry',
    手机号: 'mobile',
    姓名: 'username',
    转正日期: 'correctionTime',
    工号: 'workNumber'
  }
  const arr = []
  // 遍历所有的数组
  results.forEach((item) => {
    // 需要将每一个条数据里面的中文都换成英文
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      // key是当前的中文名 找到对应的英文名
      if (
        userRelations[key] === 'timeOfEntry' ||
        userRelations[key] === 'correctionTime'
      ) {
        userInfo[userRelations[key]] = new Date(formatDate(item[key], '/')) // 只有这样, 才能入库
        return
      }
      userInfo[userRelations[key]] = item[key]
    })
    // 最终userInfo替换为英文
    arr.push(userInfo)
  })
  await importEmployee(arr)
}

const formatDate = (numb, format) => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  if (format && format.length === 1) {
    return year + format + month + format + date
  }
  return (
    year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
  )
}
</script>
