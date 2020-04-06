<template>
  <div class="mine">
    <div class="header">
      <div class="avatar">
        <van-image
          width="1.41333rem"
          height="1.41333rem"
          lazy-load
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <img class="gender" :src="require('@/assets/images/mine/male.png')" />
      </div>
      <div class="info">
        <div class="nickname">蜡笔小新</div>
        <div class="tag">音乐高级讲师</div>
      </div>
      <div class="vip">
        <img :src="require('@/assets/images/home/play.png')" />
        <span>会员</span>
      </div>
    </div>
    <div class="cell-warp">
      <van-cell-group>
        <van-cell center title-class="cell-title" title="购买记录" is-link>
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/home/play.png')" />
        </van-cell>
        <van-cell center title-class="cell-title" title="个人信息" is-link>
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/home/play.png')" />
        </van-cell>
        <van-cell center title-class="cell-title" title="联系客服" is-link>
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/home/play.png')" />
        </van-cell>
        <van-cell center title-class="cell-title" title="帮助手册" is-link>
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/home/play.png')" />
        </van-cell>
      </van-cell-group>
      <div class="gap"></div>
      <van-cell-group>
        <van-cell center title-class="cell-title" title="成为讲师" is-link>
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/home/play.png')" />
        </van-cell>
        <van-cell center title-class="cell-title" title="讲师功能" is-link>
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/home/play.png')" />
        </van-cell>
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button class="logout" type="default">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Button, Image } from 'vant'

export default {
  name: 'Mine',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Image.name]: Image
  }
}
</script>

<style scoped>
  .mine {
    height: 100vh;
    background-color: #F8F8F8;
  }

  .header {
    /*width: 100%;*/
    height: 53px;
    padding: 20px 25px;
    background-color: #fff;
    display: flex;
    position: relative;
  }

  .header .avatar {
    position: relative;
  }
  .header .avatar .gender {
    position: absolute;
    top: 40px;
    left: 35px;
    width: 17px;
    height: 17px;
  }

  .header .info {
    margin-left: 12px;
  }

  .header .info .nickname {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    line-height: 20px;
    margin-bottom: 3px;
  }

  .header .info .tag {
    font-size: 12px;
    font-weight:400;
    color: #888;
    line-height: 17px;
    background: #EDEDED;
    border-radius: 11px;
    padding: 2px 7px;
  }
  .header .vip {
    font-size: 14px;
    font-weight: 500;
    color: #1E4058;
    line-height: 20px;
    position: absolute;
    top: 24px;
    right: 25px;
    display: flex;
    align-items: center;
  }
  .header .vip img {
    margin-right: 7px;
  }

  .cell-warp {
    margin-top: 10px;
    margin-left: 15px;
    margin-right: 15px;
  }
  .cell-title {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 20px;
  }
  .cell-icon {
    width: 16px;
    height: 16px;
    margin-right: 9px;
  }

  .gap {
    height: 10px;
  }

  .btn {
    display: flex;
    margin-top: 50px;
    justify-content: center;
  }

  .btn .logout {
    width: 100%;
    color: #333;
    font-size: 15px;
    font-weight: 400;
    border-radius: 2px;
    margin: 10px 46px;
    background-color: #fff;
  }
</style>
