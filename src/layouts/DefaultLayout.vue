<template>
  <div class="default-layout">
    <navbar></navbar>
    <container>
      <router-view/>
    </container>
    <Footer></Footer>
  </div>
</template>

<script>
import { Navbar, Container, Footer } from '@/components/defaultlayout';

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Container,
    Footer,
  }
};
</script>

<style lang="scss" scoped>
.container {
    width: 90%;
    margin: 0 auto;
  }  
</style>
