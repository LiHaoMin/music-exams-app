<template>
  <div class="card-item-warp" @click="onItemClick">
    <div class="tag" v-if="isPageType === 2">优选</div>
    <div class="thumb">
      <img v-lazy="'https://i.loli.net/2020/04/03/WLFcBrZd4MtCjIX.jpg'" />
    </div>
    <div class="content">
      <p class="title van-ellipsis">23天高能专业培训</p>
      <p class="description van-ellipsis">帮你吃透专业，轻松上岸</p>
      <p class="teacher">讲师：李丽</p>
      <div class="play" v-if="isPageType !== 2">
        <img :src="require('@/assets/images/home/play.png')" />
        <span>88888</span>
      </div>
      <div class="price" v-if="isPageType !== 2"><label>¥</label><span>100</span></div>
      <div class="status active" v-if="isPageType === 2">已学习</div>
    </div>
    <div class="rate" @click.stop="onRateClick" v-if="isPageType === 1">
      <van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" readonly :count="1"  void-color="#FFBC49" value="1" />
    </div>
  </div>
</template>

<script>
import { Rate } from 'vant'

export default {
  props: {
    // 0：默认 1：收藏课程 2：我的学习
    isPageType: Number
  },
  components: {
    [Rate.name]: Rate
  },
  data () {
    return {
    }
  },
  methods: {
    onItemClick () {
      this.$emit('onItemClick')
    },
    onRateClick () {
      this.$emit('onRateClick')
    }
  }
}
</script>

<style scoped>
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
    font-weight: 500;
    color: #333;
    margin-top: 10px;
    /*display: inline-block;*/
    width: 160px;
  }
  .card-item-warp .content .description {
    font-size: 12px;
    font-weight: 400;
    color: #333;
    margin-top: 6px;
    /*display: inline-block;*/
    width: 160px;
  }
  .card-item-warp .content .teacher {
    font-size: 12px;
    font-weight: 400;
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
    font-weight: 400;
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
    font-weight: 400;
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
    font-weight: 400;
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
