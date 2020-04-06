<template>
  <div class="info-edit">
    <NavBar />
    <van-cell-group>
      <van-field v-model="nickName"
                 clearable
                 ref="field"
                 :placeholder="nickName" />
    </van-cell-group>
    <div class="btn">
      <van-button class="edit" type="default">确认修改</van-button>
    </div>
  </div>
</template>

<script>
import { CellGroup, Field, Button } from 'vant'
import NavBar from '@/components/nav-bar/NavBar'

export default {
  name: 'InfoEdit',
  components: {
    NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button
  },
  data () {
    return {
      // 路由传递过来的参数 nickName
      nickName: this.$route.params.nickName
    }
  },
  methods: {
  },
  mounted () {
    this.$refs.field.focus()
  }
}
</script>

<style scoped>
  .info-edit {
    height: 100vh;
    background-color: #F8F8F8;
  }

  .btn {
    display: flex;
    margin-bottom: 80px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .btn .edit {
    width: 100%;
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    border-radius: 2px;
    margin: 10px 46px;
    background-color: #1E4058;
  }
</style>
