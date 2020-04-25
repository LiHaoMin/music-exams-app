<template>
  <div class="home">
    <van-search @click="search" shape="round" readonly placeholder="搜索" />
    <van-tabs v-model="currentIdx"
              animated
              color="#1E4058"
              line-width="0.42667rem"
              line-height="0.05333rem"
              title-inactive-color="#333"
              title-active-color="#1E4058">
      <van-tab title-style="font-size: 0.42667rem;font-weight:500;" title="发现课程">
        <FindTab v-on:tabSelected="tabSelected" />
      </van-tab>
      <van-tab title-style="font-size: 0.42667rem;font-weight:500;" title="推荐课程">
        <RecommendTab />
      </van-tab>
      <van-tab title-style="font-size: 0.42667rem;font-weight:500;" title="课程列表">
        <CourseTab />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Search, Tab, Tabs } from 'vant'
import FindTab from '@/views/home/FindTab'
import RecommendTab from '@/views/home/RecommendTab'
import CourseTab from '@/views/home/CourseTab'
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    FindTab,
    RecommendTab,
    CourseTab
  },
  data () {
    return {
      currentIdx: 0
    }
  },
  created () {
    this.requestUserInfo()
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    // tab 选择
    tabSelected (idx) {
      this.currentIdx = idx
    },
    // 搜索
    search () {
      this.$router.push('/search')
    },
    requestUserInfo () {
      this.$http.get('/user-info/user_content', { isShowLoading: true }).then((res) => {
        this.user = res.data
        this.setUserInfo({
          userId: res.data.mUserInfo.id,
          headPortrait: res.data.mUserInfo.headPortrait,
          name: res.data.mUserInfo.name,
          account: res.data.mUserInfo.account,
          telephone: res.data.mUserInfo.telephone,
          userType: res.data.mUserInfo.userType,
          openId: res.data.mUserInfo.openId
        })
      })
    }
  }
}
</script>
