<template>
  <div class="course-detail">
    <NavBar />
    <div class="player">
      <video-player  ref="videoPlayer"
                     :options="options"
                     :playsinline="true"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     @ended="onPlayerEnded($event)">
      </video-player>
      <div class="player-controller" v-if="!detail.purchase && !detail.freeAdmission" @click="playerController"></div>
    </div>
    <div class="content">
      <div class="title">
        <p>{{detail.curriculumName}}</p>
        <p>{{detail.isNumOfLearners ? detail.numOfLearners : detail.num}}人已报名</p>
        <div class="price" v-if="detail.freeAdmission">免费</div>
        <div class="price" v-else><label>¥</label>{{detail.money}}</div>
        <div class="share" @click="share">
          <img :src="require('@/assets/images/home/share.png')" />
        </div>
      </div>
    </div>
    <div class="favorite" @click="favorite">
      <img v-if="!detail.isCollection" :src="require('@/assets/images/home/favorite.png')" />
      <img v-else :src="require('@/assets/images/home/favorite2.png')" />
    </div>
    <div class="tab-warp">
      <van-tabs v-model="currentIdx"
                animated
                color="#1E4058"
                line-height="2"
                title-inactive-color="#333"
                title-active-color="#1E4058">
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" title="课程介绍">
          <SummaryTab @play="play" v-if="detail.id" :chapterList="chapterList" :detail="detail" />
        </van-tab>
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" title="课程目录">
          <DirectoryTab @play="play" />
        </van-tab>
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" title="老师介绍">
          <ResumeTab v-if="detail.id" :detail="detail" />
        </van-tab>
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" :title="commentTitle">
          <CommentTab />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Dialog, Tab, Tabs, Toast } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
