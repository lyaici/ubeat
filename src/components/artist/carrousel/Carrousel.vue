<template>
  <div class="carrousel">
    <div class="title">
      <h2>Albums</h2>
    </div>
    <div class="swiper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(album, index) in artistAlbums" :key="index">
          <router-link :to="{ name: 'Album', params: { id: album.collectionId }}">
            <img :src='album.artworkUrl100'>
          </router-link>
          <span>{{ album.collectionName }}</span>
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
  name: 'Carrousel',
  data: () => ({
    swiperOption: {
      slidesPerView: 3,
      spaceBetween: 10,
      slidesPerGroup: 3,
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
  beforeRouteUpdate(to, from, next) {
    to.$forceUpdate();
    next();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.swiper {
  max-width: 700px;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: center;
    align-items: center;
    height: 250px;
    img {
      max-width: 200px;
      height: 200px;
    }
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }
  }
}
</style>
