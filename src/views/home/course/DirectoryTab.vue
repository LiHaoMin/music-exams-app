<template>
  <div class="directory-tab">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      @load="onLoad">
      <div class="directory-item" :class="{'active': index % 2 === 0}" :key="index" v-for="(item, index) in list">
        <div class="no">{{index + 1}}</div>
        <div class="content">
          <div class="info">
            <span class="title">西方音乐史{{index + 1}}</span>
            <span class="status">已学完</span>
          </div>
          <div class="time">时长：30分钟</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { List } from 'vant'

export default {
  name: 'DirectoryTab',
  components: {
    [List.name]: List
  },
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      isSearched: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        this.finished = true
      }, 1000)
    }
  }
}
</script>

<style scoped>
  .directory-tab {
    height: 100%;
    background-color: #fff;
    padding: 21px 25px;
  }

  .directory-item {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #F5F5F5;
    padding-top: 9px;
    padding-bottom: 9px;
  }

  .directory-item .no {
    background-color: #1E4058;
    padding: 2px 10px;
    border-radius: 8px;
    color: #FFF;
    font-size: 12px;
    font-weight: 500;
    margin-right: 12px;
  }
  .directory-item .content {
    width: 100%;
  }
  .directory-item .info {
    display: flex;
    justify-content: space-between;
  }
  .directory-item .info .title {
    font-size: 14px;
    color: #333;
  }
  .directory-item .info .status {
    font-size: 12px;
    font-weight: 400;
    color: #1E4058;
  }
  .directory-item .time {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    margin-top: 5px;
  }
  .directory-item.active .no {
    background-color: #ccc;
  }
  .directory-item.active .info .status {
    color: #888;
  }
</style>
