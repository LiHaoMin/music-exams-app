<template>
  <div class="join-teacher">
    <NavBar />
    <div class="form">
      <van-cell-group>
        <van-field label-class="my-label required" label="真实姓名" placeholder="请输入" input-align="right" v-model="info.name" />
        <van-field label-class="my-label required" label="手机号码" placeholder="请输入" input-align="right" v-model="info.telephone"/>
        <van-field style="display: none" label-class="my-label" label="邮箱" placeholder="请输入" input-align="right" />
      </van-cell-group>
      <div class="gap"></div>
      <van-cell-group>
        <van-cell title-class="my-label required" title="上传身份证照片">
          <div class="id-card-cell" slot="label">
            <van-uploader v-model="identityImgZ" :after-read="afterRead1" accept="image/png,image/jpeg" :max-count="1">
              <div class="id-card">
                <img :src="require('@/assets/images/mine/plus.png')" />
                <p>上传正面照</p>
              </div>
            </van-uploader>
            <van-uploader v-model="identityImgF" :after-read="afterRead2" accept="image/png,image/jpeg" :max-count="1">
              <div class="id-card">
                <img :src="require('@/assets/images/mine/plus.png')" />
                <p>上传反面照</p>
              </div>
            </van-uploader>
          </div>
        </van-cell>
      </van-cell-group>
      <div class="gap"></div>
      <van-cell-group>
        <van-cell title-class="my-label" title="上传各类证书">
          <div class="certificate-cell" slot="label">
            <van-uploader v-model="certificates" :after-read="afterRead3">
              <div class="certificate"></div>
            </van-uploader>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button class="edit" type="default" @click="save">成为讲师</van-button>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Field, Button, Uploader, Toast } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'
import { QI_NIU } from '@/utils/global'

export default {
  name: 'join-teacher',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    NavBar
  },
  data () {
    return {
      identityImgZ: [],
      identityImgF: [],
      certificates: [],
      qiniu: {},
      info: {}
    }
  },
  computed: {
    certificatesUrl () {
      let urls = ''
      this.certificates.forEach((item) => {
        urls += ',' + item.url
      })
      return urls.substring(1)
    }
  },
  created () {
    this.requestQiniu()
  },
  methods: {
    save () {
      if (!this.info.name || !this.info.telephone) {
        Toast('请填写必须项')
        return
      }
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.info.telephone)) {
        Toast('请输入正确的手机号')
        return
      }
      if (!this.info.identityImgZ || !this.info.identityImgF) {
        Toast('请填写必须项')
        return
      }
      this.info.certificate = this.certificatesUrl
      this.$http.post('/user-info/becoming_a_teacher', this.info, { isShowLoading: true }).then((res) => {
        if (res && res.data) {
          Toast.success('操作成功')
        } else {
          Toast.fail(res.msg || '操作失败')
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
    afterRead1 (file, detail) {
      this.identityImgZ[detail.index].status = 'uploading'
      this.identityImgZ[detail.index].message = '上传中...'
      this.upload(file, detail, 1)
    },
    afterRead2 (file, detail) {
      this.identityImgF[detail.index].status = 'uploading'
      this.identityImgF[detail.index].message = '上传中...'
      this.upload(file, detail, 2)
    },
    afterRead3 (file, detail) {
      this.certificates[detail.index].status = 'uploading'
      this.certificates[detail.index].message = '上传中...'
      this.upload(file, detail, 3)
    },
    upload (file, detail, t) {
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
          const imgUrl = QI_NIU + res.key
          if (t === 1) {
            this.info.identityImgZ = imgUrl
            this.identityImgZ[detail.index].url = imgUrl
            this.identityImgZ[detail.index].status = 'done'
            this.identityImgZ[detail.index].message = ''
          }
          if (t === 2) {
            this.info.identityImgF = imgUrl
            this.identityImgF[detail.index].url = imgUrl
            this.identityImgF[detail.index].status = 'done'
            this.identityImgF[detail.index].message = ''
          }
          if (t === 3) {
            this.certificates[detail.index].url = imgUrl
            this.certificates[detail.index].status = 'done'
            this.certificates[detail.index].message = ''
          }
        } else {
          if (t === 1) {
            this.identityImgZ[detail.index].status = 'failed'
            this.identityImgZ[detail.index].message = '上传失败'
          }
          if (t === 2) {
            this.identityImgF[detail.index].status = 'failed'
            this.identityImgF[detail.index].message = '上传失败'
          }
          if (t === 3) {
            this.certificates[detail.index].status = 'failed'
            this.certificates[detail.index].message = '上传失败'
          }
        }
      })
    }
  }
}
</script>

<style scoped>
  .join-teacher {
    height: 100vh;
    background-color: #F8F8F8;
  }

  .gap {
    height: 10px;
  }

  .id-card-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .id-card {
    width: 258px;
    height: 134px;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .id-card span {
    font-size: 12px;
    font-weight: normal;
    color: #888;
    line-height: 17px;
  }

  .certificate {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    background-image: url("~@/assets/images/mine/certificate.png");
  }

  .btn {
    display: flex;
    margin-top: 39px;
    margin-bottom: 39px;
  }

  .btn .edit {
    width: 100%;
    color: #fff;
    font-size: 15px;
    font-weight: normal;
    border-radius: 2px;
    margin: 10px 46px;
    background-color: #1E4058;
  }

  .join-teacher >>> .my-label {
    color: #333;
    font-size: 14px;
  }
  .join-teacher >>> .my-label span {
    position: relative;
  }
  .join-teacher >>> .required > span:before {
    position: absolute;
    color: #ee0a24;
    right: -10px;
    font-size: 14px;
    content: '*';
  }
</style>
