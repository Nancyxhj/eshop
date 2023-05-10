<template>
  <div class="pagination">

    <!-- 当前页为第一页时不可点击 -->
    <button :disabled="pageNo == 1" @click="changePage(pageNo-1)">上一页</button>
    <button v-if="start > 1" @click="changePage(1)">1</button>
    <button v-if="start > 2">···</button>
    <button :class="{ active: p == pageNo }" v-for="(p, index) in continuePages" :key="index" @click="changePage(p)">{{ p
    }}</button>
    <!-- 当前页为最后一页时不可点击 -->
    <button v-if="end < totalPages">...</button>
    <button :disabled="pageNo == totalPages" @click="changePage(pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }}条</button>
  </div>
</template>
  
<script>
import { mapState } from 'vuex'
export default {
  name: "PagSeperate",
  data() {
    return {
      continue: 5,

    }
  },
  props: ['pageNo'],
  computed: {
    // 拿到 total,pageSize,pageNo,totalPages
    ...mapState({
      pageSize: state => state.search.searchResult.pageSize
    }),
    ...mapState({
      totalPages: state => state.search.searchResult.totalPages
    }),
    ...mapState({
      total: state => state.search.searchResult.total
    }),
    //  返回连续页码的start 和 end 
    start() {
      let start = this.pageNo - Math.floor(this.continue / 2)
      if (start < 1) {
        start = 1
      }
      return start
    },
    end() {
      let end = this.start + this.continue - 1
      if (end > this.totalPages) {
        end = this.totalPages
      }
      return end
    },
    //  返回连续的页码数组
    continuePages() {
      const arr = []
      for (let i = this.start; i <= this.end; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  methods: {
    //  点页数，传参，重新发请求
    changePage(page) {
      // 触发事件，给父组件传参，切换第几页
      this.$emit('changePage', page)


    }

  },
}
</script>
  
<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
  