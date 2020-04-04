<template>
  <div class="classroom">
    <NavBar />
    <div class="sidebar">
      <div class="left-warp">
        <ul>
          <li class="van-ellipsis" :class="{'active': index === currentCategory}" @click="categoryClick(index)" :key="index" v-for="(item, index) in categories">{{item}}</li>
        </ul>
      </div>
      <div class="right-warp">
        <div class="tabs">
          <span :class="{'active': item.type === currentTab}" :key="item.type" @click="tabClick(item.type)" v-for="item in tabs">{{item.name}}</span>
        </div>
        <div class="list">
          <van-list
            v-model="loading"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
            <div class="list-item" :key="index" v-for="(item, index) in list">
              <div class="thumb">
                <img v-lazy="'https://i.loli.net/2020/04/03/WLFcBrZd4MtCjIX.jpg'" />
              </div>
              <div class="content">
                <p class="title">23天高能专业培训</p>
                <p class="description">帮你吃透专业，轻松上岸</p>
                <div class="icon">
                  <div>
                    <img :src="require('@/assets/images/home/ren.png')" />
                    <span>李丽</span>
                  </div>
                  <div>
                    <img :src="require('@/assets/images/home/play.png')" />
                    <span>88888</span>
                  </div>
                </div>
                <div class="price"><label>¥</label><span>100</span></div>
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { List, Sticky } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'

export default {
  name: 'Classroom',
  components: {
    [List.name]: List,
    [Sticky.name]: Sticky,
    NavBar
  },
  data () {
    return {
      currentTab: -1,
      // 1:音乐,2:舞蹈,3:留学
      tabs: [
        { type: 1, name: '音乐' },
        { type: 2, name: '舞蹈' },
        { type: 3, name: '留学' }
      ],
      currentCategory: -1,
      categories: [],
      list: [],
      loading: false,
      error: false,
      finished: false
    }
  },
  mounted () {
    this.tabClick(1)
  },
  methods: {
    // 二级分类点击
    tabClick (type) {
      if (this.currentTab === type) return
      this.currentTab = type
      this.currentCategory = -1
      const tmpData = [
        ['考研英语', '考研政治', '和声曲式', '中西音乐史', '其他专业科目'],
        ['考研英语', '考研政治', '其他专业科目'],
        ['美国', '澳大利亚', '韩国', '英国', '日本']
      ]
      this.categories = tmpData[type - 1]
      this.categoryClick(0)
    },
    // 三级分类点击
    categoryClick (idx) {
      if (this.currentCategory === idx) return
      this.currentCategory = idx
      this.list = []
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
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
  .sidebar .left-warp {
    width: 96px;
    background-color: #F8F8F8;
    overflow: scroll;
    position: fixed;
    height: 100%;
  }
  .sidebar .left-warp li {
    width: 100%;
    height: 50px;
    color: #333;
    font-size: 12px;
    font-weight:400;
    text-align: center;
    line-height: 50px;
  }
  .sidebar .left-warp li span  {
    width: 78px;
    display: inline-block;
  }
  .sidebar .left-warp li.active {
    background-color: #fff;
    color: #1E4058;
    font-size: 13px;
    font-weight: 500;
    position: relative;
  }
  .sidebar .left-warp li.active:before {
    position: absolute;
    width: 3px;
    height: 13px;
    content: '';
    background-color: #1E4058;
    top: 17px;
    right: 5px;
    border-radius: 10px;
  }
  .right-warp {
    margin-left: 96px;
    background-color: #fff;
  }
  .right-warp .tabs {
    position: fixed;
    background-color: #fff;
    z-index: 2;
    padding-bottom: 5px;
  }
  .right-warp .tabs span {
    width: 62px;
    height: 27px;
    display: inline-block;
    text-align: center;
    line-height: 27px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    border-radius: 5px;
    border:1px solid rgba(194,193,193,.2);
    margin-left: 15px;
    margin-right: 10px;
  }
  .right-warp .tabs span.active {
    color: #1E4058;
    background-color: rgba(189,228,255,.2);
    border:1px solid rgba(189,228,255,.2);
  }
  .list {
    padding-top: 40px;
  }
  .right-warp .list-item {
    padding: 15px 5px;
    display: flex;
    border-bottom: 1px solid #F5F5F5;
  }
  .right-warp .list-item .thumb {
    width: 65px;
    height: 65px;
  }
  .right-warp .list-item .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .right-warp .list-item .content {
    flex: 1;
    margin-left: 10px;
    position: relative;
  }
  .right-warp .list-item .content p {
    margin: 0;
  }
  .right-warp .list-item .content .title {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  .right-warp .list-item .content .description {
    font-size: 12px;
    font-weight: 400;
    color: #333;
    margin-top: 3px;
  }
  .right-warp .list-item .content .icon div {
    display: inline-block;
  }
  .right-warp .list-item .content .icon div:last-child {
    margin-left: 14px;
  }
  .right-warp .list-item .content .icon img {
    width: 11px;
    height: 11px;
  }
  .right-warp .list-item .content .icon span {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    margin-left: 3px;
  }
  .right-warp .list-item .content .price {
    position: absolute;
    right: 10px;
    bottom: 0;
  }
  .right-warp .list-item .content .price label {
    font-size: 14px;
    font-weight: 400;
    color: #DB6073;
  }
  .right-warp .list-item .content .price span {
    font-size: 20px;
    font-weight:500;
    color: #DB6073;
  }
</style>
