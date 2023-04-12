import i18n from '@/i18n'
export const validatePassword = () => {
  return (rule: any, value: any, callback: any) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}

export const validateUserName = () => {
  return (rule: any, value: any, callback: any) => {
    if (value === '' || value.length < 3) {
      callback(new Error(i18n.global.t('msg.login.usernameRule')))
    } else if (
      !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/.test(value) &&
      value.length < 3
    ) {
      callback(new Error('请输入邮箱或者用户名'))
    } else {
      callback()
    }
  }
}
