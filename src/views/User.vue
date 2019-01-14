<template>
  <div class="user">
    <div class="card">
      <user-info :user="user"></user-info>
      <div class="selection">
        <a @click="set('playlist')">Playlist</a>
        <a @click="set('friends')">Friends</a>
      </div>
      <playlist-list v-if="playlist && playlists" :playlists="playlists"></playlist-list>
      <friends-list v-if="friends && user.following && user.following.length !== 0" :friends="user.following"></friends-list>
    </div>
  </div>
</template>

<script>
import { UserInfo, PlaylistList, FriendsList } from '@/components/user';

export default {
  name: 'User',
  data: () => ({
    friends: true,
    playlist: false,
  }),
  methods: {
    set(tab) {
      if (tab === 'friends') {
        this.friends = true;
        this.playlist = false;
      } else {
        this.friends = false;
        this.playlist = true;
      }
    },
  },
  computed: {
    user() {
      const currentUser = this.$store.getters.getCurrentUser;
      if (currentUser.id === this.$route.params) {
        return currentUser;
      }
      return this.$store.getters.getCurrentUserProfile;
    },
    playlists() {
      return this.$store.getters.getUserProfilePlaylists;
    }
  },
  components: {
    UserInfo,
    PlaylistList,
    FriendsList,
  },
  created() {
    this.$store.dispatch('loadCurrentUserProfile', this.$route.params.id);
    this.$store.dispatch('loadUserProfilePlaylists');
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/font.scss';
@import '@/styles/typography.scss';
@import '@/styles/color.scss';

.user {
  width: 100%;
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    min-height: 600px;
    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.7);
    .selection {
      margin: 20px 0;
      a {
        font-size: 16px;
        color: $primary-color;
        margin-left: 5px;
        margin-right: 5px;
        cursor: pointer;
        &:hover {
          border-bottom: 1px solid $primary-color;
        }
      }
    }
    .friends-list {
      max-width: 800px;
    }
  }
}
</style>
