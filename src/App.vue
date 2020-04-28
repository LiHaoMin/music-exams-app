<template>
  <div id="app">
    <van-overlay :show="$store.state.isLoading" class="loading">
      <van-loading size="0.8rem" type="spinner" color="#1E4058" vertical />
    </van-overlay>
    <router-view :key="key" />
  </div>
</template>

<script>
import { Overlay, Loading } from 'vant'

export default {
  components: {
    [Overlay.name]: Overlay,
    [Loading.name]: Loading
  },
  computed: {
    key () {
      return this.$route.name ? this.$route.name + new Date().getTime() : this.$route + new Date().getTime()
    }
  }
}
// 禁止手机端扩大和缩小手势
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
}

</script>

<style lang="scss">
html,body {
   margin: 0;
   padding: 0;
 }
#app {
  width: 100%;
  height: 100%;
  font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  z-index: 10;
}
</style>
