<template>
  <div class="offline-course-apply">
    <NavBar />
    <div class="form">
      <van-cell-group>
        <van-field label-class="my-label" label="姓名" placeholder="请输入" input-align="right" v-model="info.signUpName" />
        <van-field label-class="my-label" label="本科院校" placeholder="请输入" input-align="right" v-model="info.school" />
        <van-field label-class="my-label" label="报考院校" placeholder="请输入" input-align="right" v-model="info.bkSchool" />
        <van-field label-class="my-label" label="报考专业" placeholder="请输入" input-align="right" v-model="info.bkMajor" />
        <van-field label-class="my-label" label="电话" placeholder="请输入" input-align="right" v-model="info.telephone" />
      </van-cell-group>
    </div>
    <div class="content">
      <ListHeader title="您选择的课程">
        <div class="card-item-warp">
          <div class="thumb">
            <img v-lazy="detail.curriculumImg" />
          </div>
          <div class="content">
            <p class="title van-ellipsis">{{detail.curriculumName}}</p>
            <div class="play">
              <span>{{detail.isNumOfLearners ? detail.numOfLearners : detail.num }}人已报名</span>
            </div>
            <div class="circle">
              <img v-lazy="detail.headPortrait ? detail.headPortrait : require('@/assets/avatar.jpg')" />
              <span>{{detail.teacherName}}</span>
            </div>
            <div class="price" v-if="detail.freeAdmission"><span>免费</span></div>
            <div class="price" v-else><label>¥</label><span>{{detail.money}}</span></div>
          </div>
        </div>
      </ListHeader>
      <div class="tips-warp van-clearfix">
        <div class="tips">
          <div class="text">遇到问题可以电话联系老师哦～</div>
          <img class="right-icon" :src="require('@/assets/images/home/tips.png')" />
        </div>
        <div class="tips">
          <div class="text">{{detail.teacherTelephone}}</div>
          <img class="right-icon" :src="require('@/assets/images/home/tips.png')" />
        </div>
      </div>
    </div>
    <div class="footer">
      <van-button class="payment" @click="onPayment" type="default">去付款</van-button>
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
import { Cell, CellGroup, Field, Button, ActionSheet, Toast } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import ListHeader from '@/components/list/ListHeader'
import { getLocalStore, removeLocalStore } from '@/utils/global'
import { mapState } from 'vuex'

export default {
  name: 'OfflineCourseApply',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    NavBar,
    ListHeader
  },
  data () {
    return {
      showPayment: false,
      detail: {},
      info: {}
    }
  },
  computed: mapState(['userInfo']),
  created () {
    this.detail = JSON.parse(getLocalStore('apply_detail') || '{}')
    if (this.$route.query.code) {
      if (!window.WeixinJSBridge) {
        Toast('请使用微信打开')
        return
      }
      this.$http.get('/wx/weixinLogin', { isShowLoading: true, params: { code: this.$route.query.code, Telephone: this.userInfo.telephone } }).then((res) => {
        if (res.data.openId) {
          this.order({ CurriculumId: this.$route.params.id, openId: res.data.openId })
        }
      })
    }
  },
  beforeDestroy () {
    removeLocalStore('apply_detail')
  },
  methods: {
    onPayment () {
      // TODO 此处需判断如果免费直接报名
      if (!this.detail.freeAdmission) {
        this.showPayment = true
        return
      }
      this.requestJoin()
    },
    // 付款
    payment () {
      // TODO 接入微信支付
      if (!window.WeixinJSBridge) {
        Toast('请使用微信打开')
        return
      }
      if (this.userInfo.openId) {
        this.order({ CurriculumId: this.$route.params.id, openId: this.userInfo.openId })
      } else {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx78ebd89eceff8a0e&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      }
    },
    requestJoin () {
      this.info.curriculumId = this.$route.params.id
      this.$http.post('/home-page/join_curriculum', this.info, { isShowLoading: true }).then((res) => {
        if (res && res.data) {
          Toast.success('操作成功')
        } else {
          Toast.fail('操作失败')
        }
      })
    },
    order (data) {
      this.$http.get('/wx/orders', { isShowLoading: true, params: data }).then((res) => {
        if (res && res.data) {
          window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', res.data,
            (rs) => {
              if (rs.err_msg === 'get_brand_wcpay_request:ok') {
                Toast.success('操作成功')
                this.$router.back()
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
  .offline-course-apply {
    height: 100%;
    background-color: #F8F8F8;
  }
  .offline-course-apply >>> .my-label {
    color: #333;
    font-size: 14px;
  }
  .content {
    padding-top: 10px;
  }
  .tips-warp {
    margin-top: 19px;
    margin-right: 29px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .tips {
    display: flex;
    align-items: center;
    margin-top: 8px;
    float: right;
  }
  .tips .text {
    font-size: 12px;
    font-weight: normal;
    color: #1E4058;
    background: #fff;
    box-shadow: 0 2px 10px 0 #EAEAEA;
    border-radius: 15px 0 15px 15px;
    padding: 7px 6px 6px 9px;
    display: inline-block;
  }
  .tips .right-icon {
    width: 25px;
    height: 25px;
    margin-left: 13px;
    margin-top: -2px;
  }

  .footer {
    display: flex;
    background-color: #fff;
    margin-top: 62px;
  }
  .footer .payment {
    width: 100%;
    color: #fff;
    font-size: 15px;
    font-weight: normal;
    border-radius: 2px;
    margin: 10px 15px;
    background-color: #1E4058;
  }
  .popup .info p {
    margin: 0;
    color: #333;
    font-size: 13px;
    font-weight: normal;
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
    font-weight: normal;
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
    font-weight: normal;
    border-radius: 2px;
    margin: 10px 15px;
    background-color: #1E4058;
  }

  .offline-course-apply >>> .van-action-sheet__header {
    color: #333;
    font-size: 13px;
    font-weight: normal;
    background-color: #F8F8F8;
  }
  .offline-course-apply >>> .van-action-sheet__header i {
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
  .card-item-warp .content .circle img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  .card-item-warp .content .circle {
    display: flex;
    align-items: center;
    position: absolute;
    top: 80px;
  }
  .card-item-warp .content .circle span {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #888;
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
