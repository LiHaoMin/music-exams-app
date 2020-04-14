<template>
  <div class="offline-course">
    <NavBar />
    <div class="cell-warp">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <ListItemCard @onItemClick="itemClick(item)" :itemData="item" :key="item.id" v-for="item in list" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { List } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import ListItemCard from '@/components/list/ListItemCard'

export default {
  name: 'OfflineCourse',
  components: {
    [List.name]: List,
    NavBar,
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
  methods: {
    // 明细点击
    itemClick (item) {
      this.$router.push('/offline-course/detail/' + item.id)
    },
    onLoad () {
      const data = { num: this.page, size: this.size, typeA: this.$route.params.offlineCourseType }
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
    }
  }
}
</script>

<style scoped>
  .offline-course {
    padding: 10px 15px 50px 15px;
    background-color: #F8F8F8;
    min-height: 100vh;
    position: relative;
  }
  .cell-warp {
    font-size: 14px;
  }
  .cell-warp > .title {
    font-size: 16px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .cell-warp > .title span:first-child {
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
  .cell-warp > .title span:last-child {
    color:#888;
    font-size:12px;
    font-weight:400;
    display: flex;
    align-items: center;
  }
  .cell-warp > .title > img {
    width: 13px;
    height: 14px;
    margin-right: 12px;
  }
</style>
