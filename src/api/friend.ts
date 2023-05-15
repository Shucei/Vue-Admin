import HyRequest from '@/utils/request'
import { IDataType } from './types'
enum FriendApi {
  Addfriend = '/friend/add', //添加好友
  findFriends = '/friend', //好友列表
  Refuse = '/friend/status', // 同意或拒绝
  deleteFriend = '/friend/delete/', //删除
  // UpdateRemarks = '/friend/update' //修改好友备注
  sendmsg = '/friend/send',
  msglist = '/friend/message'
}

/**
 * 添加好友
 * @returns
 */
interface addResult {
  userID: string
  friendID: string
  message: string
}
export const addFriend = (data: addResult) =>
  HyRequest.post<IDataType>({ url: FriendApi.Addfriend, data })

/**
 * 获取好友列表
 * @param data
 * @returns
 */
interface friendList {
  userID: string
}
export const getFriendListApi = (params: friendList) =>
  HyRequest.get<IDataType>({ url: FriendApi.findFriends, params })

/**
 * 同意或拒绝添加请求
 * @param data
 * @returns
 */
interface Refuse {
  id: string
  status: string
}
export const changeRefuse = (data: Refuse) =>
  HyRequest.post<IDataType>({ url: FriendApi.Refuse, data })

/**
 * 删除好友
 * @param id
 * @returns
 */
export const deleteFriend = (id: string) =>
  HyRequest.delete<IDataType>({ url: FriendApi.deleteFriend + id })

/**
 * 发送消息
 * @param data
 * @returns
 */
interface Message {
  sender_id: string
  receiver_id: string
  content: any
  types: string
}
export const sendMessageApi = (data: Message) =>
  HyRequest.post<IDataType>({ url: FriendApi.sendmsg, data })

// userID, friendID, page, limit
interface msglist {
  sender_id: string
  receiver_id: string
  page: string
  limit: string
}
export const getMessage = (data: msglist) =>
  HyRequest.post<IDataType>({ url: FriendApi.msglist, data })
