<template>
  <div class="playlist">
    <div v-if="deleting" class="playlist-header">
      <h3>Are you sure you want to remove this playlist ?</h3>
      <div class="actions">
        <a class="yes" @click="remove"><font-awesome-icon class=fa icon="check" /></a>
        <a class="no" @click="leaveDeletingState"><font-awesome-icon class=fa icon="times" /></a>
      </div>
    </div>
    <div v-else-if="editing" class="playlist-header">
      <text-input v-bind:value="newName" v-on:input="newName = $event"></text-input>
      <div class="actions">
        <a class="yes" @click="update"><font-awesome-icon class=fa icon="check" /></a>
        <a class="no" @click="leaveEditingState"><font-awesome-icon class=fa icon="times" /></a>
      </div>
    </div>
    <div v-else class="playlist-header">
      <h3 v-text="playlist.name"></h3>
      <div class="actions">
        <a class="edit" @click="enterEditingState"><font-awesome-icon class=fa icon="edit" /></a>
        <a class="remove" @click="enterDeletingState"><font-awesome-icon class=fa icon="trash" /></a>
      </div>
    </div>
    <div class="playlist-body">
      <track-list :tracks="playlist.tracks" :remove-action="removeTrack"></track-list>
      <p>
        To add music to the playlist go find an artist or an album and add tracks to it. 
      </p>
    </div>
  </div>
</template>

<script>
import TrackList from '@/components/playlists/tracklist';
import { Button, TextInput } from '@/components/utils';

export default {
  name: 'Playlist',
  props: {
    playlist: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    deleting: false,
    editing: false,
    newName: '',
  }),
  components: {
    Button, TrackList, TextInput
  },
  methods: {
    enterDeletingState() {
      this.deleting = true;
    },
    leaveDeletingState() {
      this.deleting = false;
    },
    async remove() {
      const success = await this.$store.dispatch('removePlaylist', this.playlist.id);
      if (success) {
        this.leaveDeletingState();
      }
    },
    enterEditingState() {
      this.editing = true;
    },
    leaveEditingState() {
      this.editing = false;
    },
    async update() {
      await this.$store.dispatch('updatePlaylist', { id: this.playlist.id, newName: this.newName });
      this.leaveEditingState();
    },
    async removeTrack(track) {
      await this.$store.dispatch('removePlaylistTrack', { pId: this.playlist.id, tId: track.trackId });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/font.scss';
@import '@/styles/typography.scss';
@import '@/styles/color.scss';

.playlist {
  border: solid $main-color 1px;
  border-radius: 10px;
  .playlist-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1px solid $main-color;
    padding: 20px;
    .actions {
      a {
        cursor: pointer;
        color: $main-color;
        margin-left: 10px;
        &.edit:hover {
          color: $warning-color;
        }
        &.remove:hover {
          color: $danger-color;
        }
        &.yes:hover {
          color: $success-color;
        }
        &.no:hover {
          color: $danger-color;
        }
      }
    }
  }
  .playlist-body {
    padding: 20px;
    p {
      text-align: center;
      opacity: .6;
    }
  }
}
</style>
