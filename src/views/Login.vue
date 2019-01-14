<template>
  <div class="login">
    <div class="card">
      <login-card></login-card>
    </div>
  </div>
</template>

<script>
import LoginCard from '@/components/login';

export default {
  name: 'Login',
  components: {
    LoginCard,
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/display.scss';

.card {
  @media screen and (min-width: $mobile-bp){
    margin-top: 100px;
  }
  @media screen and (max-width: $mobile-bp){
    margin-top: 30px;
  }
}
</style>
