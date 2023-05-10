<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in shopCartList" :key="index">
          <!-- 第一列，复选框 -->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" @change="isChecked($event, item)" :checked="item.isChecked">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}</span>
          </li>
          <!-- 输入框和+ - -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum(item, -1, $event)" v-show="item.skuNum > 1">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" class="itxt"
              @change="changeNum(item, $event.target.value - item.skuNum, $event)">
            <a href="javascript:void(0)" class="plus" @click="changeNum(item, 1, $event)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteItem(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>


      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 全选 -->
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="updateAllCart">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade" >结算</router-link>

        </div>
      </div>
    </div>
  </div>
</template>
<!-- todo 
全选、删除选中
-->
<script>
import { mapState } from 'vuex'
import { reqDeleteItem, reqCheckCart } from '@/api/index'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  methods: {
    // 封装到方法，防止后续多次请求接口
    getData() {
      this.$store.dispatch('getShopCartList')
    },
    // 上方复选框变化
    async isChecked(e, item) {
      //  每次修改，发请求
      try {
        let check = ''
        // this.$refs.allCheck.checked 这里有问题，为何没生效
        if (e.target.checked) {
          check = 1
        } else { check = 0 }
        // 发请求,得等请求有结果了再进行下一步
        await this.$store.dispatch('getCheckedCart', { skuId: item.skuId, isChecked: check })
        // 更新购物车页
        this.getData()
      } catch (error) {
        alert(error.message)
      }
      console.log('change', e.target.checked);
    },
    // 全选框变化
    updateAllCart(e) {
      let checked = e.target.checked ? '1' : '0'
      this.$store.dispatch('updateAllCart', checked)
    },

    // 防止用户狂点  节流
    changeNum: throttle(async function (item, diffNum, e) {
      // 解构赋值
      const { skuId, skuNum } = item
      if (skuNum + diffNum > 0) {
        // 这里必须是异步，得等这里执行完才能重新获取购物车列表
        try {
          // 防止有小数，取整
          await this.$store.dispatch('addToCart', { skuId, skuNum: parseInt(diffNum) })
          // 刷新页面，重新请求购物车列表
          this.getData()
        } catch (error) {
          alert(error)
        }
      } else {
        alert('值不合法！')
        e.target.value = item.skuNum

      }
    }, 3000),

    // 删除购物车某个产品
    async deleteItem(skuId) {
      try {
        let result = await reqDeleteItem(skuId)
        //  删除成功后，更新购物车
        this.getData()
      } catch (error) {
        alert(error)
      }

    }


  },
  // 页面挂载时先调一次
  mounted() {
    this.getData()

  },
  computed: {
    ...mapState({
      shopCartList: state => state.shopCart.shopCartList
    }),
    totalPrice() {
      let sum = 0
      this.shopCartList.forEach(item => {
        sum += item.skuNum * item.cartPrice
      })
      return sum
    },
    // 全选
    isAllChecked() {
      // 是否全是1
      return this.shopCartList.every(item => item.isChecked == 1)
    }

  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>