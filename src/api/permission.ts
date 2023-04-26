import HyRequest from '@/utils/request'
import { IDataType } from './types'
enum PermissionApi {
  AccountPermission = '/role/permission',
  addPermission = '/role/permission',
  removePermission = '/role/permission/',
  updatePermission = '/role/uppermission/'
}

/**
 * 获取权限列表
 * @returns
 */
export const getPermissionList = () =>
  HyRequest.post<IDataType>({ url: PermissionApi.AccountPermission })

/**
 * 添加权限
 * @param params
 * @returns
 */
interface IAddPermission {
  name: string
  code: string
  description: string
  pid: string
}
export const addPermission = (data: IAddPermission) =>
  HyRequest.put<IDataType>({ url: PermissionApi.addPermission, data })

/**
 * 删除权限
 * @param id
 * @returns
 */

export const removePermission = (id: string) =>
  HyRequest.delete<IDataType>({ url: PermissionApi.removePermission + id })

/**
 * 更新权限
 * @param id
 * @param data
 */
export const updatePermission = (id: string, data: any) =>
  HyRequest.put<IDataType>({
    url: PermissionApi.updatePermission + id,
    data
  })
