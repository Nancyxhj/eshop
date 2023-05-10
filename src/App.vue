<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: '',
  components: {
    Header, Footer
  },
  mounted() {
    // 派发一个action，获取商品分类列表
    this.$store.dispatch('categoryList')

  },

}
</script>

<style scoped></style>