<template>
  <div class="purchase-history">
    <NavBar />
    <div class="list-warp" v-if="list.length > 0">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div class="list-item" :key="item.id" v-for="item in list">
          <div class="thumb">
            <img v-lazy="item.curriculumImg" />
          </div>
          <div class="content">
            <p class="title van-ellipsis">{{item.curriculumName}}</p>
            <p class="time">购买时间：{{item.gmtCreate | datafmt('YYYY-MM-DD HH:mm')}}</p>
            <p class="price" v-if="item.freeAdmission">课程价格：<span>免费</span></p>
            <p class="price" v-else>课程价格：<span>¥{{item.money}}</span></p>
          </div>
        </div>
      </van-list>
    </div>
    <div class="list-empty" v-else>
      <img :src="require('@/assets/images/mine/empty.png')" />
      <p>您还没有购买过课程，快去获取课程吧～</p>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar/NavBar'
import { List } from 'vant'

export default {
  name: 'PurchaseHistory',
  components: {
    NavBar,
    [List.name]: List
  },
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      isSearched: false,
      page: 1,
      size: 10
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    onLoad () {
      this.$http.get('/user-info/get_bill_list', { isShowLoading: true, params: { num: this.page, size: this.size } }).then((res) => {
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
    }
  }
}
</script>

<style scoped>
  .purchase-history {
    height: 100vh;
    background-color: #F8F8F8;
  }

  .list-warp {
    padding: 10px 15px 50px 15px;
  }

  .list-item {
    display: flex;
    background-color: #FFF;
    box-shadow: 0 2px 4px 0 rgba(234,234,234,0.5);
    border-radius:10px;
    padding: 9px 8px;
    margin-bottom: 10px;
  }

  .list-item .thumb {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
  .list-item .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .list-item .content {
    font-size: 11px;
  }
  .list-item .content p {
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .list-item .title {
    width: 220px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    line-height: 20px;
  }
  .list-item .time {
    font-size: 12px;
    font-weight: normal;
    color: #888;
    line-height: 17px;
  }
  .list-item .price {
    font-size: 12px;
    font-weight: normal;
    color: #333;
    line-height: 17px;
  }
  .list-item .price span {
    font-weight: bold;
    color: #DB6073;
  }

  .list-empty {
    width: 100%;
    height: 80%;
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
</style>
