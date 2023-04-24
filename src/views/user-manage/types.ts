
export interface List {
  _id: number
  username: string
  mobile: string
  profile: string
  role: Array<{ id: number; title: string }>
  createTime: string
}



