import HyRequest from '@/utils/request'
import { IDataType } from './types'
enum UserApi {
  AccountLogin = '/user/lists',
  getLoginUser = '/user/getuser',
  deleteUser = '/user/deleteUser/'
}

interface IAccount {
  page: string | number
  pageSize: string | number
}

// 获取用户列表
export const getUserList = (params: IAccount) =>
  HyRequest.get<IDataType>({ url: UserApi.AccountLogin, params })

// 删除用户
export function delEmployee(id: number) {
  return HyRequest.post<IDataType>({
    url: UserApi.deleteUser,
    data: { id }
  })
}

/** *
 * 给用户分配角色
 * ***/
export function assignRoles(data: any) {
  return HyRequest.post({
    url: '/sys/user/assignRoles',
    data,
    method: 'put'
  })
}
