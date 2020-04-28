<template>
  <div class="unlearned-tab">
    <div class="list-warp" v-if="list.length > 0">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div class="card-item-warp" :key="item.id" v-for="item in list" @click="courseItem(item)">
          <div class="tag">优选</div>
          <div class="thumb">
            <img v-lazy="item.curriculumImg" />
          </div>
          <div class="content">
            <p class="title van-ellipsis">{{item.curriculumName}}</p>
            <p class="teacher">讲师：{{item.teacherName}}</p>
            <div class="status">已学习{{item.alreadyStudiedNum}}课时</div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="list-empty" v-else>
      <img :src="require('@/assets/images/learn/empty.png')" />
      <p>这里空空如也～</p>
    </div>
  </div>
</template>

<script>
import { List } from 'vant'

// TODO 学习时长/推荐
export default {
  name: 'UnlearnedTab',
  components: {
    [List.name]: List
  },
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      page: 1,
      size: 10
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      this.$http.get('/home-page/get_my_studied_list', { params: { num: this.page, size: this.size, judge: false } }).then((res) => {
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
    courseItem (item) {
      this.$router.push('/course/detail/' + item.id)
    }
  }
}
</script>

<style scoped>
  .unlearned-tab {
    min-height: 100vh;
    background-color: #F8F8F8;
  }

  .list-warp {
    padding: 10px 15px 50px 15px;
  }

  .list-empty {
    width: 100%;
    height: 80vh;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .list-empty p {
    font-size: 14px;
    font-weight: normal;
    color: #888;
    line-height: 20px;
  }
  .card-item-warp {
    height: 126px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(234,234,234,0.5);
    border-radius:10px;
    padding: 8px 8px 0 8px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
  }
  .card-item-warp .thumb {
    width: 110px;
    height: 110px;
  }
  .card-item-warp .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .card-item-warp .content {
    margin-left: 21px;
    flex: 1;
    position: relative;
  }
  .card-item-warp .content p {
    margin: 0;
  }
  .card-item-warp .content .title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-top: 10px;
    /*display: inline-block;*/
    width: 160px;
  }
  .card-item-warp .content .description {
    font-size: 12px;
    font-weight: normal;
    color: #333;
    margin-top: 6px;
    /*display: inline-block;*/
    width: 160px;
  }
  .card-item-warp .content .teacher {
    font-size: 12px;
    font-weight: normal;
    color: #888;
    margin-top: 17px;
  }
  .card-item-warp .content .play {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
  .card-item-warp .content .play img {
    width: 11px;
    height: 11px;
  }
  .card-item-warp .content .play span {
    font-size: 12px;
    font-weight: normal;
    color: #888;
    margin-left: 3px;
  }
  .card-item-warp .content .price {
    position: absolute;
    top: 85px;
    right: 10px;
  }
  .card-item-warp .content .price label {
    font-size: 14px;
    font-weight: normal;
    color: #DB6073;
  }
  .card-item-warp .content .price span {
    font-size: 20px;
    font-weight:500;
    color: #DB6073;
  }

  .rate {
    position: absolute;
    top: 0;
    right: 15px;
  }

  .card-item-warp .tag {
    width: 38px;
    height: 23px;
    color: #fff;
    font-size: 12px;
    font-weight: normal;
    text-align: center;
    line-height: 23px;
    background-image: url("~@/assets/images/home/list-tag.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    right: 0;
    top: 0;
  }

  .card-item-warp .content .status {
    position: absolute;
    bottom: 20px;
    right: 10px;
  }
  .card-item-warp .content .status {
    font-size: 12px;
    font-weight:500;
    color: #FFBC49;
    line-height: 17px;
  }
  .card-item-warp .content .active {
    color: #888;
  }
</style>
