<template>
  <div>
    <TypeNav ref="tn" />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <!--面包屑应该根据搜索的条件动态展示，即拿$router里的query和keyword -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 父组件需要brand 信息，子组件给父组件传信息 -->
            <li class="with-x" v-if="brand">{{ brand }}<i @click="removeBrand">×</i></li>
            <li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">{{ prop.split(':')[1] }}<i
                @click="removeProps($event, index)">×</i></li>

          </ul>
        </div>

        <!--selector 子组件-->
        <SearchSelector :trademarkList="trademarkList" :attrsList="attrsList" @brand="getBrand" @prop="getProps" />

        <!--details-->
        <div class="details clearfix">

          <!-- 排序规则 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc" -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 谁被点了，谁的class 就是active -->
                <li :class="{ active: searchParams.order.indexOf('1') != -1 }" @click="getOrder('1')">
                  <a href="javascript:;">综合<span v-show="flag1 == 'desc'">⬇</span><span v-show="flag1 == 'asc'">⬆</span></a>
                </li>

                <li :class="{ active: searchParams.order.indexOf('2') != -1 }" @click="getOrder('2')">
                  <a href="javascript:;">价格<span v-show="flag2 == 'desc'">⬇</span><span v-show="flag2 == 'asc'">⬆</span></a>
                </li>

              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转和传参，用params，带上产品ID -->
                    <!-- 还需进行滚轮处理 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>                    
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页器 -->
          <PagSeperate :pageNo="searchParams.pageNo" @changePage="changeCurrentPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data() {
    return {
      // 默认的传参，到时候发请求前拿$route 里的数据替换
      searchParams: {
        // id和name 都在typeNav通过query传入
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",
        // 通过header 搜索按钮传入 keyword
        "keyword": "",
        // 排序
        "order": "1:desc",
        // 分页器用：当前第几页
        "pageNo": 1,
        // 分页器：每页展示数据个数
        "pageSize": 5,
        //  筛选参数
        "props": [],
        // 用户筛的品牌
        "trademark": ""

      },
      brand: '',
    }
  },
  methods: {
    // type 为1 或2   order 为asc 或 desc
    getOrder(type) {
      // 拿到初始排序
      let origin = this.searchParams.order
      let originType = origin.split(':')[0]
      let originSort = origin.split(':')[1]
      // 如果和初始状态一致，点击就取反sort
      if (type == originType) {
        let newOrder = `${originType}:${originSort == 'desc' ? 'asc' : 'desc'}`
        // 把searchParams.order的顺序更新
        this.searchParams.order = newOrder
      } else {
        // 如果类目跟原来不等,切换过去就是desc
        let newOrder = `${type}:desc`
        this.searchParams.order = newOrder
      }
      // 整理完参数，重新发请求
      this.getData()

    },
    //  调search 接口，同时传过去searchParams
    getData() {
      this.$store.dispatch('getSearchResult', this.searchParams)
    },
    // 品牌筛选
    getBrand(trademark, id) {
      this.brand = trademark
      //  重新发请求
      this.searchParams.trademark = id + ':' + this.brand
      this.getData()
    },
    // 售卖属性筛选
    getProps(props) {
      // 数组去重后，再修改参数，因为可能点多下造成数据重复
      if (this.searchParams.props.indexOf(props) == -1) {
        // 修改参数
        this.searchParams.props.push(props)
        // 重新发请求
        this.getData()
      }

    },
    // 清除类别
    removeCategoryName() {
      // 清除掉name时，id也连带清空，置为undefined，请求就不带上这些参数
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 参数变化，重新发请求,请求次数太多了，暂时先注释@@
      // this.getData()
      // 路由也应该重新跳转
      this.$router.push(this.$route.path)


    },
    // 清除关键字
    removeKeyword() {
      this.searchParams.keyword = undefined
      //  重新发请求,，暂时先注释@@ 
      // this.getData()
      // header 组件的 keyword 如何置空？？
      this.$bus.$emit('clearKeyword')
      // 重新跳转路由
      this.$router.push({ 'name': 'search', query: this.$route.query })

    },
    // 清除品牌
    removeBrand() {
      this.brand = ''
      this.searchParams.trademark = undefined
      // 重新发请求
      this.getData()
    },
    // 清除售卖属性
    removeProps(e, index) {
      // 删掉数组中指定prop
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 切换页
    changeCurrentPage(page) {
      //  重新整理参数
      this.searchParams.pageNo = page
      // 重发请求
      this.getData()
    }

  },
  // 页面挂载前更新参数，即发请求之前整理参数
  created() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params)

  },
  // 第一次进入search页先发一次请求
  mounted() {
    this.getData()
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters(['goodsList', 'attrsList', 'trademarkList']),
    // flag用于计算到底是下箭头还是上箭头 desc 就是下箭头
    flag1() {
      if (this.searchParams.order.split(':')[0] == '1') {
        return this.searchParams.order.split(':')[1]
      }
    },
    flag2() {
      // 先判断哪个排序类型，然后再拿排序的值
      if (this.searchParams.order.split(':')[0] == '2') {
        return this.searchParams.order.split(':')[1]
      }

    }
  },
  watch: {
    // 妙啊，监听路由变化，根本就不用自己每次跳转的时候自己调接口了
    $route() {

      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 请求接口
      this.getData()

      // this.searchParams.category1Id=''
      // this.searchParams.category2Id=''
      // this.searchParams.category3Id=''
    }
  }

}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }


    }
  }
}
</style>