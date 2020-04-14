<template>
  <div class="course-tab">
    <div class="cell-warp">
      <div class="title">
        <span>课程列表</span>
        <img @click="showPicker = true" :src="require('@/assets/images/home/filter.png')" />
      </div>
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
    <van-popup v-model="showPicker" :safe-area-inset-bottom="true" position="bottom" get-container="#app">
      <van-picker
        show-toolbar
        :columns="columns"
        visible-item-count="3"
        confirm-button-text="完成"
        @confirm="listFilter"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { List, Popup, Picker } from 'vant'
import ListItemCard from '@/components/list/ListItemCard'

export default {
  name: 'CourseTab',
  components: {
    [List.name]: List,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    ListItemCard
  },
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      filterValue: 0,
      classificationList: [],
      showPicker: false,
      page: 1,
      size: 10
    }
  },
  created () {
    this.classification()
  },
  computed: {
    columns () {
      const columns = ['全部课程']
      this.classificationList.forEach((item) => {
        columns.push(item.classificationName)
      })
      return columns
    }
  },
  methods: {
    onLoad () {
      const data = { num: this.page, size: this.size }
      if (this.filterValue !== 0) {
        data.typeA = this.classificationList[this.filterValue - 1].id
      }
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
    listFilter (value, index) {
      this.filterValue = index
      this.showPicker = false
      this.page = 1
      this.list = []
      this.onLoad()
    },
    courseItem (item) {
      this.$router.push('/course/detail')
    },
    classification () {
      this.$http.get('/home-page/get_curriculum_classification_list', { isShowLoading: true }).then((res) => {
        this.classificationList = res.data
      })
    }
  }
}
</script>

<style scoped>
  .course-tab {
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
  .van-picker >>> button {
    color: #060606;
  }
</style>
