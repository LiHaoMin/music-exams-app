<template>
  <div class="offline-course-detail">
    <NavBar />
    <div class="header">
      <div class="image"><img v-lazy="'https://i.loli.net/2020/04/04/Fed3fi4m8bGklsu.jpg'" /></div>
      <div class="content"></div>
    </div>
    <div class="summary">
      <div class="resume">
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
      <div class="introduction"></div>
    </div>
    <div class="footer">
      <van-button class="apply" type="default">我要报名</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'

export default {
  name: 'OfflineCourseDetail',
  components: {
    [Button.name]: Button,
    NavBar
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .offline-course-detail {
    background-color: #F8F8F8;
  }
  .header .image {
    width: 100%;
    height: 189px;
  }
  .header .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .header .content {
    width: 100%;
    height: 122px;
    background-color: #fff;
  }
  .summary {
    width: 100%;
    height: 747px;
    margin-top: 10px;
    background-image: url("~@/assets/images/home/summary.png");
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .summary .resume {
    max-width: 305px;
    max-height: 231px;
    position: absolute;
    top: 191px;
    color: #1E4058;
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
    padding: 10px;
    border-radius:10px;
    background-color: #F6FBFF;
    overflow: hidden;
  }
  .summary .introduction {
    width: 305px;
    height: 148px;
    position: absolute;
    bottom: 88px;
    background-color: #333;
    border-radius: 10px;
    opacity: 0.4;
  }
  .footer {
    display: flex;
  }
  .footer .apply {
    width: 100%;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    border-radius: 2px;
    margin: 10px 15px;
    background-color: #DB6073;
  }
</style>
