<template>
  <div class="find-tab">
    <div class="find-tab-header">
      <van-swipe class="swipe" :autoplay="3000" indicator-color="#fff">
        <van-swipe-item v-for="(image, index) in bannerList" :key="index">
          <a :href="image.bannerPath" target="_blank"><img v-lazy="image.bannerUrl" /></a>
        </van-swipe-item>
      </van-swipe>
      <div class="grid-box">
        <div class="grid-left">在<br />线<br /><img v-lazy="require('@/assets/logo.png')" />实<br />体</div>
        <van-grid class="grid-right" :border="false" :column-num="3">
          <van-grid-item @click="teacher">
            <div class="grid">
              <img :src="require('@/assets/images/home/teacher.png')" />
              <p>导师博讲堂</p>
            </div>
          </van-grid-item>
          <van-grid-item @click="senior">
            <div class="grid">
              <img :src="require('@/assets/images/home/senior.png')" />
              <p>学长博讲堂</p>
            </div>
          </van-grid-item>
          <van-grid-item @click="student">
            <div class="grid">
              <img :src="require('@/assets/images/home/student.png')" />
              <p>学员博讲堂</p>
            </div>
          </van-grid-item>
          <van-grid-item @click="music">
            <div class="grid">
              <img :src="require('@/assets/images/home/music.png')" />
              <p>音乐考研</p>
            </div>
          </van-grid-item>
          <van-grid-item @click="dance">
            <div class="grid">
              <img :src="require('@/assets/images/home/dance.png')" />
              <p>舞蹈考研</p>
            </div>
          </van-grid-item>
          <van-grid-item @click="abroad">
            <div class="grid">
              <img :src="require('@/assets/images/home/abroad.png')" />
              <p>音乐留学</p>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <list-header title="推荐课程" moreText="更多" @onMore="moreRecommend">
      <ListItemCell :key="item.id" :itemData="item" v-for="item in recommendCourseList" @onItemClick="recommendItem(item)" />
    </list-header>
    <list-header title="课程列表" moreText="查看全部" @onMore="moreCourse">
      <div class="card-item-warp" :key="item.id" v-for="item in courseList" @click="courseItem(item)">
        <div class="thumb">
          <img v-lazy="item.curriculumImg" />
        </div>
        <div class="content">
          <p class="title van-ellipsis">{{item.curriculumName}}</p>
          <p class="description van-ellipsis">{{item.briefIntroduction}}</p>
          <p class="teacher">讲师：{{item.teacherName}}</p>
          <div class="play">
            <img :src="require('@/assets/images/home/play.png')" />
            <span>{{item.isNumOfLearners ? item.numOfLearners : item.orderNum}}</span>
          </div>
          <div class="price" v-if="item.freeAdmission"><span>免费</span></div>
          <div class="price" v-else><label>¥</label><span>{{item.money}}</span></div>
        </div>
      </div>
    </list-header>
    <div class="block"></div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Lazyload, Grid, GridItem } from 'vant'
import ListHeader from '@/components/list/ListHeader'
import ListItemCell from '@/components/list/ListItemCell'

