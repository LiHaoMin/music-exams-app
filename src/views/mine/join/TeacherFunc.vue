<template>
  <div class="teacher-func">
    <NavBar />
    <div class="container">
      <img :src="require('@/assets/images/mine/func.png')" />
      <div class="text">
        <p class="title">恭喜您成为音乐考研平台讲师</p>
        <p class="subtitle">现在您可以登录讲师后台，上传讲师课程啦～</p>
        <p class="link">http://dhajsdhjahdkahw.com</p>
      </div>
      <div class="form">
        <p class="account">您的讲师后台账号：<span>001</span></p>
        <p class="phone">现发送后台密码至您手机182****4532</p>
        <van-field v-model="captcha" maxlength="4" placeholder="请输入验证码">
          <img class="verification"
               src="http://demo.itlike.com/web/xlmc/api/captcha"
               alt="captcha"
               @click.prevent="getCaptcha"
               ref="imgCaptcha"
               slot="button">
        </van-field>
      </div>
    </div>
    <div class="btn">
      <van-button class="edit" type="default" @click="receive">接收密码</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Field, Toast } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'

export default {
  name: 'TeacherFunc',
  components: {
    NavBar,
    [Button.name]: Button,
    [Field.name]: Field
  },
  data () {
    return {
      captcha: ''
    }
  },
  methods: {
    // 切换图片验证码
    getCaptcha () {
      this.$set(this.$refs.imgCaptcha, 'src', 'http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date())
    },
    // 接收密码
    receive () {
      if (!this.captcha) Toast('请填写正确验证码～')
    }
  }
}
</script>

<style scoped>
  .teacher-func {
    background-color: #F8F8F8;
  }

  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 62px;
  }

  .text {
    text-align: center;
  }
  .text .title {
    font-size: 15px;
    font-weight: 400;
    color: #333;
    line-height: 21px;
  }
  .text .subtitle {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    line-height: 17px;
  }
  .text .link {
    font-size: 14px;
    font-weight: bold;
    color: #1E4058;
    line-height: 20px;
    position: relative;
    padding-bottom: 3px;
  }
  .text .link:after {
    width: 60%;
    height: 2px;
    content: '';
    border-bottom: 1px solid #1E4058;
    position: absolute;
    bottom: 0;
    left: 20%;
  }

  .form {
    text-align: center;
    margin-top: 47px;
  }
  .form .account {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 20px;
  }
  .form .account span {
    font-size: 16px;
    color: #DB6073;
    font-weight: bold;
    line-height: 22px;
  }
  .form .phone {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    line-height: 17px;
  }
  .form .verification {
    width: 49px;
    height: 23px;
    object-fit: cover;
    object-position: center;
  }

  .btn {
    display: flex;
    margin-top: 52px;
    padding-bottom: 50px;
  }

  .btn .edit {
    width: 100%;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    border-radius: 5px;
    margin: 10px 46px;
    background-color: #1E4058;
  }

  .form >>> .van-cell {
    background-color: transparent;
    padding: 0;
    margin-top: 24px;
    border-bottom: 2px solid #F5F5F5;
  }
</style>
