<template>
  <div class="wrapper">
    <playlist v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"></playlist>
    <div class="create-panel">
      <text-input v-bind:value="playlistName" v-on:input="playlistName = $event"></text-input>
      <Button @click.native="createPlaylist" type="primary">Create</Button>
    </div>
  </div>
</template>

<script>
import Playlist from '@/components/playlists/playlist';
import { TextInput, Button } from '@/components/utils';

export default {
  name: 'Wrapper',
  props: {
    playlists: {
      type: Array,
      required: true,
    }
  },
  data: () => ({
    playlistName: '',
  }),
  components: {
    Playlist, TextInput, Button
  },
  methods: {
    async createPlaylist() {
      await this.$store.dispatch('createPlaylist', this.playlistName);
    }
  }
};
</script>

<style lang="scss" scoped>
.playlist {
  margin-bottom: 20px;
}
</style>
