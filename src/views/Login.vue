<template>
  <div class="login">
    <div class="login-header"></div>
    <div class="login-form">
      <van-cell-group>
        <van-field placeholder="请输入手机号" />
        <van-field placeholder="请输入验证码">
          <template #button>
            <a href="#">获取验证码</a>
          </template>
        </van-field>
        <span></span>
      </van-cell-group>
      <van-button class="btn-login" round="true" color="#1E4058" type="primary">立即登录</van-button>
      <van-checkbox v-model="checked" class="login-read" checked-color="#1E4058"><span>已阅读并同意</span><a href="#">《用户协议》</a> </van-checkbox>
    </div>
    <div class="login-footer">
      <van-divider />
    </div>
  </div>
</template>

<script>
import { Col, Row, Field, Button, Checkbox, Divider } from 'vant'

export default {
  name: 'Login',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Field.name]: Field,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Divider.name]: Divider
  },
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style scoped>
  .login {
    padding-left: 30px;
    padding-right: 30px;
  }
  .login-header {
    height: 280px;
  }
  .login-form {
    text-align: center;
  }
  .btn-login {
    width: 284px;
    margin-top: 60px;
  }
  .login-read {
    font-size: 12px;
    margin-top: 30px;
  }
  .login-read span {
    color: #ccc;
  }
  .login-read a {
    color: #1E4058;
  }
  .login-footer {
    margin-top: 60px;
  }
</style>
