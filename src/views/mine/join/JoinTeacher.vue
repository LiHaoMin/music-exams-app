<template>
  <div class="join-teacher">
    <NavBar />
    <div class="form">
      <van-cell-group>
        <van-field label-class="my-label required" label="真实姓名" placeholder="请输入" input-align="right" />
        <van-field label-class="my-label required" label="手机号码" placeholder="请输入" input-align="right" />
        <van-field label-class="my-label" label="邮箱" placeholder="请输入" input-align="right" />
      </van-cell-group>
      <div class="gap"></div>
      <van-cell-group>
        <van-cell title-class="my-label required" title="上传身份证照片">
          <div class="id-card-cell" slot="label">
            <van-uploader>
              <div class="id-card">
                <img :src="require('@/assets/images/mine/plus.png')" />
                <p>上传正面照</p>
              </div>
            </van-uploader>
            <van-uploader>
              <div class="id-card">
                <img :src="require('@/assets/images/mine/plus.png')" />
                <p>上传正面照</p>
              </div>
            </van-uploader>
          </div>
        </van-cell>
      </van-cell-group>
      <div class="gap"></div>
      <van-cell-group>
        <van-cell title-class="my-label" title="上传各类证书">
          <div class="certificate-cell" slot="label">
            <van-uploader v-model="certificates" :after-read="afterRead">
              <div class="certificate"></div>
            </van-uploader>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="btn">
      <van-button class="edit" type="default">成为讲师</van-button>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Field, Button, Uploader } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'

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
      certificates: []
    }
  },
  methods: {
    afterRead (file) {
      console.log(file)
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
    font-weight: 400;
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
    font-weight: 400;
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
  .join-teacher >>> .required span:before {
    position: absolute;
    color: #ee0a24;
    right: -10px;
    font-size: 14px;
    content: '*';
  }
</style>
