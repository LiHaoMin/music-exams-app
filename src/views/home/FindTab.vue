<template>
  <div class="find-tab">
    <div class="find-tab-header">
      <van-swipe class="swipe" :autoplay="3000" indicator-color="#fff">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <a href="https://www.baidu.com"><img v-lazy="image" /></a>
        </van-swipe-item>
      </van-swipe>
      <van-grid :border="false" :column-num="3">
        <van-grid-item>
          <div class="grid">
            <img :src="require('@/assets/images/home/teacher.png')" />
            <p>导师博讲堂</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="grid">
            <img :src="require('@/assets/images/home/senior.png')" />
            <p>学长博讲堂</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="grid">
            <img :src="require('@/assets/images/home/student.png')" />
            <p>学员博讲堂</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="offline-box">
      <div class="title">音乐博讲堂实体课</div>
      <div class="warp">
        <div class="warp-left" v-lazy:background-image="require('@/assets/images/home/music.png')">
          <p>音乐考研 <img :src="require('@/assets/images/home/arrow.png')"></p>
          <p>音乐考研助你轻松上岸</p>
        </div>
        <div class="warp-right">
          <div v-lazy:background-image="require('@/assets/images/home/dance.png')">
            <p>舞蹈考研</p>
            <p>舞蹈考研助你上岸</p>
          </div>
          <div v-lazy:background-image="require('@/assets/images/home/abroad.png')">
            <p>音乐留学</p>
            <p>音乐留学情况展示</p>
          </div>
        </div>
      </div>
    </div>
    <div class="list-warp">
      <div class="title">
        <h3>推荐课程</h3>
        <span>更多</span>
      </div>
      <div class="list-item-warp">
        <p>标题</p>
        <p>课程：8节</p>
        <p>时长：1小时30分钟</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Lazyload, Grid, GridItem } from 'vant'

export default {
  name: 'FindTab',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Lazyload]: Lazyload
  },
  data () {
    return {
      images: [
        'https://i.loli.net/2020/04/02/CNold4PSJUIayZb.png',
        'https://i.loli.net/2020/04/02/CNold4PSJUIayZb.png',
        'https://i.loli.net/2020/04/02/CNold4PSJUIayZb.png'
      ]
    }
  }
}
</script>

<style scoped>
  .find-tab {
    background-color: #F8F8F8;
  }
  .find-tab-header {
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    background-color: #fff;
  }
  .swipe {
    width: 345px;
    height: 151px;
    border-radius: 10px;
  }
  .swipe img {
    width: 100%;
    height: 100%;
  }
  .grid {
    text-align: center;
  }
  .grid img {
    width:35px;
    height:35px;
  }
  .grid p {
    font-size: 12px;
    font-weight:400;
  }
  .offline-box .title {
    font-size: 16px;
    color: #333;
    font-weight:600;
  }
  .offline-box {
    margin-top: 14px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .offline-box .warp {
    display: flex;
    margin-top: 2px;
    font-size: 14px;
    line-height: 12px;
    font-weight:500;
  }
  .offline-box .warp-left {
    flex: 1;
    color: #D99F51;
    background-size: cover;
    background-position: center;
    margin-right: 5px;
    padding-left: 10px;
    padding-top: 5px;
  }
  .offline-box .warp-left img {
    width: 10px;
    height: 10px;
  }
  .offline-box .warp-right {
    flex: 1;
  }
  .offline-box .warp-right div:first-child {
    height: 82px;
    color: #CC8B76;
    background-size: cover;
    background-position: center;
    padding-left: 10px;
    padding-top: 5px;
  }
  .offline-box .warp-right div:last-child {
    height: 82px;
    color: #6DACD0;
    background-size: cover;
    background-position: center;
    padding-left: 10px;
    padding-top: 5px;
  }
  .list-warp {
    font-size: 14px;
  }
  .list-warp .title {
    font-size: 16px;
  }
</style>
