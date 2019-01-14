<template>
  <div class="list">
    <div class="track" v-for="track in tracks" :key="track.id">
      <a class="remove" @click="removeAction(track)"><font-awesome-icon class=fa icon="trash" /></a>
      <span id="artistName">{{ track.artistName }}</span>
      <span id="trackName">{{ track.trackName }}</span>
      <span id="collectionName">{{ track.collectionName }}</span>
      <span id="trackDuration">{{ (new Date(track.trackTimeMillis)).getMinutes() + ':' + (new Date(track.trackTimeMillis)).getSeconds() }}</span>
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
</template>

<script>
import Button from '@/components/utils/button';

export default {
  name: 'TrackList',
  props: {
    tracks: {
      type: Array,
      required: true,
    },
    removeAction: {
      type: Function,
      required: true,
    }
  },
  data: () => ({
    audio: {},
    playingTrack: {}
  }),
  components: {
    Button,
  },
  methods: {
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
    },
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

.list {
  overflow-y: auto;
  overflow-x: hidden;
  height: 300px;
  .track {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 20%;
    text-indent: 30px;
    border-bottom: 1px solid $main-color;
    justify-content: space-between;
    @media screen and (max-width: $mobile-bp){
      #collectionName {
        display: none;
      }
      #trackDuration {
        display: none;
      }
    }
    span {
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      a.remove {
        cursor: pointer;
        &:hover {
          color: $danger-color;
        }
      }
    }
    &:nth-of-type(even) {
      background-color: $main-color;
      span, a {
        color: $secondary-color;
      }
    }
    &:nth-of-type(odd) {
      background-color: white;
      span, a {
        color: $main-color;
      }
    }
     @media screen and (max-width: $mobile-bp){
        .button {
          display: none;
        }
        .fa-play {
          margin: 0 10px;
        }
        .fa-pause {
          margin: 0 10px;
        }
      }
      @media screen and (min-width: $mobile-bp){
        .fa-play {
          display: none;
        }
        .fa-pause {
          display: none;
        }
      }
    .button {
      margin-right: 15px;
    }
  }
}
</style>
