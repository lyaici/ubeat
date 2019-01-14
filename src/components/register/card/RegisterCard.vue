<template>
  <div class="register-card">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/common/ubeat-logo/@1x.png">
      </router-link>
    </div>
    <div class="content">
      <div class="form">
        <h1>Subscribe</h1>
        <input v-model="name" type="text" placeholder="Name">
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <Button @click.native="register(name, email, password)">Sign Up</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from '@/components/utils';

export default {
  name: 'RegisterCard',
  data: () => ({
    name: '',
    email: '',
    password: '',
  }),
  methods: {
    async register(name, email, password) {
      const result = await this.$store.dispatch('register', { name, email, password });
      if (result === 200 || result === 500) {
        this.$router.push({ name: 'Home' });
      } else if (result === 401) this.error = true;
    }
  },
  components: {
    Button,
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/color.scss';
@import '@/styles/display.scss';

$circle-size: 120px;
$img-size: $circle-size - 30px;
.register-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    z-index: 1;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $circle-size;
    height: $circle-size;
    img {
      margin-left: 0.1 * $circle-size;
      max-width: $img-size;
      max-height: $img-size;
    }
  }
  .content {
    background-color: white;
    margin-top: -50px;
    width: 100%;
    max-width: 550px;
    padding-top: 50px;
    padding-bottom: 50px;
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 25px;
      margin-right: 25px;
      input {
        margin: 15px 0;
        padding: 8px 10px;
        width: 100%;
        max-width: 400px;
        box-sizing: border-box;
      }
      .button {
        padding: 10px 0;
        margin-top: 20px;
        margin-bottom: 40px;
        width: 100%;
        max-width: 400px;
      }
    }
  }
}
</style>
