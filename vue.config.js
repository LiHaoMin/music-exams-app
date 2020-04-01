module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.v2ex.com',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