import SummaryTab from '@/views/home/course/SummaryTab'
import DirectoryTab from '@/views/home/course/DirectoryTab'
import ResumeTab from '@/views/home/course/ResumeTab'
import CommentTab from '@/views/home/course/CommentTab'
import mShare from 'm-share/dist/m-share.min'

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
    videoPlayer
  },
  data () {
    return {
      currentIdx: 0,
      showController: false,
      options: {
        autoplay: false,
        language: 'zh-CN',
        preload: 'auto',
        muted: false,
        loop: false,
        notSupportedMessage: '此视频暂无法播放,请稍后再试',
        sources: [],
        poster: '',
        controlBar: {
          remainingTimeDisplay: true
        }
      },
      detail: {},
      commentTotal: 0,
      chapterList: [],
      currentChapterIndex: 0,
      timeTask: null,
      timeout: 10
    }
  },
  computed: {
    commentTitle () {
      return this.commentTotal ? `评价（${this.commentTotal}）` : '评价'
    },
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  created () {
    this.requestCourseDetail()
    this.requestComment()
    this.requestChapter()
    this.$http.get('/wx/fx', { params: { url: 'http://yinyuebojiangtang.com/' } }).then((res) => {
      if (res && res.data) {
        window.wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.appId, // 必填，公众号的唯一标识
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
        })
      } else {
        Toast.fail('操作失败')
      }
    })
  },
  methods: {
    // 分享
    share () {
      // this.$http.get('/wx/fx', { params: { url: 'http://yinyuebojiangtang.com/' } }).then((res) => {
      //   if (res && res.data) {
      //     // const config = {
      //     //   types: ['wx', 'wxline', 'qq', 'qzone']
      //     // }
      //     window.wx.config({
      //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //       appId: res.data.appId, // 必填，公众号的唯一标识
      //       timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      //       nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
      //       signature: res.data.signature, // 必填，签名
      //       jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
      //     })
      //     // , 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'
      //     // mShare.wxConfig({
      //     //   title: this.detail.curriculumName,
      //     //   link: encodeURIComponent(window.location.href),
      //     //   desc: this.detail.briefIntroduction,
      //     //   imgUrl: this.detail.curriculumImg,
      //     //   wx: {
      //     //     appId: res.data.appId, // 必填，公众号的唯一标识
      //     //     timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      //     //     nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
      //     //     signature: res.data.signature // 必填，签名
      //     //   }
      //     // })
      //   } else {
      //     Toast.fail('操作失败')
      //   }
      // })
      const config = {
        types: ['wx', 'wxline', 'qq', 'qzone']
      }
      mShare.popup(config)
    },
    // 收藏
    favorite () {
      if (!this.detail.isCollection) {
        this.$http.get('/home-page/collection', { isShowLoading: true, params: { curriculumId: this.$route.params.id } }).then((res) => {
          if (res && res.data) {
            Toast.success('操作成功')
            this.detail.isCollection = true
          } else {
            Toast.fail('操作失败')
          }
        })
      } else {
        Dialog.confirm({
          message: '取消收藏后，课程被移除，\n确定取消收藏吗？'
        }).then(() => {
          this.$http.get('/home-page/no_collection', { isShowLoading: true, params: { curriculumId: this.$route.params.id } }).then((res) => {
            if (res && res.data) {
              this.detail.isCollection = false
              Toast.success('操作成功')
            } else {
              Toast.fail('操作失败')
            }
          })
        }).catch(() => {
          // 取消
        })
      }
    },
    requestCourseDetail () {
      this.$http.get('/home-page/get_curriculum_content', { isShowLoading: true, params: { CurriculumId: this.$route.params.id } }).then((res) => {
        if (res && res.data) {
          this.detail = res.data
        }
      })
    },
    requestComment () {
      this.$http.get('/home-page/evaluate_list', { isShowLoading: true, params: { num: 0, size: 0, curriculumId: this.$route.params.id } }).then((res) => {
        if (res && res.data) {
          this.commentTotal = res.data.total
        }
      })
    },
    requestChapter () {
      this.$http.get('/home-page/get_chapter_list', { isShowLoading: true, params: { CurriculumId: this.$route.params.id } }).then((res) => {
        if (res && res.data) {
          this.showController = true
          this.chapterList = res.data
          if (this.chapterList.length > this.currentChapterIndex) {
            const item = this.chapterList[this.currentChapterIndex]
            this.play(item)
          }
        }
      })
    },
    requestLearn () {
      const item = this.chapterList[this.currentChapterIndex]
      if (item.learningTime < item.time) {
        const learnTime = this.timeout + parseInt(item.learningTime || '0')
        this.chapterList[this.currentChapterIndex].learningTime = learnTime
        this.$http.get('/home-page/update_learning_video', { params: { learningVideoId: item.learningVideoId, time: learnTime } }).then((res) => {
          if (res && res.data) {}
        })
      }
    },
    play (item, idx) {
      if (idx) this.currentChapterIndex = idx
      this.$set(this.options.sources, 0, {
        type: 'video/mp4',
        src: item.videoUrl
      })
      this.$set(this.options, 'poster', item.videoUrl + '?vframe/jpg/offset/1/w/800/h/640')
    },
    playerController () {
      Toast('请先购买课程.')
    },
    onPlayerPlay (player) {
      if (!this.timeTask) {
        this.timeTask = setInterval(this.requestLearn, this.timeout * 1000)
      }
    },
    onPlayerPause (player) {
      if (this.timeTask) {
        clearInterval(this.timeTask)
        this.timeTask = null
      }
    },
    onPlayerEnded (player) {
      // if (player.isFullscreen()) player.exitFullscreen()
      if (this.currentChapterIndex < this.chapterList.length) {
        this.play(this.chapterList[++this.currentChapterIndex])
        Toast('本集已播放完,点击播放按钮继续下一集.')
      } else {
        Toast('课程已学完.')
      }
      if (this.timeTask) {
        clearInterval(this.timeTask)
        this.timeTask = null
      }
    }
  }
}
</script>

<style scoped>
  .course-detail {
    height: 100%;
    background-color: #F8F8F8;
    position: relative;
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
    font-weight: bold;
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
    font-weight: normal;
    padding-top: 6px;
  }
  .content .price {
    position: absolute;
    bottom: 9px;
    right: 0;
    font-size:20px;
    font-weight: bold;
    color: #DB6073;
  }
  .content .price label {
    font-size: 14px;
    font-weight: normal;
    color: #DB6073;
    margin-right: 5px;
  }
  .content .share {
    position: absolute;
    top: 7px;
    right: -10px;
    width: 15px;
    height: 15px;
  }
  .content .share img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  .tab-warp {
    margin-top: 10px;
  }

  .favorite {
    position: absolute;
    top: 0;
    right: 25px;
    width: 25px;
    height: 25px;
    z-index: 99;
  }
  .favorite img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  .player >>> .video-js {
    width: 100%;
    height: 189px;
  }
  .player >>> .vjs-big-play-button {
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  /*.player >>> .video-js .vjs-time-control{display:block;}*/
  /*.player >>> .video-js .vjs-remaining-time{display: none;}*/
</style>
