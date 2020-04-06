<template>
  <div class="help">
    <NavBar />
    <div class="content">
      <div class="title">帮助手册</div>
      <div class="text">
        <p>帮助手册大等哈看就是短发就是快的哈快结束的是
        打开警示灯看见啊好看的就啊好的机会哈手机客户端上
        很大空间设计的空间上的空间啊我还看得见和萨快接书
          会打开手机等哈看手机号。</p>
        <p>帮助手册大等哈看就是短发就是快的哈快结束的是
        打开警示灯看见啊好看的就啊好的机会哈手机客户端上
        很大空间设计的空间上的空间啊我还看得见和萨快接书
          会打开手机等哈看手机号。</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar/NavBar'

export default {
  name: 'Help',
  components: {
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
  .help {
    height: 100vh;
    background-color: #F8F8F8;
  }
  .content {
    padding: 20px 16px;
  }
  .content .title {
    font-size: 15px;
    font-weight: bold;
    color: #333;
    line-height: 21px;
    text-align: center;
  }
  .content .text {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 20px;
    text-indent: 12px;
  } .content .text p {
    margin-top: 10px;
    margin-bottom: 10px;
      }
</style>
