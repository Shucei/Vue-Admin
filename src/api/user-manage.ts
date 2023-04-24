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

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data: any) {
  return HyRequest.post({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/** *
 *  封装一个导入员工的接口
 *
 * ***/
export function importEmployee(data: any) {
  return HyRequest.get({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data: any) {
  return HyRequest.post({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id: number) {
  return HyRequest.get({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data: any) {
  return HyRequest.put({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id: number) {
  return HyRequest.get({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data: any) {
  return HyRequest.post({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
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
