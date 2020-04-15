<template>
  <div class="offline-course-apply">
    <NavBar />
    <div class="form">
      <van-cell-group>
        <van-field label-class="my-label" label="姓名" placeholder="请输入" input-align="right" />
        <van-field label-class="my-label" label="本科院校" placeholder="请输入" input-align="right" />
        <van-field label-class="my-label" label="报考院校" placeholder="请输入" input-align="right" />
        <van-field label-class="my-label" label="报考专业" placeholder="请输入" input-align="right" />
        <van-field label-class="my-label" label="电话" placeholder="请输入" input-align="right" />
      </van-cell-group>
    </div>
    <div class="content">
      <ListHeader title="您选择的课程">
        <ListItemCard :itemData="detail" />
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
      <van-button class="payment" @click="showPayment = true" type="default">去付款</van-button>
    </div>
    <van-action-sheet v-model="showPayment" title="确认支付" :round="false">
      <div class="popup">
        <div class="info">
          <p>需付金额</p>
          <div class="price"><label>¥</label>800</div>
        </div>
        <div class="btn">
          <van-button class="payment" @click="payment = true" type="default">确认支付</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Cell, CellGroup, Field, Button, ActionSheet } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import ListHeader from '@/components/list/ListHeader'
import ListItemCard from '@/components/list/ListItemCard'
import { getLocalStore, removeLocalStore } from '@/utils/global'

export default {
  name: 'OfflineCourseApply',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    NavBar,
    ListHeader,
    ListItemCard
  },
  data () {
    return {
      showPayment: false,
      detail: {}
    }
  },
  created () {
    this.detail = JSON.parse(getLocalStore('apply_detail') || '{}')
  },
  beforeDestroy () {
    removeLocalStore('apply_detail')
  },
  methods: {
    // 付款
    payment () {
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
  }
  .tips {
    display: flex;
    align-items: center;
    margin-top: 8px;
    float: right;
  }
  .tips .text {
    font-size: 12px;
    font-weight: 400;
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
    font-weight: 400;
    border-radius: 2px;
    margin: 10px 15px;
    background-color: #1E4058;
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
    font-weight: 500;
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

  .offline-course-apply >>> .van-action-sheet__header {
    color: #333;
    font-size: 13px;
    font-weight: 400;
    background-color: #F8F8F8;
  }
  .offline-course-apply >>> .van-action-sheet__header i {
    color: #333;
    font-size: 14px;
  }
</style>
