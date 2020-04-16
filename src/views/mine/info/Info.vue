<template>
  <div class="info">
    <NavBar />
    <van-cell-group>
      <van-cell title-class="cell-title" center is-link title="昵称" v-model="userInfo.name" @click="openNickname" />
      <van-cell style="display: none" title-class="cell-title" center is-link title="性别" v-model="gender" @click="showGender = true" />
      <van-cell title-class="cell-title" center is-link title="更换头像" @click="$refs.uploader.chooseFile()">
        <van-image
          class="cell-icon"
          width="0.66667rem"
          height="0.66667rem"
          lazy-load
          round
          fit="cover"
          :src="userInfo.headPortrait" />
      </van-cell>
    </van-cell-group>
    <div class="btn" style="display: none">
      <van-button class="edit" type="default">确认修改</van-button>
    </div>
    <van-action-sheet v-model="showGender" title="选择性别" close-icon close-on-click-action :round="false" :actions="genderList" @select="selectGender" />
    <van-uploader ref="uploader" accept="image/png,image/jpeg" :max-count="1" :after-read="afterRead">
      <div></div>
    </van-uploader>
  </div>
</template>

<script>
import { Cell, CellGroup, ActionSheet, Uploader, Image, Button, Toast } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import { mapMutations, mapState } from 'vuex'

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
      gender: '男',
      qiniu: {}
    }
  },
  computed: mapState(['userInfo']),
  created () {
    this.requestQiniu()
  },
  methods: {
    ...mapMutations(['setUserInfo']),
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
    },
    requestQiniu () {
      this.$http.get('/user-info/qiniu').then((res) => {
        if (res && res.data) {
          this.qiniu = res.data
        }
      })
    },
    afterRead (file) {
      const config = {
        isShowLoading: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: false
      }
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('token', this.qiniu.token)
      this.$http.post('http://up.qiniu.com', formData, config).then((res) => {
        if (res && res.key) {
          this.edit('http://q8ieryh01.bkt.clouddn.com/' + res.key)
        } else {
          Toast.fail('操作失败')
        }
      })
    },
    edit (head) {
      this.$http.post('/user-info/update_User', { headPortrait: head }, { isShowLoading: true }).then((res) => {
        if (res && res.data) {
          Toast.success('操作成功')
          this.setUserInfo({
            headPortrait: head
          })
        } else {
          Toast.fail('操作失败')
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
