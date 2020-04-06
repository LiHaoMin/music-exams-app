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
    <div class="list-warp" v-if="!isEmpty">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <ListItemCard :isPageType="1" @onRateClick="onRateClick" :key="index" v-for="(item, index) in list" @onItemClick="$router.push('/course/detail')" />
      </van-list>
    </div>
    <div class="list-empty" v-if="isEmpty">
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
      value: '',
      isEmpty: true,
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
    // 取消收藏
    onRateClick () {
      Dialog.confirm({
        message: '取消收藏后，课程被移除，\n确定取消收藏吗？'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      })
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
        this.isEmpty = false

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
