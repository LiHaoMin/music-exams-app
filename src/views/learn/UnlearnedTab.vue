<template>
  <div class="unlearned-tab">
    <div class="list-warp" v-if="!isEmpty">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <ListItemCard :isPageType="2" @onRateClick="onRateClick" :key="index" v-for="(item, index) in list" @onItemClick="$router.push('/course/detail')" />
      </van-list>
    </div>
    <div class="list-empty" v-if="isEmpty">
      <img :src="require('@/assets/images/learn/empty.png')" />
      <p>这里空空如也～</p>
    </div>
  </div>
</template>

<script>
import { List } from 'vant'
import ListItemCard from '@/components/list/ListItemCard'

export default {
  name: 'UnlearnedTab',
  components: {
    [List.name]: List,
    ListItemCard
  },
  data () {
    return {
      isEmpty: true,
      list: [],
      loading: false,
      error: false,
      finished: false,
      isSearched: false
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
  .unlearned-tab {
    min-height: 100vh;
    background-color: #F8F8F8;
  }

  .list-warp {
    padding: 10px 15px 50px 15px;
  }

  .list-empty {
    width: 100%;
    height: 80vh;
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
