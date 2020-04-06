<template>
  <div class="purchase-history">
    <NavBar />
    <div class="list-warp" v-if="!isEmpty">
      <div class="list-item" :key="index" v-for="(item, index) in [1, 1, 1, 1]">
        <div class="thumb">
          <img v-lazy="'https://i.loli.net/2020/04/03/WLFcBrZd4MtCjIX.jpg'" />
        </div>
        <div class="content">
          <p class="title van-ellipsis">西方音乐史</p>
          <p class="time">购买时间：2019.12.07  19:00</p>
          <p class="price">课程价格：<span>¥100.00</span></p>
        </div>
      </div>
    </div>
    <div class="list-empty" v-if="isEmpty">
      <img :src="require('@/assets/images/mine/empty.png')" />
      <p>您还没有购买过课程，快去获取课程吧～</p>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar/NavBar'

export default {
  name: 'PurchaseHistory',
  components: {
    NavBar
  },
  data () {
    return {
      isEmpty: false
    }
  },
  methods: {
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
    font-weight: 500;
    color: #333;
    line-height: 20px;
  }
  .list-item .time {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    line-height: 17px;
  }
  .list-item .price {
    font-size: 12px;
    font-weight: 400;
    color: #333;
    line-height: 17px;
  }
  .list-item .price span {
    font-weight: 500;
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
    font-weight: 400;
    color: #888;
    line-height: 20px;
  }
</style>
