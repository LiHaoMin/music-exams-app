<template>
  <div class="list-warp">
    <div class="title">
      <span>{{title}}</span>
      <span @click="onMore">{{moreText}} <img v-if="moreText" :src="require('@/assets/images/home/more.png')" /></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    moreText: String
  },
  data () {
    return {
    }
  },
  methods: {
    onMore () {
      this.$emit('onMore')
    }
  }
}
</script>

<style scoped>
  .list-warp {
    font-size: 14px;
    padding-left: 15px;
    padding-right: 15px;
  }
  .list-warp > .title {
    font-size: 16px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .list-warp > .title span:first-child {
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }
  .list-warp > .title span:last-child {
    color:#888;
    font-size:12px;
    font-weight:400;
    display: flex;
    align-items: center;
  }
  .list-warp > .title span > img {
    width: 5px;
    height: 9px;
    margin-left: 3px;
  }
</style>
