<template>
  <div class='playlists'>
    <wrapper :playlists='playlists' />
  </div>
</template>

<script>
import Wrapper from '@/components/playlists/wrapper';

export default {
  name: 'Playlists',
  computed: {
    playlists() {
      return this.$store.getters.getPlaylists;
    }
  },
  components: {
    Wrapper
  },
  created() {
    this.$store.dispatch('loadPlaylists');
  }
};
</script>

<style lang='scss' scoped>
.playlists {
  width: 100%;
}
</style>
