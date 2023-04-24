import HyRequest from '@/utils/request'
import { IDataType } from './types'
enum RoleApi {
  AccountRole = '/role',
  getLoginUser = '/user/getuser',
  deleteUser = '/user/deleteUser/'
}

interface ICountRole {
  page: string | number
  pageSize: string | number
}

export const getRoleList = (params: ICountRole) =>
  HyRequest.get<IDataType>({ url: RoleApi.AccountRole, params })

export function addRole(data: any) {
  return HyRequest.post<IDataType>({
    url: '/role',
    data
  })
}
// 删除角色
export function deleteRole(id: number) {
  return HyRequest.post<IDataType>({
    url: `/role/${id}`,
    method: 'delete'
  })
}
// 修改角色
export function updateRole(data: any) {
  return HyRequest.post<IDataType>({
    url: `/role/${data.id}`,
    data,
    method: 'put'
  })
}
// 获取详情
export function getRoleDetail(id: number) {
  return HyRequest.post<IDataType>({
    url: `/role/${id}`
  })
}

// 给角色分配权限
export function assignPerm(data: any) {
  return HyRequest.post<IDataType>({
    url: '/role/assignPrem',
    method: 'put',
    data
  })
}
