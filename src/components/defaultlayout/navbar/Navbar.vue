<template>
  <div class="navbar">
    <div class="nav-items">
      <router-link class="logo" to="/">
        <img src="@/assets/common/ubeat-logo/@1x.png">
        <h2 class="navbar">Ubeat</h2>
      </router-link>
      <div class="search-bar">
        <search-input @search="search" :items="searchList"></search-input>
        <router-link to="/">
          <font-awesome-icon id="search-bar-logo-mobile" class=fa icon="search" size="2x" :style="{ color: '#f0f0f0' }"/>
        </router-link>
      </div>
      <div class="link-items" v-if="currentUser.id">
        <router-link to="/playlists">Playlists</router-link>
      </div>
    </div>
    <div class="connection" v-if="!currentUser.id">
      <router-link to="/login">
        <Button type="secondary">Sign In</Button>
      </router-link>
      <router-link to="/register">
        <Button type="primary">Sign Up</Button>
      </router-link>
    </div>
    <div class="nav-user" v-if="currentUser.id">
      <img src="@/assets/navbar/user-logo/@1x.jpg">
      <router-link to="/" id="user-info"> {{ currentUser.name }} {{ currentUser.surname }} </router-link>
      <font-awesome-icon class=fa icon="cog" size="lg" :style="{ color: '#f0f0f0' }" @click="setting()"/>
      <router-link to="/">
        <font-awesome-icon class=fa icon="sign-out-alt" size="2x" :style="{ color: '#f0f0f0' }" @click="logout()"/>
      </router-link>
    </div>
    <div class="nav-user-mobile">
      <div id="nav-user-disconnected" v-if="!currentUser.id">
         <font-awesome-icon class=fa icon="sign-in-alt" size="2x" :style="{ color: '#f0f0f0' }"/>
      </div>
      <div id="nav-user-connected" to="/" v-if="currentUser.id">
        <img src="@/assets/navbar/user-logo/@1x.jpg">
        <font-awesome-icon class=fa icon="cog" size="lg" :style="{ color: '#f0f0f0' }"/>
        <router-link to="/">
          <font-awesome-icon class=fa icon="sign-out-alt" size="2x" :style="{ color: '#f0f0f0' }" @click="logout()"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, SearchInput } from '@/components/utils';

export default {
  name: 'Navbar',
  methods: {
    logout() {
      this.$store.commit('logout');
    },
    search(search) {
      if (this.$cookie.get('token')) this.$store.dispatch('search', [{ q: search, limit: 5 }]);
      else this.$store.dispatch('unsecureSearch', [{ q: search, limit: 5 }]);
    },
    setting() {
      this.$router.push({ name: 'User', params: { id: this.currentUser.id } });
    },
  },
  components: {
    Button,
    SearchInput,
  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
    searchList() {
      return this.$store.getters.getCurrentSearch;
    }
  }
};
</script>


<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/display.scss';

$navbar-height: 60px;
$navbar-bg-color: rgb(36, 41, 46);
$section-right-margin: 30px;
$items-right-margin: 10px;
$img-size: 30px;
$img-size-mobile: 30px;
.navbar {
  display: flex;
  flex-direction: row;
  position: sticky;
  justify-content: space-around;
  align-items: center;
  height: $navbar-height;
  background-color: $navbar-bg-color;
  .nav-items {
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: $section-right-margin;
      img {
        max-width: $img-size;
        margin-right: $items-right-margin;
      }
    }
    .search-bar {
      margin-right: $section-right-margin;
      .search-input {
        padding: 7px;
        border-radius: 30px;
      }
      @media screen and (min-width: $tablet-bp) {
        #search-bar-logo-mobile {
          display: none;
        }
      }
      @media screen and (max-width: $tablet-bp) {
        #search-bar-logo-mobile {
          max-width: 20px;
          display: block;
        }
        .search-input {
          display: none;
        }
      }
    }
    .link-items {
      display: flex;
      flex-direction: row;
      a {
        margin-right: $items-right-margin;
        &:hover {
          border-bottom: 1px solid $secondary-color;
        }
      }
    }
  }
  .connection {
    display: flex;
    flex-direction: row;
    align-items: center;
    .button {
      margin-right: $items-right-margin;
    }
  }
  @media screen and (min-width: $mobile-bp){
    .nav-user {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      img {
        max-width: $img-size;
        margin-right: $items-right-margin;
        border-radius: 50%;
      }
      .fa {
        margin-right: $items-right-margin;
      }
      a {
        margin-right: $items-right-margin;
      }
    }
    .nav-user-mobile {
      display: none;
    }
  }
  @media screen and (max-width: $mobile-bp) {
    .nav-user-mobile {
      display: flex;
      flex-direction: row;
      align-items: center;
      #nav-user-connected {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      #nav-user-disconnected {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
      }
      img {
        max-width: $img-size-mobile;
        margin-right: $items-right-margin;
        border-radius: 50%;
      }
      .fa {
        margin-right: $items-right-margin;
      }
    }
    .nav-items {
      .link-items {
        display: none;
      }
    }
    .nav-user {
      display: none;
    }
    .connection {
      display: none;
    }
  }
}
</style>
