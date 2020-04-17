<template>
  <div class="help">
    <NavBar />
    <div class="content">
      <div class="title">帮助手册</div>
      <div class="text">
        <p>{{helpText.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar/NavBar'

export default {
  name: 'Help',
  components: {
    NavBar
  },
  data () {
    return {
      helpText: {}
    }
  },
  created () {
    this.requestHelp()
  },
  methods: {
    requestHelp () {
      this.$http.get('/user-info/get_help', { isShowLoading: true }).then((res) => {
        if (res.data && res.data.length > 0) {
          this.helpText = res.data[0]
        }
      })
    }
  }
}
</script>

<style scoped>
  .help {
    height: 100vh;
    background-color: #F8F8F8;
  }
  .content {
    padding: 20px 16px;
  }
  .content .title {
    font-size: 15px;
    font-weight: bold;
    color: #333;
    line-height: 21px;
    text-align: center;
  }
  .content .text {
    font-size: 14px;
    font-weight: normal;
    color: #333;
    line-height: 20px;
    text-indent: 12px;
  }
  .content .text p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
