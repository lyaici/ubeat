<template>
  <div class="home-navbar">
     <div class="link-items">
        <router-link to="/playlists" v-if="currentUser.id">Playlist</router-link>
      </div>
     <div class="nav-user" v-if="currentUser.id">
      <img src="@/assets/navbar/user-logo/@1x.jpg">
      <router-link to="/" id="user-info"> {{ currentUser.name }} </router-link>
      <font-awesome-icon class=fa icon="cog" size="lg" :style="{ color: 'white' }" @click="setting()"/>
      <router-link to="/">
        <font-awesome-icon class=fa icon="sign-out-alt" size="2x" :style="{ color: 'white' }" @click="logout()"/>
      </router-link>
    </div>
    <div class="connection" v-if="!currentUser.id">
      <router-link to="login">
        <Button type="secondary" >Sign In</Button>
      </router-link>
      <router-link to="register">
        <Button type="primary">Sign Up</Button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Button } from '@/components/utils';

export default {
  name: 'HomeNavbar',
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    setting() {
      this.$router.push({ name: 'User', params: { id: this.currentUser.id } });
    }
  },
  components: {
    Button,
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/display.scss';

$navbar-height: 60px;
$items-right-margin: 10px;
$img-size: 30px;
.home-navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: $navbar-height;
  a {
    color: $secondary-color;
    margin-right: 10px;
  }
  .nav-user {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    align-items: center;
    img {
      max-width: $img-size;
      margin-right: $items-right-margin;
      border-radius: 50%;
    }
    .fa {
      margin-right: $items-right-margin;
    }
    @media screen and (min-width: $mobile-bp) {
      #user-info {
        display: inline;
      }
    }
    @media screen and (max-width: $mobile-bp) {
      #user-info {
        display: none;
      }
    }
  }
}
</style>
