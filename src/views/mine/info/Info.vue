<template>
  <div class="info">
    <NavBar />
    <van-cell-group>
      <van-cell title-class="cell-title" center is-link title="昵称" v-model="nickName" @click="openNickname" />
      <van-cell title-class="cell-title" center is-link title="性别" v-model="gender" @click="showGender = true" />
      <van-cell title-class="cell-title" center is-link title="更换头像" @click="$refs.uploader.chooseFile()">
        <van-image
          class="cell-icon"
          width="0.66667rem"
          height="0.66667rem"
          lazy-load
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      </van-cell>
    </van-cell-group>
    <div class="btn">
      <van-button class="edit" type="default">确认修改</van-button>
    </div>
    <van-action-sheet v-model="showGender" title="选择性别" close-icon close-on-click-action :round="false" :actions="genderList" @select="selectGender" />
    <van-uploader ref="uploader">
      <div></div>
    </van-uploader>
  </div>
</template>

<script>
import { Cell, CellGroup, ActionSheet, Uploader, Image, Button } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'

export default {
  name: 'Info',
  components: {
    NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [Uploader.name]: Uploader,
    [Image.name]: Image,
    [Button.name]: Button
  },
  data () {
    return {
      showGender: false,
      genderList: [
        { name: '男', color: '#DB6073' },
        { name: '女', color: '#333' }
      ],
      nickName: '张无忌',
      gender: '男'
    }
  },
  methods: {
    // 修改昵称
    openNickname () {
      this.$router.push({ name: 'InfoEdit', params: { nickName: this.nickName } })
    },
    // 性别选择
    selectGender (item) {
      this.gender = item.name
      this.genderList.forEach((el) => {
        if (item === el) {
          item.color = '#DB6073'
        } else {
          el.color = '#333'
        }
      })
    }
  }
}
</script>

<style scoped>
  .info {
    height: 100vh;
    background-color: #F8F8F8;
  }

  .cell-title {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 20px;
  }

  .cell-icon {
    padding-top: 5px;
  }

  .btn {
    display: flex;
    margin-bottom: 80px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .btn .edit {
    width: 100%;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    border-radius: 2px;
    margin: 10px 46px;
    background-color: #1E4058;
  }
</style>
