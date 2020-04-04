<template>
  <div class="recommend-tab">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <div class="list-item-warp" :key="item" v-for="item in list">
        <div class="tag">优选</div>
        <div class="list-item-top">
          <p class="title van-ellipsis">【联报减500】西方音乐史</p>
          <p class="course">课程：8节</p>
          <p class="time">时长：1小时30分钟</p>
          <div class="price"><label>¥</label><span>100</span></div>
        </div>
        <div class="list-item-floor">
          <div>
            <img class="circle" v-lazy="'https://i.loli.net/2020/04/03/WLFcBrZd4MtCjIX.jpg'" />
            <span>方路</span>
          </div>
          <div>
            <img :src="require('@/assets/images/home/play.png')" />
            <span>88888</span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { List } from 'vant'

export default {
  name: 'RecommendTab',
  components: {
    [List.name]: List
  },
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false
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
    }
  }
}
</script>

<style scoped>
  .recommend-tab {
    padding: 10px 15px 50px 15px;
    background-color: #F8F8F8;
    min-height: 100vh;
  }
  .list-item-warp  {
    padding-left: 18px;
    padding-right: 18px;
    background-color: #fff;
    border-radius: 10px 10px 28px 0px;
    box-shadow: 0 2px 4px 0 rgba(234,234,234,0.5);
    margin-bottom: 10px;
    position: relative;
  }
  .list-item-warp .tag {
    width: 38px;
    height: 23px;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    line-height: 23px;
    background-image: url("~@/assets/images/home/list-tag.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    top: 0;
  }
  .list-item-warp p {
    margin: 0;
  }
  .list-item-warp .list-item-top {
    position: relative;
  }
  .list-item-warp .list-item-top > .title {
    width: 280px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    margin-left: -8px;
    padding-top: 10px;
  }
  .list-item-warp .list-item-top > .course {
    color: #333;
    font-size:12px;
    font-weight:400;
    padding-top: 9px;
  }
  .list-item-warp .list-item-top > .time {
    color: #333;
    font-size:12px;
    font-weight:400;
    padding-top: 4px;
  }
  .list-item-warp .list-item-top > .price {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .list-item-warp .list-item-top > .price label {
    font-size: 14px;
    font-weight: 400;
    color: #DB6073;
  }
  .list-item-warp .list-item-top > .price span {
    font-size: 20px;
    font-weight:500;
    color: #DB6073;
  }
  .list-item-warp .list-item-floor {
    margin-top: 12px;
    padding-top: 5px;
    padding-bottom: 10px;
    border-top: 1px #F5F5F5 solid;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list-item-warp .list-item-floor div:first-child {
    display: flex;
    align-items: center;
    padding-left: 5px;
  }
  .list-item-warp .list-item-floor div:first-child > span {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #888;
  }
  .list-item-warp .list-item-floor .circle {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  .list-item-warp .list-item-floor div:last-child {
    margin-right: 1px;
    display: flex;
    align-items: center;
  }
  .list-item-warp .list-item-floor div:last-child img {
    width: 11px;
    height: 11px;
  }
  .list-item-warp .list-item-floor div:last-child span {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    margin-left: 3px;
  }
</style>
