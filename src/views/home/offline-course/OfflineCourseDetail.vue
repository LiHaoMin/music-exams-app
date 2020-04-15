<template>
  <div class="offline-course-detail">
    <NavBar />
    <div class="header">
      <van-swipe class="image" :autoplay="3000" indicator-color="#fff">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="content">
        <div class="title">
          <p>{{detail.curriculumName}}</p>
          <p>{{detail.isNumOfLearners ? detail.numOfLearners : detail.num }}人已报名</p>
          <div class="price" v-if="detail.freeAdmission"><span>免费</span></div>
          <div class="price" v-else><label>¥</label><span>{{detail.money}}</span></div>
        </div>
        <div class="teacher">
          <img class="circle" v-lazy="detail.headPortrait" />
          <div class="info">
            <span>{{detail.teacherName}}</span>
            <span>带班老师</span>
            <p>{{detail.teacherTelephone}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="summary">
      <div class="resume">
        {{detail.teacherIntroduce}}
      </div>
      <div class="introduction" v-if="showController">
        <d-player ref="player" @timeupdate="timeupdate" @ended="ended" :options="options"></d-player>
      </div>
    </div>
    <div class="footer">
      <van-button class="apply" @click="apply" type="default">我要报名</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Dialog, Swipe, SwipeItem } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
import { setLocalStore } from '@/utils/global'

// TODO 带班老师/视频介绍

export default {
  name: 'OfflineCourseDetail',
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    NavBar,
    'd-player': VueDPlayer
  },
  data () {
    return {
      detail: {},
      player: null,
      showController: false,
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
  computed: {
    images () {
      return this.detail.rotationChart ? this.detail.rotationChart.split(',') : []
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
    },
    // 我要报名
    apply () {
      this.$router.push({ name: 'OfflineCourseApply', params: { id: this.detail.id } })
      setLocalStore('apply_detail', this.detail)
    },
    requestCourseDetail () {
      this.$http.get('/home-page/get_curriculum_content', { isShowLoading: true, params: { CurriculumId: this.$route.params.id } }).then((res) => {
        this.detail = res.data
        if (this.detail.videoIntroduction) {
          this.options.video.url = this.detail.videoIntroduction
          this.options.video.pic = this.detail.videoIntroduction + '?vframe/jpg/offset/1/w/800/h/640'
        }
        this.showController = true
      })
    }
  },
  created () {
    this.requestCourseDetail()
  },
  mounted () {
    this.player = this.$refs.player.dp
  }
}
</script>

<style scoped>
  .offline-course-detail {
    height: 100%;
    background-color: #F8F8F8;
  }
  .header .image {
    width: 100%;
    height: 189px;
  }
  .header .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .header .content {
    background-color: #fff;
    padding-left: 25px;
    padding-right: 25px;
  }
  .header .content .title {
    font-size: 15px;
    font-weight: 500;
    color: #333;
    padding-top: 9px;
    padding-bottom: 9px;
    border-bottom: 2px solid #F5F5F5;
    position: relative;
  }
  .header .content .title p {
    margin: 0;
  }
  .header .content .title p:nth-last-child(2) {
    color: #888;
    font-size: 12px;
    font-weight: 400;
    padding-top: 6px;
  }
  .header .content .price {
    position: absolute;
    bottom: 9px;
    right: 0;
    font-size:20px;
    font-weight: 500;
    color: #DB6073;
  }
  .header .content .price label {
    font-size: 14px;
    font-weight: 400;
    color: #DB6073;
    margin-right: 5px;
  }
  .header .content .teacher {
    margin-top: -10px;
  }
  .header .content .teacher .circle {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  .header .content .teacher .info {
    display: inline-block;
    padding-left: 7px;
    padding-bottom: 10px;
  }
  .header .content .teacher .info span:first-child {
    font-size: 14px;
    font-weight: 400;
    color: #333;
  }
  .header .content .teacher .info span:nth-child(2) {
    font-size: 12px;
    font-weight: 400;
    color: #1E4058;
    padding: 2px 5px;
    background-color: #F2FAFF;
    border-radius:5px;
  }
  .header .content .teacher .info p {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    margin: 0;
  }

  .summary {
    width: 100%;
    height: 747px;
    margin-top: 10px;
    background-image: url("~@/assets/images/home/summary-01.png");
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .summary .resume {
    max-width: 305px;
    max-height: 231px;
    position: absolute;
    top: 191px;
    color: #1E4058;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
    padding: 13px 19px 11px 20px;
    border-radius:10px;
    background-color: #F6FBFF;
    overflow: scroll;
  }
  .summary .introduction {
    width: 305px;
    height: 148px;
    position: absolute;
    bottom: 88px;
    background-color: #333;
    border-radius: 10px;
    opacity: 0.4;
  }
  .summary .player-controller {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .summary .player-controller img {
    width: 45px;
    height: 45px;
  }
  .footer {
    display: flex;
  }
  .footer .apply {
    width: 100%;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    border-radius: 2px;
    margin: 10px 15px;
    background-color: #DB6073;
  }
  .introduction >>> .dplayer {
    width: 100%;
    height: 100%;
    /*border-radius: 10px;*/
  }

  .introduction >>> .dplayer-controller {
    /* 底部控制条 */
    /*display: none;*/
  }

  .introduction >>> .dplayer-setting-icon {
    display: none;
  }
  .introduction >>> .dplayer-full-in-icon {
    display: none !important;
  }
  .introduction >>> .dplayer-full-icon {
    margin-top: -30px;
  }
  .introduction >>> .dplayer-play-icon {
    margin-top: -10px;
  }

  .introduction >>> .dplayer-notice {
    /* 快退进提示 */
    display: none;
  }

  .introduction >>> .dplayer-menu-show {
    /* 右键信息 */
    display: none !important;
  }

  .introduction >>> .dplayer-mask {
    /* 悬浮层 */
    /*display: inline-block;*/
  }
</style>
