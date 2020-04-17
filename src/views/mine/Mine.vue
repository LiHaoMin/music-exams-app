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
          :src="userInfo.headPortrait ? userInfo.headPortrait : require('@/assets/avatar.jpg')"
        />
        <img style="display: none" class="gender" :src="require('@/assets/images/mine/male.png')" />
      </div>
      <div class="info">
        <div class="nickname">{{ userInfo.name }}</div>
        <div class="tag" v-if="userInfo.userType === 3">音乐高级讲师</div>
      </div>
      <div class="vip">
        <img :src="require('@/assets/images/mine/vip.png')" />
        <span>会员</span>
      </div>
    </div>
    <div class="cell-warp">
      <van-cell-group>
        <van-cell center title-class="cell-title" title="购买记录" is-link to="/mine/purchase-history">
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/mine/icon1.png')" />
        </van-cell>
        <van-cell center title-class="cell-title" title="个人信息" is-link to="/mine/info">
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/mine/icon2.png')" />
        </van-cell>
        <van-cell center title-class="cell-title" title="联系客服" is-link to="/mine/chat">
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/mine/icon3.png')" />
        </van-cell>
        <van-cell center title-class="cell-title" title="帮助手册" is-link to="/mine/help">
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/mine/icon4.png')" />
        </van-cell>
      </van-cell-group>
      <div class="gap"></div>
      <van-cell-group>
        <van-cell v-if="!user.mLecturer" center title-class="cell-title" title="成为讲师" is-link to="/mine/join/teacher">
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/mine/icon5.png')" />
        </van-cell>
        <van-cell v-else center title-class="cell-title" title="讲师功能" is-link to="/mine/join/func">
          <img class="cell-icon" slot="icon" :src="require('@/assets/images/mine/icon6.png')" />
        </van-cell>
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button class="logout" type="default" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Button, Image } from 'vant'
import { mapState, mapMutations } from 'vuex'
import { removeLocalStore } from '@/utils/global'
// TODO 讲师尊称
export default {
  name: 'Mine',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Image.name]: Image
  },
  created () {
    this.requestUserInfo()
  },
  data () {
    return {
      user: {}
    }
  },
  computed: mapState(['userInfo']),
  methods: {
    ...mapMutations(['setUserInfo']),
    logout () {
      removeLocalStore('user_info')
      this.$router.replace({ name: 'Login' })
    },
    requestUserInfo () {
      this.$http.get('/user-info/user_content', { isShowLoading: true }).then((res) => {
        this.user = res.data
        this.setUserInfo({
          userId: res.data.mUserInfo.id,
          headPortrait: res.data.mUserInfo.headPortrait,
          name: res.data.mUserInfo.name,
          account: res.data.mUserInfo.account,
          telephone: res.data.mUserInfo.telephone,
          userType: res.data.mUserInfo.userType
        })
      })
    }
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
    background-image: url("~@/assets/images/mine/mine-bg.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
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
    width: 20px;
    height: 20px;
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
    margin-bottom: 80px;
    position: absolute;
    width: 100%;
    bottom: 0;
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
