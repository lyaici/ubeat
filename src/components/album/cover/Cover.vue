<template>
  <div class="cover">
    <div class="album-cover">
      <img :src="album.artworkUrl100">
    </div>
    <div class="album-details">
      <div class="date-title">
        <h1>{{ album.collectionName }}</h1>
        <h3>{{ year }}</h3>
      </div>
      <div class="artist-details">
        <router-link :to="{ name: 'Artist', params: { id: album.artistId }}">
          <h2>{{ album.artistName }}</h2>
        </router-link>
      </div>
      <div class="genre">
        <h3>{{ album.primaryGenreName }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Cover',
  props: {
    album: {
      type: Object,
      required: true,
    }
  },
  computed: {
    year() {
      return moment(this.album.date).format('YYYY');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/display.scss';

$img-size: 200px;
$img-radius: 50%;
.cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  .album-cover {
    img {
      max-width: $img-size;
      border-radius: $img-radius;
      margin-bottom: 20px;
    }
  }
  .album-details {
    @media screen and (min-width: $mobile-bp){
      .date-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-indent: 10px;
      }
    }
    @media screen and (max-width: $mobile-bp) {
      .date-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        text-indent: 10px;
      }
    }
    .artist-details {
      a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-indent: 5px;
      }
    }
    .genre {
      text-align: center;
    }
  }
}
</style>
