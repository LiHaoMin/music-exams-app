<template>
  <div class="course-detail">
    <NavBar />
    <div class="player" @click="showController = !showController">
      <d-player ref="player" @timeupdate="timeupdate" @ended="ended" :options="options"></d-player>
      <div class="player-controller" v-if="showController">
        <img @click.stop="play" :src="require('@/assets/images/home/v-play.png')" />
      </div>
    </div>
    <div class="content">
      <div class="title">
        <p>保过班</p>
        <p>202020人已报名</p>
        <div class="price"><label>¥</label>800</div>
      </div>
    </div>
    <div class="tab-warp">
      <van-tabs v-model="currentIdx"
                animated
                color="#1E4058"
                line-height="2"
                title-inactive-color="#333"
                title-active-color="#1E4058">
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" title="课程介绍">
          <SummaryTab />
        </van-tab>
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" title="课程目录">
          <DirectoryTab />
        </van-tab>
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" title="老师介绍">
          <ResumeTab />
        </van-tab>
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" title="评价（35）">
          <CommentTab />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
import SummaryTab from '@/views/home/course/SummaryTab'
import DirectoryTab from '@/views/home/course/DirectoryTab'
import ResumeTab from '@/views/home/course/ResumeTab'
import CommentTab from '@/views/home/course/CommentTab'

export default {
  name: 'CourseDetail',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    NavBar,
    SummaryTab,
    DirectoryTab,
    ResumeTab,
    CommentTab,
    'd-player': VueDPlayer
  },
  data () {
    return {
      currentIdx: 0,
      player: null,
      showController: true,
      options: {
        video: {
          url: 'http://cdn.toxicjohann.com/lostStar.mp4',
          pic: 'https://i.loli.net/2020/04/04/Fed3fi4m8bGklsu.jpg'
        },
        preload: false,
        screenshot: false,
        autoplay: false,
        contextmenu: []
      }
    }
  },
  methods: {
    // 视频播放
    play () {
      this.player.toggle()
      this.showController = !this.showController
    },
    // 播放中
    timeupdate () {
      console.log(this.player.video.currentTime)
    },
    // 视频播放结束
    ended () {
      // http://cdn.toxicjohann.com/lostStar.mp4
      // http://vjs.zencdn.net/v/oceans.mp4
      // this.player.switchVideo({
      //   url: 'http://cdn.toxicjohann.com/lostStar.mp4'
      console.log('视频播放结束')
      // })
    }
  },
  mounted () {
    this.player = this.$refs.player.dp
  }
}
</script>

<style scoped>
  .course-detail {
    height: 100%;
    background-color: #F8F8F8;
  }
  .player {
    height: 189px;
    position: relative;
  }
  .player .player-controller {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .player .player-controller img {
    width: 45px;
    height: 45px;
  }

  .content {
    background-color: #fff;
    padding-left: 25px;
    padding-right: 25px;
  }
  .content .title {
    font-size: 15px;
    font-weight: 500;
    color: #333;
    padding-top: 9px;
    padding-bottom: 9px;
    position: relative;
  }
  .content .title p {
    margin: 0;
  }
  .content .title p:nth-last-child(2) {
    color: #888;
    font-size: 12px;
    font-weight: 400;
    padding-top: 6px;
  }
  .content .price {
    position: absolute;
    bottom: 9px;
    right: 0;
    font-size:20px;
    font-weight: 500;
    color: #DB6073;
  }
  .content .price label {
    font-size: 14px;
    font-weight: 400;
    color: #DB6073;
    margin-right: 5px;
  }

  .tab-warp {
    margin-top: 10px;
  }

  .player >>> .dplayer {
    width: 100%;
    height: 100%;
  }
  .player >>> .dplayer-controller {
    /* 底部控制条 */
    display: none;
  }

  .player >>> .dplayer-notice {
    /* 快退进提示 */
    display: none;
  }

  .player >>> .dplayer-menu-show {
    /* 右键信息 */
    display: none !important;
  }

  .player >>> .dplayer-mask {
    /* 悬浮层 */
    display: inline-block;
  }
</style>
