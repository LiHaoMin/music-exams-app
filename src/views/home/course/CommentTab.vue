<template>
  <div class="comment-tab">
    <div class="comment">
      <div class="subtitle">
        <h3>课程评价</h3>
        <div>
          <span>{{courseRate.toFixed(1)}}</span>
          <van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" disabled v-model="courseRate" />
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
              <img v-lazy="item.headPortrait ? item.headPortrait : require('@/assets/avatar.jpg')" />
            </div>
            <div class="right-warp">
              <div class="info">
                <span class="nickname">{{item.name}}</span>
                <span class="date">{{item.gmtCreate | datafmt('YYYY-MM-DD')}}</span>
              </div>
              <div class="rate"><van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" disabled v-model="item.fraction" /></div>
              <div class="description">{{item.content}}</div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <div class="btn">
      <van-button class="publish" @click="openDialog" type="default">发布评价</van-button>
    </div>
    <van-dialog v-model="showDialog" getContainer="#app" show-cancel-button :beforeClose="saveComment">
      <div class="dialog-title" slot="title">评价</div>
      <div class="dialog-content">
        <van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" void-color="#FFBC49" v-model="comment.fraction" />
        <van-field type="textarea" v-model="comment.content" placeholder="请输入您的评价…" />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Rate, List, Button, Field, Toast } from 'vant'

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
      showDialog: false,
      page: 1,
      size: 10,
      courseRate: 0,
      comment: {}
    }
  },
  created () {
    this.requestCourseRate()
  },
  methods: {
    onLoad () {
      const data = { num: this.page, size: this.size, curriculumId: this.$route.params.id }
      this.$http.get('/home-page/evaluate_list', { params: data }).then((res) => {
        this.loading = false
        if (res.code !== 200) {
          this.error = true
          return
        }
        if (this.page === 1) {
          this.list = res.data.records
        } else {
          this.list = this.list.concat(res.data.records)
        }
        if (this.page === res.data.pages || res.data.records.length === 0) {
          this.finished = true
        }
        this.page += 1
      })
    },
    requestCourseRate () {
      this.$http.get('/home-page/score', { isShowLoading: true, params: { curriculumId: this.$route.params.id } }).then((res) => {
        if (res && res.data) {
          this.courseRate = res.data.fraction
        }
      })
    },
    openDialog () {
      this.showDialog = true
      this.comment = {}
    },
    saveComment (action, done) {
      if (action === 'confirm') {
        if (!this.comment.fraction || !this.comment.content) {
          Toast('请先填写信息')
          done(false)
          return
        }
        this.comment.curriculumId = this.$route.params.id
        this.$http.post('/home-page/comment', this.comment, { isShowLoading: true }).then((res) => {
          if (res && res.data) {
            Toast.success('操作成功')
            this.page = 1
            this.list = []
            this.loading = true
            this.onLoad()
          } else {
            Toast.fail('操作失败')
          }
        })
      }
      done()
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
    font-weight: normal;
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
    font-weight: normal;
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
    font-weight: normal;
    color: #333;
  }
  .comment-item .info .date {
    font-size: 11px;
    font-weight: normal;
    color: #979797;
    line-height: 17px;
  }
  .comment-item .description {
    font-size: 11px;
    font-weight: normal;
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
    font-weight: normal;
    border-radius: 5px;
    margin: 10px 15px;
    background-color: #1E4058;
  }

  .dialog-title {
    font-size: 14px;
    font-weight: normal;
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
