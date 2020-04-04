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
        <div class="warp-left">
          <p>音乐考研 <img :src="require('@/assets/images/home/arrow.png')"></p>
          <p>音乐考研助你轻松上岸</p>
        </div>
        <div class="warp-right">
          <div>
            <p>舞蹈考研</p>
            <p>舞蹈考研助你上岸</p>
          </div>
          <div>
            <p>音乐留学</p>
            <p>音乐留学情况展示</p>
          </div>
        </div>
      </div>
    </div>
    <div class="list-warp">
      <div class="title">
        <span>推荐课程</span>
        <span @click="moreRecommend">更多 <img :src="require('@/assets/images/home/more.png')" /></span>
      </div>
      <div class="list-item-warp">
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
      <div class="list-item-warp">
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
      <div class="list-item-warp">
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
    </div>
    <div class="cell-warp">
      <div class="title">
        <span>课程列表</span>
        <span>查看全部 <img :src="require('@/assets/images/home/more.png')" /></span>
      </div>
      <div class="cell-item-warp">
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
      <div class="cell-item-warp">
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
      <div class="cell-item-warp">
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
    </div>
    <div class="block"></div>
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
  },
  methods: {
    // 更多推荐课程
    moreRecommend () {
      this.$emit('tabSelected', 1)
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
    background-image: url("~@/assets/images/home/music.png");
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
    background-image: url("~@/assets/images/home/dance.png");
    background-size: cover;
    background-position: center;
    padding-left: 10px;
    padding-top: 5px;
  }
  .offline-box .warp-right div:last-child {
    height: 82px;
    color: #6DACD0;
    background-image: url("~@/assets/images/home/abroad.png");
    background-size: cover;
    background-position: center;
    padding-left: 10px;
    padding-top: 5px;
  }

  .list-warp {
    font-size: 14px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .list-warp > .title {
    font-size: 16px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .list-warp > .title span:first-child {
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
  .list-warp > .title span:last-child {
    color:#888;
    font-size:12px;
    font-weight:400;
    display: flex;
    align-items: center;
  }
  .list-warp > .title span > img {
    width: 5px;
    height: 9px;
    margin-left: 3px;
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

  .cell-warp {
    font-size: 14px;
    padding-left: 15px;
    padding-right: 15px;
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
  .cell-warp > .title span > img {
    width: 5px;
    height: 9px;
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

  .block {
    height: 50px;
  }
</style>
