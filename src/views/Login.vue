<template>
  <div class="login">
    <div class="login-header"></div>
    <div class="login-form">
      <van-cell-group>
        <van-field placeholder="请输入手机号" />
        <van-field placeholder="请输入验证码">
          <template #button>
            <van-button tag="a"  color="#ccc" size="mini" type="primary">获取验证码</van-button>
          </template>
        </van-field>
        <span></span>
      </van-cell-group>
      <van-button class="btn-login" round="true" color="#1E4058" type="primary">立即登录</van-button>
      <van-radio class="ck-login" checked-color="#1E4058"><span>已阅读并同意</span><a href="#">《用户协议》</a> </van-radio>
    </div>
    <div class="login-footer">
      <van-divider />
    </div>
  </div>
</template>

<script>
import { Col, Row, Field, Button, Radio, Divider } from 'vant'

export default {
  name: 'Login',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Field.name]: Field,
    [Button.name]: Button,
    [Radio.name]: Radio,
    [Divider.name]: Divider
  }
}
</script>

<style scoped>
  .login-header {
    height: 280px;
  }
  .login-form {
    padding-left: 30px;
    padding-right: 30px;
    text-align: center;
  }
  .btn-login {
    width: 284px;
    margin-top: 60px;
  }
  .ck-login {
    font-size: 12px;
    margin-top: 15px;
  }
  .ck-login span {
    color: red;
  }
</style>
