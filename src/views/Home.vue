<template>
  <div class="home">
    <div>123</div>
  </div>
</template>

<script>
import { getTopicsHotList } from '@/http/api'

export default {
  name: 'Home',
  components: {
  },
  created () {
    getTopicsHotList().then(rsp => {
      console.log(rsp)
    })
  }
}
</script>
