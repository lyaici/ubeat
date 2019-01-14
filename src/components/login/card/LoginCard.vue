<template>
  <div class="login-card">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/common/ubeat-logo/@1x.png">
      </router-link>
    </div>
    <div class="content">
      <div class="form">
        <h1>Login</h1>
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <Button @click.native="login(email, password)">Sing In</Button>
        <span>Don’t have any account ?<router-link to="/register"> Sign Up !</router-link></span>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from '@/components/utils';

export default {
  name: 'LoginCard',
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async login(email, password) {
      const result = await this.$store.dispatch('login', { email, password });
      if (result === 200) {
        this.$router.go(-1);
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
.login-card {
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
      span {
        padding-top: 50px;
        border-top: 1px solid #888888;
        font-size: 15px;
        a {
          color: $primary-color;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
