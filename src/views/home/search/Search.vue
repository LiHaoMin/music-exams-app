<template>
  <div class="search">
    <div class="header">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="搜索"
          show-action
          shape="round"
          @search="search"
          @cancel="$router.back()">
        </van-search>
      </form>
      <div class="hot-warp" v-if="!isSearched">
        <span>热门搜索</span>
        <div class="tags">
          <div class="tag" @click="tag(item)" :key="index" v-for="(item,index) in hotTags">{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="search-result" v-if="isSearched">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <template v-for="(item, index) in list">
          <ListItemCell  @onItemClick="$router.push('/course/detail')" :key="index" v-if="index % 2 === 0" />
          <ListItemCard @onItemClick="$router.push('/course/detail')" :key="index" v-else />
        </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Search, List } from 'vant'
import ListItemCell from '@/components/list/ListItemCell'
import ListItemCard from '@/components/list/ListItemCard'

export default {
  name: 'Search',
  components: {
    [Search.name]: Search,
    [List.name]: List,
    ListItemCell,
    ListItemCard
  },
  data () {
    return {
      value: '',
      hotTags: ['考研', '中西音乐史', '舞蹈'],
      list: [],
      loading: false,
      error: false,
      finished: false,
      isSearched: false
    }
  },
  methods: {
    // 搜索
    search () {
      this.isSearched = true
      this.list = []
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    // 标签
    tag (value) {
      this.value = value
      this.search()
    },
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
  .search {
    background-color: #F8F8F8;
    height: 100%;
  }
  .header {
    padding-left: 15px;
    padding-right: 15px;
    background-color: #FFF;
  }
  .hot-warp {
    padding-left: 10px;
  }
  .hot-warp span {
    font-size: 14px;
    font-weight: 400;
    color: #333;
  }
  .hot-warp .tags {
    padding-bottom: 10px;
  }
  .hot-warp .tag {
    font-size: 12px;
    font-weight: 400;
    color: #C2C1C1;
    border-radius:11px;
    border:1px solid #EDEDED;
    display: inline-block;
    padding: 2px 11px;
    margin-right: 10px;
  }

  .search-result {
    padding: 10px 15px;
  }
</style>
