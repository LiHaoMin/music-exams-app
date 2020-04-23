<template>
  <div class="login">
    <div class="login-header"></div>
    <div class="login-box">
      <van-cell-group>
        <van-field v-model="phoneNumber" maxlength="11" placeholder="请输入手机号" />
        <van-field v-model="smsCaptcha" maxlength="6" placeholder="请输入验证码">
          <van-button slot="button" color="#1E4058" size="small" type="primary"
                      :disabled="captchaDisable"
                      @click="sendVerifyCode"
                      v-if="!countDown">获取验证码</van-button>
          <van-button slot="button" color="#1E4058" size="small" type="primary"
                      disabled=""
                      v-else>{{countDown}}s</van-button>
        </van-field>
        <span></span>
      </van-cell-group>
      <van-button class="login-btn" round color="#1E4058" type="primary" :disabled="!isAgreement" @click="login">{{code ? '立即绑定' : '立即登录'}}</van-button>
      <van-checkbox v-model="isAgreement" class="agreement" checked-color="#1E4058"><span>已阅读并同意</span><a href="#">《用户协议》</a> </van-checkbox>
    </div>
    <div class="login-footer" v-if="!code">
      <van-divider />
      <div class="login-other">
        <div class="wechat" @click="wechat">
          <svg t="1571242875453"
               class="icon"
               viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="7519">
            <path d="M347.729118 353.0242c-16.487119 0-29.776737 13.389539-29.776737 29.776737S331.241998 412.677596 347.729118 412.677596s29.776737-13.389539 29.776737-29.776737-13.289617-29.876659-29.776737-29.876659zM577.749415 511.800156c-13.689305 0-24.880562 11.091335-24.880563 24.880562 0 13.689305 11.091335 24.880562 24.880563 24.880562 13.689305 0 24.880562-11.191257 24.880562-24.880562s-11.191257-24.880562-24.880562-24.880562zM500.909446 412.677596c16.487119 0 29.776737-13.389539 29.776737-29.776737s-13.389539-29.776737-29.776737-29.776737c-16.487119 0-29.776737 13.389539-29.776737 29.776737s13.289617 29.776737 29.776737 29.776737zM698.455113 511.600312c-13.689305 0-24.880562 11.091335-24.880562 24.880562 0 13.689305 11.091335 24.880562 24.880562 24.880562 13.689305 0 24.880562-11.091335 24.880562-24.880562-0.099922-13.689305-11.191257-24.880562-24.880562-24.880562z"
                  fill="#00C800"
                  p-id="7520"></path>
            <path d="M511.601093 0.799375C229.12178 0.799375 0.000781 229.820453 0.000781 512.399688s229.021077 511.600312 511.600312 511.600312 511.600312-229.021077 511.600312-511.600312S794.180328 0.799375 511.601093 0.799375z m-90.229508 634.504294c-27.37861 0-49.361436-5.595628-76.839969-10.991413l-76.640125 38.469945 21.882904-65.948477c-54.957065-38.370023-87.73146-87.831382-87.73146-148.084309 0-104.318501 98.722873-186.554254 219.32865-186.554255 107.815769 0 202.34192 65.648712 221.327088 153.979703-6.994536-0.799375-13.989071-1.298985-21.083529-1.298985-104.118657 0-186.454333 77.739266-186.454332 173.564403 0 15.98751 2.498048 31.275566 6.794692 45.964091-6.794692 0.599532-13.689305 0.899297-20.583919 0.899297z m323.547228 76.839969l16.48712 54.757221-60.153006-32.874317c-21.882904 5.495706-43.965652 10.991413-65.848555 10.991413-104.318501 0-186.554254-71.344262-186.554255-159.175644 0-87.631538 82.135831-159.175644 186.554255-159.175644 98.523029 0 186.254489 71.444184 186.254488 159.175644 0.099922 49.461358-32.774395 93.227166-76.740047 126.301327z"
                  fill="#00C800"
                  p-id="7521"></path>
          </svg>
          <p>微信授权</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Col, Row, CellGroup, Field, Button, Checkbox, Divider, Toast } from 'vant'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Divider.name]: Divider
  },
  data () {
    return {
      // 手机号码
      phoneNumber: '',
      // 短信验证码
      smsCaptcha: '',
      // 倒计时
      countDown: 0,
      isAgreement: false,
      code: '',
      wechatData: {}
    }
  },
  computed: {
    // 验证码按钮禁用
    captchaDisable () {
      return this.phoneNumber.length !== 11
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    // 获取短信验证码
    sendVerifyCode () {
      this.countDown = 60
      this.timeIntervalID = setInterval(() => {
        this.countDown--
        // 如果减到0 则清除定时器
        if (this.countDown === 0) {
          clearInterval(this.timeIntervalID)
        }
      }, 1000)
      if (this.code) {
        this.$http.get('/user-info/get_wx_code', { params: { PhoneNum: this.phoneNumber } })
      } else {
        this.$http.get('/user-info/get_code', { params: { PhoneNum: this.phoneNumber } })
      }
    },
    // 登录
    login () {
      if (this.phoneNumber.length !== 11) {
        Toast('请输入正确的手机号')
        return
      }
      if (this.smsCaptcha.length === 0) {
        Toast('请输入正确的验证码')
        return
      }
      if (this.code) {
        this.wechatData.telephone = this.phoneNumber
        this.wechatData.code = this.smsCaptcha
        this.$http.post('/user-info/wx_user', this.wechatData, { isShowLoading: true }).then((res) => {
          this.setUserInfo({
            token: res.data.token
          })
          this.$router.replace('/')
        })
      } else {
        this.$http.get('/user-info/sign_in', { isShowLoading: true, params: { PhoneNum: this.phoneNumber, code: this.smsCaptcha } }).then((res) => {
          this.setUserInfo({
            token: res.data.token
          })
          this.$router.replace('/')
        })
      }
    },
    wechat () {
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx78ebd89eceff8a0e&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    },
    getQueryVariable (str) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] === str) {
          return pair[1]
        }
      }
      return null
    }
  },
  created () {
    if (this.getQueryVariable('code')) {
      this.code = this.getQueryVariable('code')
      this.$http.get('/wx/weixinLogin', { isShowLoading: true, params: { code: this.getQueryVariable('code') } }).then((res) => {
        if (res.data.token) {
          this.setUserInfo({
            token: res.data.token
          })
        } else {
          this.code = this.getQueryVariable('code')
          this.wechatData = res.data
        }
        this.$router.replace('/')
      })
    }
  }
}
</script>

<style scoped>
  .login {
    padding-left: 38px;
    padding-right: 38px;
  }
  .login-header {
    height: 194px;
  }
  .login-box {
    text-align: center;
  }
  .login-btn {
    width: 284px;
    margin-top: 100px;
  }
  .agreement {
    font-size: 12px;
    margin-top: 25px;
    margin-left: 8px;
  }
  .agreement span {
    color: #999;
  }
  .agreement a {
    color: #1E4058;
  }
  .agreement >>> i {
    font-size: 12px !important;
    line-height: 1.25em;
  }
  .login-footer {
    margin-top: 60px;
  }
  .login-other {
    display: flex;
    justify-content: center;
    margin-top: 35px;
  }
  .login-other .wechat {
    text-align: center;
  }
  .login-other .wechat svg {
    width: 45px;
    height: 45px;
  }
  .login-other .wechat p {
    margin: 0;
    font-size: 14px;
  }
</style>
