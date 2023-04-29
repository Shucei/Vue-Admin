import HyRequest from '@/utils/request'
import { IDataType } from './types'

enum LoginApi {
  AccountLogin = '/user/login',
  getLoginUser = '/user/getuser',
  getUserDetailById = '/user/getuser',
  setUserassignRolesId = '/user/assignRoles'
}

/**
 * 登录
 */
interface ILoginResult {
  token: string
  id: string
}
interface IAccount {
  username: string
  password: string
}
export const login = (data: IAccount) => {
  return HyRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data
  })
}

/**
 * 获取用户信息
 */
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
export const getUserInfoById = (params?: GuserId) =>
  HyRequest.get<IDataType<UserInfo>>({ url: LoginApi.getLoginUser, params })

/**
 * 给用户分配角色
 * @param data
 * */
export const setUserassignRolesApi = (data: any) =>
  HyRequest.put<IDataType>({
    url: LoginApi.setUserassignRolesId,
    data
  })
