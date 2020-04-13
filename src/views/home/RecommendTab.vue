<template>
  <div class="recommend-tab">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <ListItemCell @onItemClick="recommendItem(item)" :itemData="item" :key="item.id" v-for="item in list" />
    </van-list>
  </div>
</template>

<script>
import { List } from 'vant'
import ListItemCell from '@/components/list/ListItemCell'

export default {
  name: 'RecommendTab',
  components: {
    [List.name]: List,
    ListItemCell
  },
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      page: 1,
      size: 1
    }
  },
  methods: {
    onLoad () {
      this.$http.get('/home-page/recommend_curriculum_list', { isShowLoading: true, params: { num: this.page, size: this.size } }).then((res) => {
        this.loading = false
        if (res.code !== 200) {
          this.error = true
          return
        }
        if (this.page === 1) {
          this.list = res.data.records
        } else {
          this.list = this.list.concat(res.data.records)
        }
        if (this.page === res.data.pages) {
          this.finished = true
        }
        this.page += 1
      })
    },
    recommendItem (item) {
      this.$router.push('/course/detail')
    }
  }
}
</script>

<style scoped>
  .recommend-tab {
    padding: 10px 15px 50px 15px;
    background-color: #F8F8F8;
    min-height: 100vh;
  }
</style>
