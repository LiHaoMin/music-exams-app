<template>
  <div class="directory-tab">
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      @load="onLoad">
      <div class="directory-item" @click="$emit('play', item, index)" :class="{'active': item.learningTime >= item.time}" :key="index" v-for="(item, index) in list">
        <div class="no">{{index + 1}}</div>
        <div class="content">
          <div class="info">
            <span class="title">{{item.videoName}}</span>
            <span class="status">{{item | status}}</span>
          </div>
          <div class="time">时长：{{item.time ? Math.round(item.time / 60) : 0}}分钟</div>
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
  filters: {
    status (data) {
      if (data.learningTime) {
        return data.learningTime >= data.time ? '已学完' : `已学${Math.round(data.learningTime / 60)}分钟`
      }
      return '未学习'
    }
  },
  methods: {
    onLoad () {
      this.$http.get('/home-page/get_chapter_list', { params: { CurriculumId: this.$route.params.id } }).then((res) => {
        if (res && res.data) {
          this.list = res.data
          this.loading = false
          this.finished = true
        } else {
          this.error = true
        }
      })
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
    font-weight: bold;
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
    font-weight: normal;
    color: #1E4058;
  }
  .directory-item .time {
    font-size: 12px;
    font-weight: normal;
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
