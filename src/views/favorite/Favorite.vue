<template>
  <div class="favorite">
    <form action="/">
      <van-search
        v-model="value"
        placeholder="收藏课程搜索"
        shape="round"
        @search="search">
      </van-search>
    </form>
    <div class="list-warp" v-if="list.length > 0">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div class="card-item-warp" :key="item.id" v-for="(item, index) in list" @click="courseItem(item)">
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
          <div class="rate" @click.stop="onRateClick(item, index)">
            <van-rate size="0.37333rem" color="#FFBC49" disabled-color="#FFBC49" readonly :count="1"  void-color="#FFBC49" value="1" />
          </div>
        </div>
      </van-list>
    </div>
    <div class="list-empty" v-else>
      <img :src="require('@/assets/images/favorite/empty.png')" />
      <p>您还没有收藏课程哦～</p>
    </div>
  </div>
</template>

<script>
import { Search, List, Dialog, Toast, Rate } from 'vant'

export default {
  name: 'Favorite',
  components: {
    [Search.name]: Search,
    [List.name]: List,
    [Rate.name]: Rate
  },
  data () {
    return {
      value: null,
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
    // 搜索
    search () {
      this.isSearched = true
      this.list = []
      // 清空列表数据
      this.finished = false

      // TODO 搜索
      this.page = 1

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    // 取消收藏
    onRateClick (item, index) {
      Dialog.confirm({
        message: '取消收藏后，课程被移除，\n确定取消收藏吗？'
      }).then(() => {
        this.$http.get('/home-page/no_collection', { isShowLoading: true, params: { curriculumId: item.id } }).then((res) => {
          if (res && res.data) {
            this.list.splice(index, 1)
            Toast.success('操作成功')
          } else {
            Toast.fail('操作失败')
          }
        })
      }).catch(() => {
        // 取消
      })
    },
    onLoad () {
      this.$http.post('/home-page/get_collection_list', { num: this.page, size: this.size, search: this.value }, { isShowLoading: true }).then((res) => {
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
  .favorite {
    height: 100vh;
    background-color: #F8F8F8;
  }

  .list-warp {
    padding: 10px 15px 50px 15px;
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
