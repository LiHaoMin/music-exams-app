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
      <div class="warpper">
        <div class="title"></div>
        <div class="container card">
          <ListItemCard />
          <ListItemCard />
          <ListItemCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import ListItemCard from '@/components/list/ListItemCard'

export default {
  name: 'SummaryTab',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    ListItemCard
  }
}
</script>

<style scoped>
  .summary {
    width: 100%;
    height: 1579px;
    background-image: url("~@/assets/images/home/summary-02.png");
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
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
</style>
