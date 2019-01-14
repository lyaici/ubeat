<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  async created() {
    if (this.$cookie.get('token') && !this.$store.getters.getCurrentUser.id) this.$store.dispatch('loginOnLoad', this.$cookie.get('token'));
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
