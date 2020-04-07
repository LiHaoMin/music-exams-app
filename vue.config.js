module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://www.v2ex.com',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
