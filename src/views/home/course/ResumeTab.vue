<template>
  <div class="resumet-tab">
    <div class="info">
      <img class="circle" v-lazy="detail.headPortrait ? detail.headPortrait : require('@/assets/avatar.jpg')" />
      <div class="text">
        <div>{{detail.teacherName}}</div>
        <div v-if="detail.teacherCall">{{detail.teacherCall}}</div>
      </div>
    </div>
    <div class="description">
      {{detail.teacherIntroduce}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'ResumeTab',
  props: {
    detail: Object
  },
  components: {
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
