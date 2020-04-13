module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/musicapp': {
        target: 'http://47.114.153.190:8282',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
