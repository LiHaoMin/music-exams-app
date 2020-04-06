<template>
  <div class="nav-bar">
    <van-nav-bar
      :title="$route.params.title || $route.meta.title"
      fixed
      placeholder
      @click-left="$router.back()">
      <van-icon slot="left" name="arrow-left"  color="#060606" size="0.42667rem" />
    </van-nav-bar>
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant'

export default {
  name: 'NavBar',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  }
}
</script>
<style>
  .nav-bar {
    position: relative;
    z-index: 99;
  }
</style>
