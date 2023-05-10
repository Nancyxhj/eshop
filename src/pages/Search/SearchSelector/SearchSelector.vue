<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 品牌信息，绑定事件，点击后加入面包屑，并且重新发请求、路由更新 -->
        <ul class="logo-list">
          <li v-for="tm in trademarkList" :key="tm.tmId" @click="searchBrand($event, tm.tmId)">{{ tm.tmName }}</li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId" @click="searchAttr($event,attr.attrId,attr.attrName)">
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="value in attr.attrValueList" :key="value">
            <a>{{ value }}</a>
          </li>

        </ul>
      </div>
      <div class="fl ext"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SearchSelector',
  data() {
    return {
      brand: ''
    }
  },

  props: ['trademarkList', 'attrsList'],
  methods: {
    //  品牌信息，绑定事件，点击后加入面包屑，并且重新发请求、路由更新
    searchBrand(e, id) {
      // 子组件点击的元素信息，传给父组件search
      this.brand = e.target.innerText
      // 把父组件的bread改了
      this.$emit('brand', this.brand,id)
    },
    searchAttr(e,id,name){
        // 子组件给父组件传过去 id 
        let props=id+':'+e.target.innerText+':'+name
        this.$emit('prop',props)
    }
  },
}
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

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
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>