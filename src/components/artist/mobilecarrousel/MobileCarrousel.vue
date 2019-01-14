<template>
  <div class="mobile-carrousel">
    <div class="title">
      <h2>Albums</h2>
    </div>
    <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(album, index) in artistAlbums" :key="index">
          <router-link :to="{ name: 'Album', params: { id: album.collectionId }}">
            <img :src='album.artworkUrl100'>
          </router-link>
          <h3>{{ album.collectionName }}</h3>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import '@/../node_modules/swiper/dist/css/swiper.css';

export default {
  name: 'MobileCarrousel',
  data: () => ({
    swiperOption: {
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerGroup: 1,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  }),
  props: {
    artistAlbums: {
      type: Array,
      required: true,
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    this.$forceUpdate();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.swiper {
  max-width: 250px;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    height: 300px;
    img {
      max-width: 250px;
      height: 250px;
    }
  }
}
</style>
