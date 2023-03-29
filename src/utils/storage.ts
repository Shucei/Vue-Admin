class LocalCache {
  static LocalStrong = new LocalCache()
  /**
   * 存储数据
   */
  setItem = (key: string, value: any) => {
    // 将数组、对象类型的数据转化为 JSON 字符串进行存储
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
  }

  /**
   * 获取数据
   */
  getItem = (key: string) => {
    const data = window.localStorage.getItem(key)
    try {
      if (data) {
        return JSON.parse(data)
      }
    } catch (err) {
      return data
    }
  }

  /**
   * 删除数据
   */
  removeItem = (key: string) => {
    window.localStorage.removeItem(key)
  }

  /**
   * 删除所有数据
   */
  removeAllItem = (key: string) => {
    window.localStorage.clear()
  }
}

export default LocalCache.LocalStrong
