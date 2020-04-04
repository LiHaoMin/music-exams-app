<template>
  <div class="recommend-tab">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <ListItemCell :key="index" v-for="(item, index) in list" />
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
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        if (this.list.length === 20) {
          this.error = true
          return
        }

        // 数据全部加载完成
        if (this.list.length >= 30) {
          this.finished = true
        }
      }, 1000)
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
