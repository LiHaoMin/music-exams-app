<template>
  <div class="search">
    <div class="header">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="搜索"
          show-action
          shape="round"
          @search="search"
          @cancel="$router.back()">
        </van-search>
      </form>
      <div class="hot-warp" v-if="!isSearched && hotTags.length > 0">
        <span>历史搜索</span>
        <div class="tags">
          <div class="tag" @click="tag(item)" :key="index" v-for="(item,index) in hotTags">{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="search-result" v-if="isSearched">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div class="card-item-warp" :key="item.id" v-for="item in list" @click="courseItem(item)">
          <div class="thumb">
            <img v-lazy="item.curriculumImg" />
          </div>
          <div class="content">
            <p class="title van-ellipsis">{{item.curriculumName}}</p>
            <p class="description van-ellipsis">{{item.briefIntroduction}}</p>
            <p class="teacher">讲师：{{item.teacherName}}</p>
            <div class="play">
              <img :src="require('@/assets/images/home/play.png')" />
              <span>{{item.isNumOfLearners ? item.numOfLearners : item.orderNum}}</span>
            </div>
            <div class="price" v-if="item.freeAdmission"><span>免费</span></div>
            <div class="price" v-else><label>¥</label><span>{{item.money}}</span></div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Search, List } from 'vant'
import { getLocalStore, setLocalStore } from '@/utils/global'

// TODO 推荐/两种样式

export default {
  name: 'Search',
  components: {
    [Search.name]: Search,
    [List.name]: List
  },
  data () {
    return {
      value: '',
      hotTags: JSON.parse(getLocalStore('history_tags') || '[]'),
      list: [],
      loading: false,
      error: false,
      finished: false,
      isSearched: false,
      page: 1,
      size: 10
    }
  },
  methods: {
    // 搜索
    search () {
      this.isSearched = true
      this.list = []
      this.page = 1

      if (this.hotTags.indexOf(this.value) === -1) {
        this.hotTags.push(this.value)
        setLocalStore('history_tags', this.hotTags)
      }

      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    // 标签
    tag (value) {
      this.value = value
      this.search()
    },
    onLoad () {
      const data = { num: this.page, size: this.size, search: this.value }
      this.$http.post('/home-page/get_curriculum_list', data).then((res) => {
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
  .search {
    background-color: #F8F8F8;
    height: 100%;
  }
  .header {
    padding-left: 15px;
    padding-right: 15px;
    background-color: #FFF;
  }
  .hot-warp {
    padding-left: 10px;
  }
  .hot-warp span {
    font-size: 14px;
    font-weight: normal;
    color: #333;
  }
  .hot-warp .tags {
    padding-bottom: 10px;
  }
  .hot-warp .tag {
    font-size: 12px;
    font-weight: normal;
    color: #C2C1C1;
    border-radius:11px;
    border:1px solid #EDEDED;
    display: inline-block;
    padding: 2px 11px;
    margin-right: 10px;
  }

  .search-result {
    padding: 10px 15px;
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
