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
        <ListItemCard :key="index" v-for="(item, index) in list" />
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
      columns: ['全部课程', '中西音乐史', '复调', '和声曲式'],
      showPicker: false
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
    },
    showFilterPicker () {
      alert(1)
    },
    listFilter (value, index) {
      this.filterValue = index
      this.showPicker = false
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
</style>
