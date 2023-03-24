const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// const dotenv = require('dotenv')
// console.log('当前在什么环境运行项目:', process.env.NODE_ENV)
// // 拼接当前环境文件名
// const envFileName = '.env'
// const curEnvFileName = `${envFileName}.${process.env.NODE_ENV}`
// // fs.readFileSync：读取环境文件key-value数据到缓存对象，
// // dotenv.parse 读取缓存对象到envConf对象中。
// const envData = fs.readFileSync(curEnvFileName)
// const envMap = dotenv.parse(envData)
// console.log(envMap);
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('views', '@/views')
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
  }
})
