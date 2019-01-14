<template>
  <div class="home-layout">
    <div class="background-video">
      <video autoplay muted loop preload="true">
        <source src="@/assets/start-up/start-up-video/bg_video.webm" type="video/mp4">
      </video>
    </div>
    <div class="content">
      <home-navbar v-if="this.$route.name === 'Home'"></home-navbar>
      <div class="container">
        <router-view />
      </div>
    </div>
    <a href="http://kevklopper.com/">
      <div class="licence">
        <small>Footage by Kev Klopper ©</small>
      </div>
    </a>
  </div>
</template>

<script>
import HomeNavbar from '@/components/homelayout/homenavbar';

export default {
  name: 'HomeLayout',
  components: {
    HomeNavbar,
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/display.scss';

.background-video {
  z-index: -1000;
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

@media screen and (max-width: $tablet-bp){
  .container {
    width: 90%;
    margin: 0 auto;
  }  
}
@media screen and (min-width: $tablet-bp){
  .container {
    width: 60%;
    margin: 0 auto;
  }  
}
.licence {
  position: absolute;
  bottom: 15px;
  right: 0;
  width: 200px;
  color: white;
}
</style>
