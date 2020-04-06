<template>
  <div class="resumet-tab">
    <div class="info">
      <img class="circle" v-lazy="'https://i.loli.net/2020/04/03/WLFcBrZd4MtCjIX.jpg'" />
      <div class="text">
        <div>方笑笑</div>
        <div>西方音乐教授</div>
      </div>
    </div>
    <div class="description">
      方笑笑作为一名优质讲师，8年授课经验，毕业于哈哈
      哈弗音乐学院，这里的介绍是100个字以内的，请注意
      字数限制。
    </div>
  </div>
</template>

<script>
import { List } from 'vant'

export default {
  name: 'ResumeTab',
  components: {
    [List.name]: List
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .resumet-tab {
    height: 100%;
    background-color: #fff;
    padding: 21px 25px;
  }

  .info {
    display: flex;
    padding-bottom: 15px;
  }
  .info .circle {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
  }
  .info .text {
    margin-left: 11px;
  }
  .info .text div:first-child {
    font-size: 14px;
    font-weight: 400;
    color: #333;
  }
  .info .text div:last-child {
    font-size: 12px;
    font-weight: 400;
    color: #888;
    margin-top: 6px;
  }
  .description {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 20px;
  }
</style>
