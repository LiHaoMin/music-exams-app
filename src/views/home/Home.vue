<template>
  <div class="home">
    <van-search shape="round" readonly placeholder="搜索" />
    <van-tabs v-model="currentIdx"
              animated
              color="#1E4058"
              line-height="2"
              title-inactive-color="#333"
              title-active-color="#1E4058">
      <van-tab title-style="font-size: 16px;font-weight:500;" title="发现课程">
        <FindTab />
      </van-tab>
      <van-tab title-style="font-size: 16px;font-weight:500;" title="推荐课程">推荐课程</van-tab>
      <van-tab title-style="font-size: 16px;font-weight:500;" title="课程列表">课程列表</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Search, Tab, Tabs } from 'vant'
import FindTab from '@/views/home/FindTab'

export default {
  name: 'Home',
  components: {
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    FindTab
  },
  data () {
    return {
      currentIdx: 0
    }
  }
}
</script>
