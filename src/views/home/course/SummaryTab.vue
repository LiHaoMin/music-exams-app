<template>
  <div class="summary-tab">
    <div class="summary">
      <div class="warpper">
        <div class="title">课程简介</div>
        <div class="container resume">
          {{detail.briefIntroduction}}
        </div>
      </div>
      <div class="warpper">
        <div class="title">课程涵盖</div>
        <div class="container directory">
          <ul>
            <li :key="index" v-for="(item, index) in chapterList.slice(0 , 6)">
              <div class="no">{{index + 1}}</div>
              <div class="text van-ellipsis">{{item.videoName}}</div>
              <div class="time">时长：{{item.time ? Math.round(item.time / 60) : 0}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="warpper block">
        <div class="title"></div>
        <div class="container card">
          <div class="card-item-warp" :key="item.id" v-for="item in courseList">
            <div class="thumb">
              <img v-lazy="item.curriculumImg ? item.curriculumImg : require('@/assets/avatar.jpg')" />
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
        </div>
      </div>
      <div class="warpper">
        <div class="title"></div>
        <div class="container comment">
          <div class="subtitle">
            <h3>课程评价</h3>
            <span>{{courseRate.toFixed(1)}}</span>
            <van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" disabled v-model="courseRate" />
          </div>
          <div class="content">
            <div class="comment-item" :key="index" v-for="(item, index) in commentList">
              <div class="circle">
                <img v-lazy="item.headPortrait ? item.headPortrait : require('@/assets/avatar.jpg')" />
              </div>
              <div class="right-warp">
                <div class="info">
                  <span class="nickname">{{item.name}} </span>
                  <span class="date">{{item.gmtCreate | datafmt('YYYY-MM-DD')}}</span>
                </div>
                <div class="rate"><van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" disabled v-model="item.fraction" /></div>
                <div class="description van-multi-ellipsis--l2">{{item.content}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-block"></div>
    </div>
    <div class="footer">
      <van-button v-if="!detail.purchase" class="join" @click="onPayment" type="default">加入学习</van-button>
    </div>
    <van-action-sheet v-model="showPayment" title="确认支付" :round="false">
      <div class="popup">
        <div class="info">
          <p>需付金额</p>
          <div class="price" v-if="detail.freeAdmission"><span>免费</span></div>
          <div class="price" v-else><label>¥</label><span>{{detail.money}}</span></div>
        </div>
        <div class="btn">
          <van-button class="payment" @click="payment" type="default">确认支付</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Rate, button, ActionSheet, Toast } from 'vant'
import { mapState } from 'vuex'
// TODO 课程涵盖/判断未购买的结果请求需横展开
export default {
  name: 'SummaryTab',
  props: {
    detail: Object,
    chapterList: Array
  },
  components: {
    [Rate.name]: Rate,
    [button.name]: button,
    [ActionSheet.name]: ActionSheet
  },
  data () {
    return {
      value: 4,
      showPayment: false,
      courseRate: 0,
      commentList: [],
      commentTotal: 0,
      courseList: []
    }
  },
  computed: mapState(['userInfo']),
  created () {
    this.requestCourseRate()
    this.requestComment()
    this.requestCourse()
    if (this.$route.query.code) {
      this.$http.get('/wx/weixinLogin', { isShowLoading: true, params: { code: this.$route.query.code, Telephone: this.userInfo.telephone } }).then((res) => {
        if (res.data.openId) {
          this.order({ CurriculumId: this.$route.params.id, openId: res.data.openId })
        }
      })
    }
  },
  methods: {
    onPayment () {
      // TODO 此处需判断如果免费直接报名
      if (!this.detail.freeAdmission) {
        this.showPayment = true
        return
      }
      this.$http.get('/home-page/purchase', { isShowLoading: true, params: { CurriculumId: this.$route.params.id } }).then((res) => {
        if (res && res.data) {
          Toast.success('操作成功')
          this.showPayment = false
          this.detail.purchase = true
        } else {
          Toast.fail('操作失败')
        }
      })
    },
    // 付款
    payment () {
      // TODO 此处需判断如果免费直接报名
      // TODO 接入微信支付
      if (this.userInfo.openId) {
        this.order({ CurriculumId: this.$route.params.id, openId: this.userInfo.openId })
      } else {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx78ebd89eceff8a0e&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      }
    },
    requestCourseRate () {
      this.$http.get('/home-page/score', { isShowLoading: true, params: { curriculumId: this.$route.params.id } }).then((res) => {
        if (res && res.data) {
          this.courseRate = res.data.fraction
        }
      })
    },
    requestComment () {
      this.$http.get('/home-page/evaluate_list', { isShowLoading: true, params: { num: 1, size: 3, curriculumId: this.$route.params.id } }).then((res) => {
        if (res && res.data) {
          this.commentList = res.data.records
          this.commentTotal = res.data.total
        }
      })
    },
    requestCourse () {
      const data = { num: 1, size: 3, typeD: this.detail.typeD }
      this.$http.post('/home-page/get_curriculum_list', data, { isShowLoading: true }).then((res) => {
        if (res && res.data) {
          this.courseList = res.data.records
        }
      })
    },
    order (data) {
      if (!window.WeixinJSBridge) {
        Toast('请使用微信打开')
        return
      }
      this.$http.get('/wx/orders', { isShowLoading: true, params: data }).then((res) => {
        if (res && res.data) {
          window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', res.data,
            (rs) => {
              if (rs.err_msg === 'get_brand_wcpay_request:ok') {
                Toast.success('操作成功')
                this.showPayment = false
                this.detail.purchase = true
              } else {
                Toast.fail('操作失败')
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
  .summary {
    width: 100%;
    min-height: 1579px;
    background-image: url("~@/assets/images/home/summary-02.png");
    background-position: top;
    background-size: contain;
    background-repeat: repeat-y;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .warpper {
    width: 305px;
    height: 231px;
    margin-top: 85px;
  }
  .warpper:first-child {
    margin-top: 181px;
  }
  .warpper > .title {
    font-size: 15px;
    font-weight: normal;
    color: #fff;
    padding-left: 20px;
    text-align: center;
  }
  .warpper .container {
    border-radius:10px;
    background-color: #FFF9F0;
    overflow: scroll;
    margin-top: 22px;
    overflow: scroll;
  }
  .resume {
    color: #1E4058;
    font-size: 14px;
    font-weight: normal;
    line-height: 23px;
    padding: 13px 19px 11px 20px;
  }

  .directory ul {
    padding: 23px 24px 15px 24px;
    overflow: scroll;
  }
  .directory li {
    display: flex;
    font-size: 11px;
    align-items: center;
    margin-bottom: 8px;
  }
  .directory li .no {
    background-color: #FF8C3E;
    padding: 2px 10px;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    font-weight: bold;
  }
  .directory li .text {
    font-size: 14px;
    color: #333;
    font-weight: normal;
    margin-left: 14px;
    width: 155px;
  }
  .directory li .time {
    font-size: 14px;
    font-weight: normal;
    color: #888;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: initial !important;
    margin-bottom: 30px;
  }
  .card >>> .card-item-warp {
    background-color: #FFF9F0;
    overflow: hidden;
    height: initial !important;
    padding: 8px;
  }
  .card >>> .card-item-warp .thumb {
    width: 80px;
    height: 80px;
  }
  .card >>> .card-item-warp .content .title {
    margin-top: 0;
  }
  .card >>> .card-item-warp .content .description {
    display: none;
  }
  .card >>> .card-item-warp .content .price {
    position: absolute;
    top: 38px;
    right: 10px;
  }
  .block {
    margin-bottom: 88px;
  }

  .comment {
    padding-left: 10px;
    padding-right: 10px;
  }
  .comment .subtitle h3 {
    color: #333;
    font-size: 15px;
    font-weight: normal;
    display: inline-block;
    margin-left: 10px;
  }
  .comment .subtitle span {
    color: #FFBC49;
    font-size: 14px;
    font-weight: normal;
    margin-left: 15px;
    margin-right: 11px;
  }
  .comment-item {
    display: flex;
  }
  .comment-item .circle img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  .comment-item .right-warp {
    width: 242px;
    margin-left: 10px;
    margin-bottom: 9px;
    padding-bottom: 9px;
    border-bottom: 1px solid #fff;
    line-height: 17px;
  }
  .comment-item .info {
    display: flex;
    justify-content: space-between;
  }
  .comment-item .info .nickname {
    font-size: 12px;
    font-weight: normal;
    color: #333;
  }
  .comment-item .info .date {
    font-size: 11px;
    font-weight: 400;
    color: #979797;
    line-height: 17px;
  }
  .comment-item .description {
    font-size: 11px;
    font-weight: 400;
    color: #585858;
    line-height: 16px;
    margin-top: 5px;
  }
  .bottom-block {
    width: 100%;
    height: 220px;
  }

  .footer {
    display: flex;
  }
  .footer .join {
    width: 100%;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    border-radius: 2px;
    margin: 10px 15px;
    background-color: #DB6073;
  }

  .popup .info p {
    margin: 0;
    color: #333;
    font-size: 13px;
    font-weight: 400;
  }
  .popup {
    background-color: #FFF;
  }
  .popup .info {
    position: relative;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 29px;
  }
  .popup .info .price {
    font-size:20px;
    font-weight: bold;
    color: #DB6073;
    position: absolute;
    right: 25px;
    top: 25px;
  }
  .popup .info .price label {
    font-size: 14px;
    font-weight: 400;
    color: #DB6073;
    margin-right: 5px;
  }
  .popup .btn {
    display: flex;
    background-color: #fff;
    margin-top: 68px;
  }
  .popup .btn .payment {
    width: 100%;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    border-radius: 2px;
    margin: 10px 15px;
    background-color: #1E4058;
  }

  .summary-tab >>> .van-action-sheet__header {
    color: #333;
    font-size: 13px;
    font-weight: 400;
    background-color: #F8F8F8;
  }
  .summary-tab >>> .van-action-sheet__header i {
    color: #333;
    font-size: 14px;
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
