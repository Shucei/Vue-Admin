import path from 'path-browserify'
import { RouteRecordRaw } from 'vue-router'
// 1. 生成菜单
// 2. 过滤路由

/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes: RouteRecordRaw[]) => {
  const result: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = (routes: RouteRecordRaw[]) => {
  const childrenRoutes = getChildrenRoutes(routes)
  console.log(childrenRoutes)

  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path // 子路由存在一级路由，则剔除该一级路由
    }) // 不存在子路由的一级路由,则保留,存在则剔除
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data: any) {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus(routes: RouteRecordRaw[], basePath = '') {
  const result: RouteRecordRaw[] = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children || []))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta?.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (!isNull(item.children)) {
      route.children?.push(...generateMenus(item.children || [], route.path))
    }
  })

  //通过permison实现权限过滤
  // 这种方式的好处是，可以在路由生成时就进行权限过滤，减少了运行时的计算量，提高了性能。而动态添加路由的方式，需要在运行时进行路由的添加和删除，相对来说会更加复杂一些。
  // if (permison) {
  //   const res = result.filter((item) => {
  //     return permison.includes(item.name as string)
  //   })
  //   return res
  // }
  return result
}
