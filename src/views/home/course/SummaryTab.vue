<template>
  <div class="summary-tab">
    <div class="summary">
      <div class="warpper">
        <div class="title">课程简介</div>
        <div class="container resume">
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
      </div>
      <div class="warpper">
        <div class="title">课程涵盖</div>
        <div class="container directory">
          <ul>
            <li :key="index" v-for="(item, index) in [1, 1, 1, 1, 1, 1]">
              <div class="no">{{index + 1}}</div>
              <div class="text van-ellipsis">西方音乐史</div>
              <div class="time">时长：30</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="warpper block">
        <div class="title"></div>
        <div class="container card">
          <ListItemCard />
          <ListItemCard />
          <ListItemCard />
        </div>
      </div>
      <div class="warpper">
        <div class="title"></div>
        <div class="container comment">
          <div class="subtitle">
            <h3>课程评价</h3>
            <span>5.0</span>
            <van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" disabled v-model="value" />
          </div>
          <div class="content">
            <div class="comment-item" :key="index" v-for="(item, index) in [1, 1, 1]">
              <div class="circle">
                <img v-lazy="'https://i.loli.net/2020/04/03/WLFcBrZd4MtCjIX.jpg'" />
              </div>
              <div class="right-warp">
                <div class="info">
                  <span class="nickname">chjshdjs </span>
                  <span class="date">2019-09-21</span>
                </div>
                <div class="rate"><van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" disabled v-model="value" /></div>
                <div class="description van-multi-ellipsis--l2">太棒了太棒了太棒了太棒了太棒了太棒了太棒了吧
                  我的天呐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-block"></div>
    </div>
    <div class="footer">
      <van-button class="join" @click="showPayment = true" type="default">加入学习</van-button>
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
import { Rate, button, ActionSheet } from 'vant'
import ListItemCard from '@/components/list/ListItemCard'

export default {
  name: 'SummaryTab',
  components: {
    [Rate.name]: Rate,
    [button.name]: button,
    [ActionSheet.name]: ActionSheet,
    ListItemCard
  },
  data () {
    return {
      value: 4,
      showPayment: false
    }
  },
  methods: {
    // 付款
    payment () {
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
  .warpper  .title {
    font-size: 15px;
    font-weight: 400;
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
    font-weight: 400;
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
    font-weight: 500;
  }
  .directory li .text {
    font-size: 14px;
    color: #333;
    font-weight: 400;
    margin-left: 14px;
    width: 155px;
  }
  .directory li .time {
    font-size: 14px;
    font-weight: 400;
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
    font-weight: 400;
    display: inline-block;
    margin-left: 10px;
  }
  .comment .subtitle span {
    color: #FFBC49;
    font-size: 14px;
    font-weight: 400;
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
  }
  .comment-item .info {
    display: flex;
    justify-content: space-between;
  }
  .comment-item .info .nickname {
    font-size: 12px;
    font-weight: 400;
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
    line-height:16px;
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
</style>
