<template>
  <div class="chat">
    <NavBar />
    <div  class="container">
      <div class="chat-list">
        <template v-for="(item, index) in messages">
          <div class="message left" :key="index" v-if="!item.id">
            <div class="icon">
              <img v-lazy="item.avatar" />
            </div>
            <div class="text">{{item.message}}</div>
          </div>
          <div class="message right" :key="index" v-if="item.id">
            <div class="text">{{item.message}}</div>
            <div class="icon">
              <img v-lazy="item.avatar" />
            </div>
          </div>
        </template>
      </div>
      <div class="action">
        <div class="switch" @click="switchType">
          <img :src="require('@/assets/images/mine/contact.png')" />
          <span>转人工</span>
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
import { Field } from 'vant'

export default {
  name: 'Chat',
  components: {
    NavBar,
    [Field.name]: Field
  },
  data () {
    return {
      messages: [
        {
          id: null,
          avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          message: '您好，有什么可以帮助您？'
        }
      ],
      message: ''
    }
  },
  methods: {
    // 发送
    send () {
      this.messages.push({
        id: 1,
        avatar: 'https://i.loli.net/2020/04/03/WLFcBrZd4MtCjIX.jpg',
        message: this.message
      })
      this.message = ''
      return true
    },
    // 转人工/客服切换
    switchType () {
      this.messages.push({
        id: null,
        avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
        message: '您好，有什么可以帮助您？'
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
