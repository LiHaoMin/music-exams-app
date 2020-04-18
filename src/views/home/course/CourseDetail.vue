<template>
  <div class="course-detail">
    <NavBar />
    <div class="player" v-if="showController">
      <d-player ref="player" @play="play" @timeupdate="timeupdate" @ended="ended" :options="options"></d-player>
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
    <div class="favorite" v-if="!detail.isCollection" @click="favorite">
      <img :src="require('@/assets/images/home/favorite.png')" />
    </div>
    <div class="tab-warp">
      <van-tabs v-model="currentIdx"
                animated
                color="#1E4058"
                line-height="2"
                title-inactive-color="#333"
                title-active-color="#1E4058">
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" title="课程介绍">
          <SummaryTab v-if="detail.id" :chapterList="chapterList" :detail="detail" />
        </van-tab>
        <van-tab title-style="font-size: 0.37333rem;font-weight:500;" title="课程目录">
          <DirectoryTab />
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
import { Tab, Tabs, Toast } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
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
    'd-player': VueDPlayer
  },
  data () {
    return {
      currentIdx: 0,
      showController: false,
      options: {
        video: {},
        preload: false,
        screenshot: false,
        autoplay: false,
        contextmenu: []
      },
      detail: {},
      commentTotal: 0,
      chapterList: []
    }
  },
  computed: {
    commentTitle () {
      return this.commentTotal ? `评价（${this.commentTotal}）` : '评价'
    },
    player () {
      return this.$refs.player.dp
    }
  },
  created () {
    this.requestCourseDetail()
    this.requestComment()
    this.requestChapter()
  },
  methods: {
    // 视频播放
    play () {
    },
    // 播放中
    timeupdate () {
      console.log(this.player.video.currentTime)
    },
    // 视频播放结束
    ended () {
      // http://cdn.toxicjohann.com/lostStar.mp4
      // http://vjs.zencdn.net/v/oceans.mp4
      this.player.switchVideo({
        url: this.chapterList[1].videoUrl,
        pic: this.chapterList[1].videoUrl + '?vframe/jpg/offset/1/w/800/h/640'
      })
    },
    // 分享
    share () {
      const config = {
        types: ['wx', 'wxline', 'qq', 'qzone']
      }
      mShare.popup(config)
    },
    // 收藏
    favorite () {
      this.$http.get('/home-page/collection', { isShowLoading: true, params: { curriculumId: this.$route.params.id } }).then((res) => {
        if (res && res.data) {
          Toast.success('操作成功')
          this.detail.isCollection = true
        } else {
          Toast.fail('操作失败')
        }
      })
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
          if (this.chapterList.length > 0) {
            const item = this.chapterList[0]
            this.options.video.url = item.videoUrl
            this.options.video.pic = item.videoUrl + '?vframe/jpg/offset/1/w/800/h/640'
          }
        }
      })
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
    right: 5px;
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
  }
  .favorite img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  .player >>> .dplayer {
    width: 100%;
    height: 100%;
  }
  .player >>> .dplayer-controller {
    /* 底部控制条 */
    /*display: none;*/
  }

  .player >>> .dplayer-setting-icon {
    display: none;
  }
  .player >>> .dplayer-full-in-icon {
    display: none !important;
  }
  .player >>> .dplayer-full-icon {
    margin-top: -30px;
  }
  .player >>> .dplayer-play-icon {
    margin-top: -10px;
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
    /*display: inline-block;*/
  }
</style>
