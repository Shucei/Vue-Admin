import HyRequest from '@/utils/request'

enum LoginApi {
  AccountLogin = '/user/login',
  getLoginUser = '/user/getuser'
}

// 定义返回的类型，data不确定，有时候是{} 有时候是数组
interface IDataType<T = any> {
  status: number
  message: string
  data: T
}

interface ILoginResult {
  token: string
  id: string
}

interface IAccount {
  username: string
  password: string
}
/**
 * 登录
 */
export const login = (data: IAccount) => {
  return HyRequest.post<ILoginResult>({
    url: LoginApi.AccountLogin,
    data
  })
}

interface GuserId {
  id: string
}

interface UserInfo {
  label: string[]
  roleIds: any
  _id: string
  username: string
  password: string
  email: string
  sex: string
  phone: string
  profile: string
  code: string
  cover: any
  channeldes: any
  createTime: string
  updataTime: string
  __v: number
}
/**
 * 获取用户信息
 */
export const getUserInfoById = (params?: GuserId) =>
  HyRequest.get<IDataType<UserInfo>>({ url: LoginApi.getLoginUser, params })

/**
 * 获取用户基本信息 --- 用于头像
 * @param id
 * @returns
 */
export const getUserDetailByIdApi = (id: string) =>
  HyRequest.get({ url: `/user/headimg/${id}` })
