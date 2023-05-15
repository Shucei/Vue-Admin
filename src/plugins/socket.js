// websocket.js
class WebSocketClient {
  constructor(url) {
    this.url = url; // WebSocket 服务器地址
    this.reconnectInterval = 10000; // 重连间隔时间
    this.timeoutInterval = 5000; // 心跳超时时间
    this.tryingToReconnect = false; // 是否正在重连
    this.isHeartbeatTimeout = false; // 是否心跳超时
    this.connect(); // 连接 WebSocket 服务器
  }

  connect () {
    console.log('WebSocket connecting...');
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      console.log('WebSocket opened!');
      this.tryingToReconnect = false;
      this.startHeartbeat();
    };
    this.ws.onmessage = event => {
      console.log('WebSocket message received:', event.data);
      // 处理消息
    };
    this.ws.onclose = () => {
      console.log('WebSocket closed!');
      if (!this.tryingToReconnect) {
        setTimeout(() => {
          this.connect();
        }, this.reconnectInterval);
        this.tryingToReconnect = true;
      }
    };
    this.ws.onerror = error => {
      console.error('WebSocket error:', error);
      this.ws.close();
    };
  }

  // 发送心跳
  startHeartbeat () {
    console.log('WebSocket heartbeat started!');
    this.heartbeatTimer = setInterval(() => {
      console.log('WebSocket heartbeat sending...');
      this.isHeartbeatTimeout = true;
      this.ws.send(JSON.stringify({ type: 'heartbeat' }));
      setTimeout(() => {
        if (this.isHeartbeatTimeout) {
          console.error('WebSocket heartbeat timeout!');
          this.ws.close();
        } else {
          this.isHeartbeatTimeout = false;
        }
      }, this.timeoutInterval);
    }, this.timeoutInterval);
  }

  // 停止心跳
  stopHeartbeat () {
    console.log('WebSocket heartbeat stopped!');
    clearInterval(this.heartbeatTimer);
  }

  // 发送消息
  send (data) {
    console.log('WebSocket sending:', data);
    this.ws.send(JSON.stringify(data));
  }

  // 关闭连接
  close () {
    console.log('WebSocket closing...');
    this.ws.close();
  }
}

export default WebSocketClient;


