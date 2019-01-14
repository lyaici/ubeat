<template>
  <div class='artist'>
    <bio :currentArtist="currentArtist"></bio>
    <carrousel :artistAlbums="artistAlbums" v-if="!tablet"></carrousel>
    <mobile-carrousel :artistAlbums="artistAlbums" v-if="tablet"></mobile-carrousel>
  </div>
</template>

<script>
import Bio from '@/components/artist/bio';
import Carrousel from '@/components/artist/carrousel';
import MobileCarrousel from '@/components/artist/mobilecarrousel';

export default {
  name: 'Artist',
  data: () => ({
    tablet: 0,
  }),
  computed: {
    currentArtist() {
      return this.$store.getters.getCurrentArtist;
    },
    artistAlbums() {
      return this.$store.getters.getArtistAlbums;
    }
  },
  components: {
    Bio,
    Carrousel,
    MobileCarrousel,
  },
  methods: {
    setWindowSize() {
      this.tablet = innerWidth <= 900;
    },
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.setWindowSize);
      this.setWindowSize();
      if (this.$cookie.get('token')) {
        this.$store.dispatch('loadArtist', this.$route.params.id);
        this.$store.dispatch('loadArtistAlbums', this.$route.params.id);
      } else {
        this.$store.dispatch('loadArtistUnsecure', this.$route.params.id);
        this.$store.dispatch('loadArtistAlbumsUnsecure', this.$route.params.id);
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$cookie.get('token')) {
      this.$store.dispatch('loadArtist', to.params.id);
      this.$store.dispatch('loadArtistAlbums', to.params.id);
    } else {
      this.$store.dispatch('loadArtistUnsecure', to.params.id);
      this.$store.dispatch('loadArtistAlbumsUnsecure', to.params.id);
    }
    next(true);
  },
  beforeDestroy() {
    removeEventListener('resize', this.setWindowSize);
  },
};
</script>
<style lang="scss" scoped>
.artist{
  display: flex;
  flex-direction: column;
  align-items: center;
  .bio {
    margin-bottom: 100px;
  }
}
</style>

