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
      <div class="hot-warp">
        <span>热门搜索</span>
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
        <template v-for="(item, index) in list">
          <div class="list-item-warp" :key="index" v-if="index % 2 === 0">
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
          <div class="cell-item-warp" :key="index" v-else>
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
        </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Search, Tag, List } from 'vant'

export default {
  name: 'Search',
  components: {
    [Search.name]: Search,
    [Tag.name]: Tag,
    [List.name]: List
  },
  data () {
    return {
      value: '',
      hotTags: ['考研', '中西音乐史', '舞蹈'],
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
    // 标签
    tag (value) {
      this.value = value
      this.search()
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
</style>
