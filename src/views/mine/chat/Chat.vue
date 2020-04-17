<template>
  <div class="chat">
    <NavBar />
    <div  class="container">
      <div class="chat-list">
        <template v-for="(item, index) in messages">
          <div class="message left" :key="index" v-if="item.type !== 1">
            <div class="icon">
              <img v-lazy="item.avatar ? item.avatar : require('@/assets/avatar.jpg')" />
            </div>
            <div class="text">{{item.message}}</div>
          </div>
          <div class="message right" :key="index" v-else>
            <div class="text">{{item.message}}</div>
            <div class="icon">
              <img v-lazy="item.avatar ? item.avatar : require('@/assets/avatar.jpg')" />
            </div>
          </div>
        </template>
      </div>
      <div class="action">
        <div class="switch" @click="switchType">
          <img :src="require('@/assets/images/mine/contact.png')" />
          <span>{{typeFlag ? '转人工' : '转机器'}}</span>
        </div>
        <div class="send">
          <form action="/" @submit.prevent="send">
            <van-field class="send-field" v-model="message" placeholder="请输入…" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar/NavBar'
import { mapState } from 'vuex'
import { Field } from 'vant'

export default {
  name: 'Chat',
  components: {
    NavBar,
    [Field.name]: Field
  },
  data () {
    return {
      messages: [],
      message: '',
      // true: 机器人 false:客服
      typeFlag: true
    }
  },
  computed: mapState(['userInfo']),
  created () {
    this.welcome()
  },
  methods: {
    // 发送
    send () {
      if (this.typeFlag) this.robotAnswer()
      else this.questions()
      this.messages.push({
        id: 1,
        avatar: this.userInfo.headPortrait,
        message: this.message,
        type: 1
      })
      this.message = ''
      return true
    },
    // 转人工/客服切换
    switchType () {
      this.typeFlag = !this.typeFlag
      this.messages = []
      if (this.typeFlag) this.welcome()
      else this.answer()
    },
    welcome () {
      this.$http.get('/user-info/welcome', { params: { problem: this.message } }).then((res) => {
        if (res && res.msg) {
          this.messages.push({
            id: null,
            avatar: null,
            message: res.msg
          })
        }
      })
    },
    robotAnswer () {
      this.$http.get('/user-info/get_robot_answer_list', { params: { problem: this.message } }).then((res) => {
        if (res.data && res.data.length > 0) {
          this.messages.push({
            id: null,
            avatar: null,
            message: res.data[0].answer
          })
        }
      })
    },
    answer () {
      this.$http.get('/user-info/get_answer', { isShowLoading: true, params: { problem: this.message } }).then((res) => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((item) => {
            this.messages.push({
              id: item.id,
              avatar: item.headPortrait,
              message: item.problem,
              type: item.type
            })
          })
        }
      })
    },
    questions () {
      this.$http.get('/user-info/put_questions_to', { params: { problem: this.message } }).then((res) => {
      })
    }
  }
}
</script>

<style scoped>
  .chat {
    height: 100%;
    background-color: #F8F8F8;
  }

  .container {
    display: flex;
    height: calc(100vh - 46px);
    flex-direction: column;
  }

  .chat-list {
    padding: 20px 15px;
    flex: 1;
    overflow: scroll;
  }
  .message {
    display: flex;
    margin-bottom: 24px;
    align-items: center;
  }
  .message .icon {
    width: 40px;
    height: 40px;
  }
  .message .icon img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  .message .text {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    max-width: 220px;
  }
  .message.left {
    justify-content: flex-start;
  }
  .message.left .text  {
    color: #333;
    background-color: #fff;
    margin-left: 10px;
    border-radius: 0 12px 12px 12px;
    padding: 9px 10px 5px 10px;
  }
  .message.right {
    justify-content: flex-end;
  }
  .message.right .text  {
    color: #fff;
    background-color: #1E4058;
    margin-right: 10px;
    border-radius:12px 0 12px 12px;
    padding: 9px 10px 5px 10px;
  }

  .action {
    display: flex;
    background-color: #fff;
    padding: 12px 32px;
  }

  .action .switch {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .action .switch img {
    width: 17px;
    height: 17px;
    object-fit: cover;
    object-position: center;
  }
  .action .switch span {
    font-size: 12px;
    font-weight: 400;
    color: #1E4058;
    line-height: 17px;
    margin-top: 3px;
  }
  .action .send {
    flex: 1;
    margin-left: 10px;
    font-size: 11px;
  }

  .send-field {
    background: #F5F5F5;
    border-radius: 10px;
    padding: 5px 10px;
  }
</style>
