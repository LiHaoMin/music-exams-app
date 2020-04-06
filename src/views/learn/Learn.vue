<template>
  <div class="learn">
    <van-tabs v-model="currentIdx"
              animated
              sticky
              color="#1E4058"
              line-height="2"
              title-inactive-color="#333"
              title-active-color="#1E4058">
      <van-tab title-style="font-size: 0.42667rem;font-weight:500;" title="未学完">
        <UnlearnedTab />
      </van-tab>
      <van-tab title-style="font-size: 0.42667rem;font-weight:500;" title="已学完">
        <LearnedTab />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import UnlearnedTab from '@/views/learn/UnlearnedTab'
import LearnedTab from '@/views/learn/LearnedTab'

export default {
  name: 'Learn',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    UnlearnedTab,
    LearnedTab
  },
  data () {
    return {
      currentIdx: 0
    }
  }
}
</script>
