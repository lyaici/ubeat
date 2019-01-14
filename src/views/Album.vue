<template>
  <div class="album">
    <cover v-if="currentAlbum" :album="currentAlbum"></cover>
    <track-list v-if="currentAlbum.tracks" :tracks="currentAlbum.tracks" :appleMusic="currentAlbum.artistViewUrl"></track-list>
  </div>
</template>

<script>
import Cover from '@/components/album/cover';
import TrackList from '@/components/album/tracklist';

export default {
  name: 'Album',
  computed: {
    currentAlbum() {
      return this.$store.getters.getCurrentAlbum;
    }
  },
  components: {
    Cover,
    TrackList,
  },
  created() {
    if (this.$cookie.get('token')) this.$store.dispatch('loadCurrentAlbum', this.$route.params.id);
    else this.$store.dispatch('loadCurrentAlbumUnsecure', this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$cookie.get('token')) this.$store.dispatch('loadCurrentAlbum', to.params.id);
    else this.$store.dispatch('loadCurrentAlbumUnsecure', to.params.id);
    next(true);
  },
};
</script>

<style lang="scss" scoped>
.album {
  .cover {
    margin-bottom: 50px
  }
  .tracks {
    margin: 0 auto;
    max-width: 900px;
  }
  width: 80vw;
}
</style>
