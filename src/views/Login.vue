<template>
  <div class="login">
    <div class="login-header"></div>
    <div class="login-box">
      <van-cell-group>
        <van-field v-model="phoneNumber" maxlength="11" placeholder="请输入手机号" />
        <van-field v-model="smsCaptcha" maxlength="4" placeholder="请输入验证码">
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
      <van-button class="login-btn" round color="#1E4058" type="primary" :disabled="!isAgreement" @click="login">立即登录</van-button>
      <van-checkbox v-model="isAgreement" class="agreement" checked-color="#1E4058"><span>已阅读并同意</span><a href="#">《用户协议》</a> </van-checkbox>
    </div>
    <div class="login-footer">
      <van-divider />
    </div>
  </div>
</template>

<script>
import { Col, Row, CellGroup, Field, Button, Checkbox, Divider, Toast } from 'vant'

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
      isAgreement: false
    }
  },
  computed: {
    // 验证码按钮禁用
    captchaDisable () {
      return this.phoneNumber.length !== 11
    }
  },
  methods: {
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
      // TODO 请求验证码
    },
    // 登录
    login () {
      if (this.phoneNumber.length !== 11) {
        Toast('请输入正确的手机号')
        return
      }
      if (this.smsCaptcha.length !== 4) {
        Toast('请输入正确的验证码')
        return
      }
      // TODO 请求登录
      Toast('请求登录')
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
  }
  .login-footer {
    margin-top: 60px;
  }
</style>
