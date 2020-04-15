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
      <div class="hot-warp" v-if="!isSearched && hotTags.length > 0">
        <span>历史搜索</span>
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
        <ListItemCard @onItemClick="courseItem(item)" :key="item.id" :itemData="item" v-for="item in list" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { Search, List } from 'vant'
import ListItemCard from '@/components/list/ListItemCard'
import { getLocalStore, setLocalStore } from '@/utils/global'

export default {
  name: 'Search',
  components: {
    [Search.name]: Search,
    [List.name]: List,
    ListItemCard
  },
  data () {
    return {
      value: '',
      hotTags: JSON.parse(getLocalStore('history_tags') || '[]'),
      list: [],
      loading: false,
      error: false,
      finished: false,
      isSearched: false,
      page: 1,
      size: 10
    }
  },
  methods: {
    // 搜索
    search () {
      this.isSearched = true
      this.list = []
      this.page = 1

      if (this.hotTags.indexOf(this.value) === -1) {
        this.hotTags.push(this.value)
        setLocalStore('history_tags', this.hotTags)
      }

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
      const data = { num: this.page, size: this.size, search: this.value }
      this.$http.post('/home-page/get_curriculum_list', data, { isShowLoading: true }).then((res) => {
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
        if (this.page === res.data.pages || res.data.records.length === 0) {
          this.finished = true
        }
        this.page += 1
      })
    },
    courseItem (item) {
      this.$router.push('/course/detail/' + item.id)
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
