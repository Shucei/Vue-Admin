import request from '@/utils/request'

/**
 * 登录
 */
export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => request.post('/sys/profile')

// 获取用户基本信息 --- 用于头像
export const getUserDetailByIdApi = (id) => request.get(`/sys/user/${id}`)
