<template>
  <div id="app">
    <van-overlay :show="$store.state.isLoading" class="loading">
      <van-loading size="0.8rem" type="spinner" color="#1E4058" vertical />
    </van-overlay>
    <router-view/>
  </div>
</template>

<script>
import { Overlay, Loading } from 'vant'

export default {
  components: {
    [Overlay.name]: Overlay,
    [Loading.name]: Loading
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
html,body,#app {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  z-index: 10;
}
</style>
