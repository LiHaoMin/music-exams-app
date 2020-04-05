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
        <div class="container">
          <ul>
            <li>
              <div>1</div>
              <div>西方音乐史</div>
              <div>时长：30</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'

export default {
  name: 'SummaryTab',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
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
    max-width: 305px;
    max-height: 231px;
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
    max-height: 231px;
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
  .container li {
    display: flex;
    font-size: 11px;
    padding: 23px 24px;
    background-color: red;
    justify-content: space-between;
  }
</style>
