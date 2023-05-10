const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  devServer: {
    host: "localhost",
    port: "8000",
    https: false,
    proxy: {
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      }
    }

  }
})
