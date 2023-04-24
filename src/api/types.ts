// 定义返回的类型，data不确定，有时候是{} 有时候是数组
export interface IDataType<T = any> {
  status: number
  message: string
  data: T
  total?: number
}
