<template>
  <div class="find-tab">
    <div class="find-tab-header">
      <van-swipe class="swipe" :autoplay="3000" indicator-color="#fff">
        <van-swipe-item v-for="(image, index) in bannerList" :key="index">
          <a :href="image.bannerPath" target="_blank"><img v-lazy="image.bannerUrl" /></a>
        </van-swipe-item>
      </van-swipe>
      <van-grid :border="false" :column-num="3">
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
      </van-grid>
    </div>
    <div class="offline-box">
      <div class="title">音乐博讲堂实体课</div>
      <div class="warp">
        <div class="warp-left" @click="music">
          <p>音乐考研 <img :src="require('@/assets/images/home/arrow.png')"></p>
          <p>音乐考研助你轻松上岸</p>
        </div>
        <div class="warp-right">
          <div @click="dance">
            <p>舞蹈考研</p>
            <p>舞蹈考研助你上岸</p>
          </div>
          <div @click="abroad">
            <p>音乐留学</p>
            <p>音乐留学情况展示</p>
          </div>
        </div>
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
      this.$router.push({ name: 'Classroom', params: { title: '导师博讲堂', classroomType: 1 } })
    },
    // 学长博讲堂
    senior () {
      this.$router.push({ name: 'Classroom', params: { title: '学长博讲堂', classroomType: 2 } })
    },
    // 学员博讲堂
    student () {
      this.$router.push({ name: 'Classroom', params: { title: '学员博讲堂', classroomType: 3 } })
    },
    // 音乐考研
    music () {
      this.$router.push({ name: 'OfflineCourse', params: { title: '音乐考研', offlineCourseType: 51 } })
    },
    // 舞蹈考研
    dance () {
      this.$router.push({ name: 'OfflineCourse', params: { title: '舞蹈考研', offlineCourseType: 52 } })
    },
    // 音乐留学
    abroad () {
      this.$router.push({ name: 'OfflineCourse', params: { title: '音乐留学', offlineCourseType: 53 } })
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
</style>
