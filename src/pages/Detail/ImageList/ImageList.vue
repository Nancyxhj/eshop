<!-- 这个组件掌握nextTick如何用 -->
<template>
  <div class="swiper" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="../images/s1.png">
      </div>
      <div class="swiper-slide">
        <img src="../images/s2.png">
      </div>
      <div class="swiper-slide">
        <img src="../images/s3.png">
      </div>
     
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
export default {
  name: "ImageList",
  props: ['skuImageList'],
  mounted() {
    const swiper = new Swiper(this.$refs.cur, {
      modules: [Navigation],
      loop: true,
      slidesPerView: 3,
      slidesPerGroup: 3,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    })
  },

}
</script>

<style lang="less" scoped>
.swiper {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>