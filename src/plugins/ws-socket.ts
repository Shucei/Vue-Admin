// WebSocket服务类，将连接、心跳、重连、发送消息等功能封装了起来。这个类实现了单例模式，意味着在整个应用程序中只会存在一个该类的实例，通过getInstance()方法获取。当使用connect()方法连接到WebSocket服务器时，该类会自动管理心跳，采用PING/PONG机制保证与服务器间的连接畅通。当连接断开或遇到错误时，该类会自动重连，直到连接成功。该类提供了addEventListener()和removeEventListener()方法，以便用户可以添加/移除事件监听器，并在需要的时候处理事件。
class WebSocketService {
  private static instance: WebSocketService | null = null
  private socket: WebSocket | null = null // WebSocket实例
  private listeners: { [key: string]: any[] } = {} // 事件监听器
  private pingInterval = 30000 // 心跳间隔
  private pingTimer: null | NodeJS.Timer = null // 心跳定时器
  private reconnectBaseInterval = 5000 // 初始重连间隔
  private reconnectMaxInterval = 60000 // 最大重连间隔
  private reconnectCurrentInterval = this.reconnectBaseInterval // 当前重连间隔
  private reconnectTimer: NodeJS.Timeout | null = null // 重连定时器

  constructor(private readonly url: string) {
    if (!url.startsWith('ws://') && !url.startsWith('wss://')) {
      throw new Error('WebSocket地址协议必须是ws或者wss')
    }
  }

  public static getInstance(url: string): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(url)
    }
    return WebSocketService.instance
  }

  // 连接到WebSocket服务器
  public connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return
    } // 如果WebSocket已连接，直接返回
    this.socket = new WebSocket(this.url) // 连接到WebSocket服务器
    // WebSocket连接成功
    this.socket.onopen = () => {
      console.log('WebSocket连接已建立')
      this.startPing() // 开始心跳
      this.emit('open') // 触发open事件
      this.reconnectCurrentInterval = this.reconnectBaseInterval // 重置重连间隔
      clearTimeout(this.reconnectTimer!) // 清除重连定时器
      this.reconnectTimer = null // 重置重连定时器
    }

    // 接收到WebSocket消息
    this.socket.onmessage = (event) => {
      if (event.data === 'PONG' || event.data === 'PING') {
        console.log('WebSocket接收到PONG消息')
        return
      }
      this.emit('message', event) // 触发message事件
    }

    // WebSocket连接关闭
    this.socket.onclose = () => {
      console.log('WebSocket连接已关闭')
      this.stopPing() // 停止心跳
      this.emit('close') // 触发close事件
      // 如果WebSocket没有正常关闭，尝试重连
      if (!this.reconnectTimer) {
        this.reconnectTimer = setTimeout(() => {
          console.log('WebSocket重新连接中...')
          this.connect() // 重连
        }, this.reconnectCurrentInterval)
        // 重连间隔递增
        this.reconnectCurrentInterval = Math.min(
          this.reconnectCurrentInterval * 2,
          this.reconnectMaxInterval
        )
      }
    }

    // WebSocket连接错误
    this.socket.onerror = (error) => {
      console.error('WebSocket连接错误:', error)
      this.emit('error', error)
      this.reconnect()
    }
  }

  // 关闭WebSocket连接
  public close(): void {
    if (this.socket) {
      this.socket.close()
    }
  }

  public send(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message))
    } else {
      console.error('WebSocket连接未建立或已关闭')
    }
  }

  // 添加事件监听器
  public addEventListener(type: string, listener: any): void {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    this.listeners[type].push(listener)
  }

  // 移除事件监听器
  public removeEventListener(type: string, listener: any): void {
    if (this.listeners[type]) {
      const index = this.listeners[type].indexOf(listener)
      if (index !== -1) {
        this.listeners[type].splice(index, 1)
      }
    }
  }

  // 开始心跳
  private startPing(): void {
    this.pingTimer = setInterval(() => {
      console.log('WebSocket发送PING消息')
      this.send('PING')
    }, this.pingInterval)
  }

  // 停止心跳
  private stopPing(): void {
    clearInterval(this.pingTimer!)
    this.pingTimer = null
  }

  // 重连
  private reconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    this.reconnectTimer = setTimeout(() => {
      console.log('WebSocket重新连接中...')
      this.connect()
    }, this.reconnectCurrentInterval)
    this.reconnectCurrentInterval = Math.min(
      this.reconnectCurrentInterval * 2,
      this.reconnectMaxInterval
    )
  }

  // 触发事件
  private emit(type: string, ...args: any[]): void {
    if (this.listeners[type]) {
      this.listeners[type].forEach((listener) => {
        listener(...args)
      })
    }
  }
}

export default WebSocketService
