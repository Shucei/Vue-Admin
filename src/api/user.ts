import HyRequest from '@/utils/request'
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// hyRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: true
//   })
//   .then((res) => {
//     console.log(res)
//   })

interface IAccount {
  username: string
  password: string
}

/**
 * 登录
 */
export const login = (data: IAccount) => {
  return HyRequest.post({
    url: '/user/login',
    data
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => HyRequest.post({ url: '/user/profile' })

// 获取用户基本信息 --- 用于头像
export const getUserDetailByIdApi = (id: string) =>
  HyRequest.get({ url: `/sys/user/${id}` })
