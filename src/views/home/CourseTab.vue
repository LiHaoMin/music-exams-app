<template>
  <div class="course-tab">
    <div class="cell-warp">
      <div class="title">
        <span>课程列表</span>
        <img @click="showPicker = true" :src="require('@/assets/images/home/filter.png')" />
      </div>
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div class="card-item-warp" :key="item.id" v-for="item in list" @click="courseItem(item)">
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
      </van-list>
    </div>
    <van-popup v-model="showPicker" :safe-area-inset-bottom="true" position="bottom" get-container="#app">
      <van-picker
        show-toolbar
        :columns="columns"
        visible-item-count="3"
        confirm-button-text="完成"
        @confirm="listFilter"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { List, Popup, Picker } from 'vant'

export default {
  name: 'CourseTab',
  components: {
    [List.name]: List,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      filterValue: 0,
      classificationList: [],
      showPicker: false,
      page: 1,
      size: 10
    }
  },
  created () {
    this.classification()
  },
  computed: {
    columns () {
      const columns = ['全部课程']
      this.classificationList.forEach((item) => {
        columns.push(item.classificationName)
      })
      return columns
    }
  },
  methods: {
    onLoad () {
      const data = { num: this.page, size: this.size }
      if (this.filterValue !== 0) {
        data.typeA = this.classificationList[this.filterValue - 1].id
      }
      this.$http.post('/home-page/get_curriculum_list', data, { isShowLoading: true }).then((res) => {
        this.loading = false
        if (res.code !== 200) {
          this.error = true
          return
        }
        if (this.page === 1) {
          this.list = res.data.records
        } else {
          this.list = this.list.concat(res.data.records)
        }
        if (this.page === res.data.pages || res.data.records.length === 0) {
          this.finished = true
        }
        this.page += 1
      })
    },
    listFilter (value, index) {
      this.filterValue = index
      this.showPicker = false
      this.page = 1
      this.list = []
      this.onLoad()
    },
    courseItem (item) {
      this.$router.push('/course/detail/' + item.id)
    },
    classification () {
      this.$http.get('/home-page/get_curriculum_classification_list', { isShowLoading: true }).then((res) => {
        this.classificationList = res.data
      })
    }
  }
}
</script>

<style scoped>
  .course-tab {
    padding: 10px 15px 50px 15px;
    background-color: #F8F8F8;
    min-height: 100vh;
    position: relative;
  }
  .cell-warp {
    font-size: 14px;
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
  .cell-warp > .title > img {
    width: 13px;
    height: 14px;
    margin-right: 12px;
  }
  .van-picker >>> button {
    color: #060606;
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
    font-weight: 500;
    color: #333;
    margin-top: 10px;
    /*display: inline-block;*/
    width: 160px;
  }
  .card-item-warp .content .description {
    font-size: 12px;
    font-weight: 400;
    color: #333;
    margin-top: 6px;
    /*display: inline-block;*/
    width: 160px;
  }
  .card-item-warp .content .teacher {
    font-size: 12px;
    font-weight: 400;
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
    font-weight: 400;
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
    font-weight: 400;
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
