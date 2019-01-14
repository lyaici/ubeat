<template>
  <div class="register">
    <div class="card">
      <register-card></register-card>
    </div>
  </div>
</template>

<script>
import RegisterCard from '@/components/register';

export default {
  name: 'Register',
  components: {
    RegisterCard,
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
