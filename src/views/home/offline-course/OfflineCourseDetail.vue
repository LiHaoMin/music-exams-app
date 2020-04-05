<template>
  <div class="offline-course-detail">
    <NavBar />
    <div class="header">
      <div class="image"><img v-lazy="'https://i.loli.net/2020/04/04/Fed3fi4m8bGklsu.jpg'" /></div>
      <div class="content"></div>
    </div>
    <div class="summary">
      <div class="resume">
        介绍等哈圣诞节啊教大家说的结合杀菌的哈
        好风景阿佘减肥的哈手机客户反馈回家阿佘
        哈科技活动空间啊还是觉得客服哈萨克觉得
        第八圣诞节啊还是觉得哈等哈就睡得好大家
        大家啊活动空间啊还觉得哈大家授课活动空
        间啊还是看的但是觉得哈手机但是科技大会
        上大号就看到哈看就是大事大手大脚大厦将
        阿就看到哈就开始的哈就睡得好说的那款经
        那不就是不对劲啊不大的哈就看到。
      </div>
      <div class="introduction" @click="showController = !showController">
        <d-player ref="player" @timeupdate="timeupdate" @ended="ended" :options="options"></d-player>
        <div class="player-controller" v-if="showController">
          <img @click.stop="play" :src="require('@/assets/images/home/v-play.png')" />
        </div>
      </div>
    </div>
    <div class="footer">
      <van-button class="apply" @click="apply" type="default">我要报名</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Dialog } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'

export default {
  name: 'OfflineCourseDetail',
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    NavBar,
    'd-player': VueDPlayer
  },
  data () {
    return {
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
      if (this.player.video.currentTime < 1) alert(this.player.video.currentTime)
    },
    // 视频播放结束
    ended () {
      // http://cdn.toxicjohann.com/lostStar.mp4
      // http://vjs.zencdn.net/v/oceans.mp4
      // this.player.switchVideo({
      //   url: 'http://cdn.toxicjohann.com/lostStar.mp4'
      alert('视频播放结束')
      // })
    },
    // 我要报名
    apply () {
      alert('我要报名')
    }
  },
  mounted () {
    this.player = this.$refs.player.dp
  }
}
</script>

<style scoped>
  .offline-course-detail {
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
    width: 100%;
    height: 122px;
    background-color: #fff;
  }
  .summary {
    width: 100%;
    height: 747px;
    margin-top: 10px;
    background-image: url("~@/assets/images/home/summary.png");
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
    padding: 10px;
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
  .dplayer {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .introduction >>> .dplayer-controller {
    /* 底部控制条 */
    display: none;
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
    display: inline-block;
  }
</style>
