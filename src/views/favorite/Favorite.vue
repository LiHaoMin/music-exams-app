<template>
  <div class="favorite">
    <form action="/">
      <van-search
        v-model="value"
        placeholder="收藏课程搜索"
        shape="round"
        @search="search">
      </van-search>
    </form>
    <div class="list-warp" v-if="list.length > 0">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <ListItemCard :isPageType="1" :itemData="item" @onRateClick="onRateClick" :key="item.id" v-for="item in list" @onItemClick="courseItem(item)" />
      </van-list>
    </div>
    <div class="list-empty" v-else>
      <img :src="require('@/assets/images/favorite/empty.png')" />
      <p>您还没有收藏课程哦～</p>
    </div>
  </div>
</template>

<script>
import { Search, List, Dialog } from 'vant'
import ListItemCard from '@/components/list/ListItemCard'

export default {
  name: 'Favorite',
  components: {
    [Search.name]: Search,
    [List.name]: List,
    ListItemCard
  },
  data () {
    return {
      value: null,
      list: [],
      loading: false,
      error: false,
      finished: false,
      isSearched: false,
      page: 1,
      size: 10
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    // 搜索
    search () {
      this.isSearched = true
      this.list = []
      // 清空列表数据
      this.finished = false

      // TODO 搜索
      this.page = 1

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    // 取消收藏
    onRateClick () {
      Dialog.confirm({
        message: '取消收藏后，课程被移除，\n确定取消收藏吗？'
      }).then(() => {
        // TODO 取消收藏
      }).catch(() => {
        // on cancel
      })
    },
    onLoad () {
      this.$http.post('/home-page/get_collection_list', { num: this.page, size: this.size, search: this.value }, { isShowLoading: true }).then((res) => {
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
  .favorite {
    height: 100vh;
    background-color: #F8F8F8;
  }

  .list-warp {
    padding: 10px 15px 50px 15px;
  }

  .list-empty {
    width: 100%;
    height: 80%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .list-empty p {
    font-size: 14px;
    font-weight: 400;
    color: #888;
    line-height: 20px;
  }
</style>