export default {
  name: 'FindTab',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Lazyload]: Lazyload,
    ListHeader,
    ListItemCell
  },
  data () {
    return {
      bannerList: [],
      recommendCourseList: [],
      courseList: []
    }
  },
  created () {
    this.requestBanner()
    this.requestRecommendCourse()
    this.requestCourseList()
  },
  methods: {
    // 更多 -> 推荐课程
    moreRecommend () {
      // 解决tab滚动条位置问题
      window.scrollTo(0, 0)
      this.$emit('tabSelected', 1)
    },
    recommendItem (item) {
      this.$router.push('/course/detail/' + item.id)
    },
    // 查看全部 -> 课程列表
    moreCourse () {
      // 解决tab滚动条位置问题
      window.scrollTo(0, 0)
      this.$emit('tabSelected', 2)
    },
    courseItem (item) {
      this.$router.push('/course/detail/' + item.id)
    },
    // 导师博讲堂
    teacher () {
      this.$router.push({ name: 'Classroom', params: { classroomType: 1 }, query: { type: 1 } })
    },
    // 学长博讲堂
    senior () {
      this.$router.push({ name: 'Classroom', params: { classroomType: 2 }, query: { type: 2 } })
    },
    // 学员博讲堂
    student () {
      this.$router.push({ name: 'Classroom', params: { classroomType: 3 }, query: { type: 3 } })
    },
    // 音乐考研
    music () {
      this.$router.push({ name: 'OfflineCourse', params: { offlineCourseType: 51 }, query: { type: 4 } })
    },
    // 舞蹈考研
    dance () {
      this.$router.push({ name: 'OfflineCourse', params: { offlineCourseType: 52 }, query: { type: 5 } })
    },
    // 音乐留学
    abroad () {
      this.$router.push({ name: 'OfflineCourse', params: { offlineCourseType: 53 }, query: { type: 6 } })
    },
    requestBanner () {
      this.$http.get('/home-page/get_banner', { isShowLoading: true }).then((res) => {
        this.bannerList = res.data
      })
    },
    requestRecommendCourse () {
      this.$http.get('/home-page/recommend_curriculum_list', { isShowLoading: true, params: { num: 1, size: 3 } }).then((res) => {
        this.recommendCourseList = res.data.records
      })
    },
    requestCourseList () {
      this.$http.post('/home-page/get_curriculum_list', { num: 1, size: 3 }, { isShowLoading: true }).then((res) => {
        this.courseList = res.data.records
      })
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

  .block {
    height: 50px;
  }

  .card-item-warp {
    height: 126px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(234,234,234,0.5);
    border-radius:10px;
    padding: 8px 8px 0 8px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
  }
  .card-item-warp .thumb {
    width: 110px;
    height: 110px;
  }
  .card-item-warp .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .card-item-warp .content {
    margin-left: 21px;
    flex: 1;
    position: relative;
  }
  .card-item-warp .content p {
    margin: 0;
  }
  .card-item-warp .content .title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-top: 10px;
    /*display: inline-block;*/
    width: 160px;
  }
  .card-item-warp .content .description {
    font-size: 12px;
    font-weight: normal;
    color: #333;
    margin-top: 6px;
    /*display: inline-block;*/
    width: 160px;
  }
  .card-item-warp .content .teacher {
    font-size: 12px;
    font-weight: normal;
    color: #888;
    margin-top: 17px;
  }
  .card-item-warp .content .play {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
  .card-item-warp .content .play img {
    width: 11px;
    height: 11px;
  }
  .card-item-warp .content .play span {
    font-size: 12px;
    font-weight: normal;
    color: #888;
    margin-left: 3px;
  }
  .card-item-warp .content .price {
    position: absolute;
    top: 85px;
    right: 10px;
  }
  .card-item-warp .content .price label {
    font-size: 14px;
    font-weight: normal;
    color: #DB6073;
  }
  .card-item-warp .content .price span {
    font-size: 20px;
    font-weight:500;
    color: #DB6073;
  }

  .rate {
    position: absolute;
    top: 0;
    right: 15px;
  }

  .card-item-warp .tag {
    width: 38px;
    height: 23px;
    color: #fff;
    font-size: 12px;
    font-weight: normal;
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

  .card-item-warp .content .status {
    position: absolute;
    bottom: 20px;
    right: 10px;
  }
  .card-item-warp .content .status {
    font-size: 12px;
    font-weight:500;
    color: #FFBC49;
    line-height: 17px;
  }
  .card-item-warp .content .active {
    color: #888;
  }

  .grid-box {
    display: flex;
  }
  .grid-right {
    flex: 1;
  }
  .grid-left {
    font-size: 16px;
    font-weight: bold;
    color: rgba(21,52,67,1);
    line-height: 35px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .grid-left img {
    width: 34px;
    height: 34px;
  }
</style>
