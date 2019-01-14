<template>
   <div class="tracklist">
    <div class="tracklist-info">
      <span>Tracks - {{ tracks.length }}</span>
      <div class="playlist-info" v-if="currentUser.id !== undefined">
        <drop-down @change="setCurrentPlaylist" :options="playlists"></drop-down>
        <Button type="primary" @click.native="addTracksToPlaylist">Add to Playlist</Button>
        <a @click="addTracksToPlaylist">
          <font-awesome-icon class=fa icon="plus" :style="{ color: 'rgb(49, 94, 216)' }" ></font-awesome-icon>
        </a>
      </div>
      <a target="_blank" :href="appleMusic">
        <img src="@/assets/temp_album/AppleMusic.png">
      </a>
    </div>
    <div class="list">
      <div class="track" v-for="track in tracks" :key="track.id">
        <span>{{ track.trackName }}</span>
        <span>{{ (new Date(track.trackTimeMillis)).getMinutes() + ':' + (new Date(track.trackTimeMillis)).getSeconds() }}</span>
        <Button v-if="currentUser.id !== undefined" type="primary" @click.native="addTrackToPlaylist(track)">Add</Button>
        <a class="fa-plus" @click="addTrackToPlaylist(track)">
          <font-awesome-icon v-if="currentUser.id !== undefined" class=fa icon="plus" :style="{ color: 'rgb(49, 94, 216)' }"></font-awesome-icon>
        </a>
        <a class="fa-play" v-if="playingTrack.trackId !== track.trackId" @click="play(track)">
          <font-awesome-icon class=fa icon="play-circle" size="lg" :style="{ color: 'rgb(49, 94, 216)' }"></font-awesome-icon>
        </a>
        <a class="fa-pause" v-else @click="pause">
          <font-awesome-icon class=fa icon="pause" :style="{ color: 'rgb(49, 94, 216)' }"></font-awesome-icon>
        </a>
        <Button v-if="playingTrack.trackId !== track.trackId" @click.native="play(track)" type="secondary">Play</Button>
        <Button v-else @click.native="pause" type="secondary">Pause</Button>
      </div>
    </div>
   </div>
</template>

<script>
import { Button, DropDown } from '@/components/utils';

export default {
  name: 'TrackList',
  data: () => ({
    audio: {},
    playingTrack: {},
    currentPlaylist: {},
  }),
  props: {
    tracks: {
      type: Array,
      required: true,
    },
    appleMusic: {
      type: String,
      required: false,
    }
  },
  components: {
    Button, DropDown
  },
  computed: {
    playlists() {
      return this.$store.getters.getPlaylists.map(x => ({ id: x.id, text: x.name, value: x }));
    },
    currentUser() {
      return this.$store.getters.getCurrentUser;
    }
  },
  methods: {
    setCurrentPlaylist(playlist) {
      this.currentPlaylist = playlist;
    },
    addTracksToPlaylist() {
      this.tracks.forEach((track) => {
        this.$store.dispatch('addPlaylistTrack', { pId: this.currentPlaylist.id, track });
      });
    },
    addTrackToPlaylist(track) {
      this.$store.dispatch('addPlaylistTrack', { pId: this.currentPlaylist.id, track });
    },
    play(track) {
      if (this.audio.src !== track.previewUrl) {
        if (this.audio.src !== undefined) {
          this.audio.pause();
          this.audio.currentTime = 0;
        }
        this.audio = new Audio(track.previewUrl);
      }
      this.audio.play();
      this.playingTrack = track;
    },
    pause() {
      this.audio.pause();
      this.playingTrack = {};
    }
  },
  beforeDestroy() {
    if (this.audio.src !== undefined) this.audio.pause();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/color.scss';
@import '@/styles/display.scss';

.tracklist {
 display: flex;
  flex-direction: column;
  .tracklist-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 30px 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid $main-color;
    .playlist-info {
      @media screen and (max-width: $mobile-bp){
        .button {
          display: none;
        }
        .fa {
          margin: 0 10px;
        }
      }
      @media screen and (min-width: $mobile-bp){
        .fa {
          display: none;
        }
      }
      .button {
        margin-left: 10px;
      }
    }
    img {
      max-width: 100px;
    }
  }
  .list {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 300px;
    .track {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 20%;
      text-indent: 30px;
      border-bottom: 1px solid $main-color;
      justify-content: space-between;
      span {
        width: 350px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:nth-of-type(even) {
        background-color: $main-color;
        span {
          color: $secondary-color;
        }
      }
      &:nth-of-type(odd) {
        background-color: white;
        span {
          color: $main-color;
        }
      }
      @media screen and (max-width: $mobile-bp){
        .button {
          display: none;
        }
        .fa {
          margin: 0 10px;
        }
      }
      @media screen and (min-width: $mobile-bp){
        .fa {
          display: none;
        }
      }
      .button {
        margin-right: 15px;
      }
    }
  }
}
</style>
