<template>
  <div class="teacher-func">
    <NavBar />
    <div class="container">
      <img :src="require('@/assets/images/mine/func.png')" />
      <div class="text">
        <p class="title">恭喜您成为音乐考研平台讲师</p>
        <p class="subtitle">现在您可以登录电脑端讲师后台，上传讲师课程啦～</p>
        <p class="link">http://www.yinyuebojiangtang.com</p>
      </div>
      <div class="form">
        <p class="account">您的讲师后台账号：<span>{{user.account}}</span></p>
        <p class="phone">现发送后台密码至您手机{{telephone}}</p>
        <van-field v-model="captcha" maxlength="6" placeholder="请输入验证码">
          <img class="verification"
               :src="captchaUrl"
               alt="captcha"
               @click.prevent="getCaptcha"
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
import { mapState } from 'vuex'
import { WEB_URL } from '@/utils/global'
// TODO 验证吗/接受
export default {
  name: 'TeacherFunc',
  components: {
    NavBar,
    [Button.name]: Button,
    [Field.name]: Field
  },
  data () {
    return {
      captchaUrl: '',
      captcha: '',
      user: {},
      webUrl: WEB_URL
    }
  },
  computed: {
    ...mapState(['userInfo']),
    telephone () {
      if (!this.user.telephone) return ''
      const mid = this.user.telephone.substr(3, 4)
      return this.user.telephone.replace(mid, '****')
    }
  },
  mounted () {
    this.requestTeacher()
    this.getCaptcha()
  },
  methods: {
    // 切换图片验证码
    getCaptcha () {
      this.captchaUrl = WEB_URL + 'user-info/getVerifiCode?time=' + new Date().getTime() + '&token=' + this.userInfo.token
    },
    // 接收密码
    receive () {
      if (!this.captcha) {
        Toast('请填写正确验证码～')
        return
      }
      this.$http.get('/user-info/setpw', { isShowLoading: true, params: { code: this.captcha, PhoneNum: this.user.telephone } }).then((res) => {
        if (res && res.data) {
          Toast.success('操作成功')
        } else {
          Toast.fail('验证码不正确')
        }
      })
    },
    requestTeacher () {
      this.$http.get('/user-info/teacher_content', { isShowLoading: true }).then((res) => {
        this.user = res.data
      })
    }
  }
}
</script>

<style scoped>
  .teacher-func {
    height: 100vh;
    background-color: #F8F8F8;
  }

  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 62px;
  }

  .text {
    text-align: center;
  }
  .text .title {
    font-size: 15px;
    font-weight: normal;
    color: #333;
    line-height: 21px;
  }
  .text .subtitle {
    font-size: 12px;
    font-weight: normal;
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
    font-weight: normal;
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
    font-weight: normal;
    color: #888;
    line-height: 17px;
  }
  .form .verification {
    width: 55px;
    height: 24px;
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
    font-weight: normal;
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
