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
        <div class="cell-item-warp" :key="item" v-for="item in list">
          <div class="thumb">
            <img v-lazy="'https://i.loli.net/2020/04/03/WLFcBrZd4MtCjIX.jpg'" />
          </div>
          <div class="content">
            <p class="title">23天高能专业培训</p>
            <p class="description">帮你吃透专业，轻松上岸</p>
            <p class="teacher">讲师：李丽</p>
            <div class="play">
              <img :src="require('@/assets/images/home/play.png')" />
              <span>88888</span>
            </div>
            <div class="price"><label>¥</label><span>100</span></div>
          </div>
        </div>
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

export default {
  name: 'CourseTab',
  components: {
    [List.name]: List,
    [Popup.name]: Popup,
    [Picker.name]: Picker
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
  .cell-item-warp {
    height: 126px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(234,234,234,0.5);
    border-radius:10px;
    padding: 8px 8px 0 8px;
    margin-bottom: 10px;
    display: flex;
  }
  .cell-item-warp .thumb {
    width: 110px;
    height: 110px;
  }
  .cell-item-warp .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .cell-item-warp .content {
    margin-left: 21px;
    flex: 1;
    position: relative;
  }
  .cell-item-warp .content p {
    margin: 0;
  }
  .cell-item-warp .content .title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-top: 10px;
  }
  .cell-item-warp .content .description {
    font-size: 12px;
    font-weight: 400;
    color: #333;
    margin-top: 6px;
  }
  .cell-item-warp .content .teacher {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    margin-top: 17px;
  }
  .cell-item-warp .content .play {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
  .cell-item-warp .content .play img {
    width: 11px;
    height: 11px;
  }
  .cell-item-warp .content .play span {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    margin-left: 3px;
  }
  .cell-item-warp .content .price {
    position: absolute;
    top: 85px;
    right: 10px;
  }
  .cell-item-warp .content .price label {
    font-size: 14px;
    font-weight: 400;
    color: #DB6073;
  }
  .cell-item-warp .content .price span {
    font-size: 20px;
    font-weight:500;
    color: #DB6073;
  }

  .van-picker >>> button {
    color: #060606;
  }
</style>
