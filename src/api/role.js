import request from '@/utils/request'

export const getRoleList = (params) => request.get('/sys/role', { params })

export function addRole (data) {
  return request({
    url: '/role',
    data,
    method: 'post'
  })
}
export function deleteRole (id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
// 修改角色
export function updateRole (data) {
  return request({
    url: `/role/${data.id}`,
    data,
    method: 'put'
  })
}
// 获取详情
export function getRoleDetail (id) {
  return request({
    url: `/role/${id}`
  })
}
// 给角色分配权限
export function assignPerm (data) {
  return request({
    url: '/role/assignPrem',
    method: 'put',
    data
  })
}
