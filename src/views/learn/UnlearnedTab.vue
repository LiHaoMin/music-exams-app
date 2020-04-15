<template>
  <div class="unlearned-tab">
    <div class="list-warp" v-if="list.length > 0">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <ListItemCard :isPageType="2" :itemData="item" :key="item.id" v-for="item in list" @onItemClick="courseItem(item)" />
      </van-list>
    </div>
    <div class="list-empty" v-else>
      <img :src="require('@/assets/images/learn/empty.png')" />
      <p>这里空空如也～</p>
    </div>
  </div>
</template>

<script>
import { List } from 'vant'
import ListItemCard from '@/components/list/ListItemCard'

// TODO 学习时长/推荐
export default {
  name: 'UnlearnedTab',
  components: {
    [List.name]: List,
    ListItemCard
  },
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      page: 1,
      size: 10
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      this.$http.get('/home-page/get_my_studied_list', { isShowLoading: true, params: { num: this.page, size: this.size, judge: false } }).then((res) => {
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
