<template>
  <div class="comment-tab">
    <div class="comment">
      <div class="subtitle">
        <h3>课程评价</h3>
        <div>
          <span>5.0</span>
          <van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" disabled v-model="value" />
        </div>
      </div>
      <div class="content">
        <van-list
          v-model="loading"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          :finished="finished"
          @load="onLoad">
          <div class="comment-item" :key="index" v-for="(item, index) in list">
            <div class="circle">
              <img v-lazy="'https://i.loli.net/2020/04/03/WLFcBrZd4MtCjIX.jpg'" />
            </div>
            <div class="right-warp">
              <div class="info">
                <span class="nickname">chjshdjs </span>
                <span class="date">2019-09-21</span>
              </div>
              <div class="rate"><van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" disabled v-model="value" /></div>
              <div class="description van-multi-ellipsis--l2">太棒了太棒了太棒了太棒了太棒了太棒了太棒了吧
                我的天呐</div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <div class="btn">
      <van-button class="publish" @click="showDialog = true" type="default">发布评价</van-button>
    </div>
    <van-dialog v-model="showDialog" getContainer="#app" show-cancel-button>
      <div class="dialog-title" slot="title">评价</div>
      <div class="dialog-content">
        <van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" v-model="value" />
        <van-field type="textarea" placeholder="请输入您的评价…" />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Rate, List, Button, Field } from 'vant'

export default {
  name: 'CommentTab',
  components: {
    [Rate.name]: Rate,
    [List.name]: List,
    [Button.name]: Button,
    [Field.name]: Field
  },
  data () {
    return {
      value: 4,
      list: [],
      loading: false,
      error: false,
      finished: false,
      isSearched: false,
      showDialog: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          this.list.push(this.list.length + 1)
        }

        this.finished = true
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .comment-tab {
    height: 100%;
    background-color: #fff;
    padding-left: 15px;
    padding-right: 15px;
  }

  .comment {
    padding-right: 9px;
  }
  .comment .subtitle h3 {
    color: #333;
    font-size: 15px;
    font-weight: 400;
    display: inline-block;
    margin-left: 10px;
  }
  .subtitle div {
    line-height: 0;
    margin-bottom: 10px;
  }
  .comment .subtitle span {
    color: #FFBC49;
    font-size: 14px;
    font-weight: 400;
    margin-left: 10px;
    margin-right: 11px;
  }
  .comment-item {
    display: flex;
  }
  .comment-item .circle img {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  .comment-item .right-warp {
    margin-left: 10px;
    margin-bottom: 9px;
    padding-bottom: 9px;
    border-bottom: 1px solid #F5F5F5;
    line-height: 17px;
  }
  .comment-item .info {
    display: flex;
    justify-content: space-between;
  }
  .comment-item .info .nickname {
    font-size: 12px;
    font-weight: 400;
    color: #333;
  }
  .comment-item .info .date {
    font-size: 11px;
    font-weight: 400;
    color: #979797;
    line-height: 17px;
  }
  .comment-item .description {
    font-size: 11px;
    font-weight: 400;
    color: #585858;
    line-height: 16px;
    margin-top: 5px;
  }

  .btn {
    display: flex;
    margin-top: 40px;
    margin-bottom: 50px;
  }
  .btn .publish {
    width: 100%;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    border-radius: 5px;
    margin: 10px 15px;
    background-color: #1E4058;
  }

  .dialog-title {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 20px;
    background-color: #F5F5F5;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .dialog-content {
    padding: 22px 17px;
  }

  .dialog-content >>> .van-cell {
    padding: 0;
    margin-top: 10px;
  }

  .van-dialog >>> .van-dialog__header {
    padding: 0 !important;
  }
</style>
