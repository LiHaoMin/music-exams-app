<template>
  <div class="dashboard">
    <van-tabbar v-show="showTabbar" v-model="currentIdx" active-color="#333333" :safe-area-inset-bottom="true">
      <van-tabbar-item :key="index" @click="tab(index, item.path)" v-for="(item, index) in tabBars">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.normal"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 缓存界面选择加载 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'DashBoard',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  created () {
    this.tabbarSelected(this.$route.name)
  },
  watch: {
    $route: {
      handler (val, oldval) {
        this.tabbarSelected(val.name)
      }
    },
    deep: true
  },
  computed: {
    showTabbar () {
      const whiteList = ['home', 'favorite', 'learn', 'mine']
      return whiteList.indexOf(this.$route.name.toLowerCase()) > -1
    }
  },
  data () {
    return {
      currentIdx: 0,
      tabBars: [
        {
          title: '首页',
          normal: require('@/assets/images/tabbar/home_default.png'),
          active: require('@/assets/images/tabbar/home_selected.png'),
          path: 'home'
        },
        {
          title: '收藏课程',
          normal: require('@/assets/images/tabbar/favorite_default.png'),
          active: require('@/assets/images/tabbar/favorite_selected.png'),
          path: 'favorite'
        },
        {
          title: '我的学习',
          normal: require('@/assets/images/tabbar/learn_default.png'),
          active: require('@/assets/images/tabbar/learn_selected.png'),
          path: 'learn'
        },
        {
          title: '我的',
          normal: require('@/assets/images/tabbar/mine__default.png'),
          active: require('@/assets/images/tabbar/mine_selected.png'),
          path: 'mine'
        }
      ]
    }
  },
  methods: {
    tab (index, val) {
      this.currentIdx = index
      this.$router.replace({ path: val })
    },
    tabbarSelected (item) {
      const mapType = {
        home: 0,
        favorite: 1,
        learn: 2,
        mine: 3
      }
      this.currentIdx = mapType[item.toLowerCase()]
    }
  }
}
</script>
