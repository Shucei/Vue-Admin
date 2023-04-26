import HyRequest from '@/utils/request'
import { IDataType } from './types'
enum RoleApi {
  AccountRole = '/role',
  deleteRole = '/role/delete/',
  addRole = '/role/add',
  assignPrem = '/role/assignPrem'
}

/**
 * 获取角色列表
 */
interface ICountRole {
  page: string | number
  pageSize: string | number
}
export const getRoleList = (params: ICountRole) =>
  HyRequest.get<IDataType>({ url: RoleApi.AccountRole, params })

/**
 * 新增角色
 * @param data
 * @returns
 */
interface IAddRole {
  name: string
  description: string
}
export function addRole(data: IAddRole) {
  return HyRequest.post<IDataType>({
    url: RoleApi.addRole,
    data
  })
}

// 删除角色
export function deleteRole(id: string) {
  return HyRequest.delete<IDataType>({
    url: RoleApi.deleteRole + id
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
export function assignPermission(data: any) {
  return HyRequest.post<IDataType>({
    url: RoleApi.assignPrem,
    data
  })
}
