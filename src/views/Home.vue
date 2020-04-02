<template>
  <div class="home">
    <van-search
      show-action
      placeholder="请输入搜索关键词"
    />
  </div>
</template>

<script>
import { Search } from 'vant'

export default {
  name: 'Home',
  components: {
    [Search.name]: Search
  }
}
</script>
