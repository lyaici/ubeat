<template>
  <div class="user-info">
    <h1> {{ user.name }} </h1>
    <h2> {{ user.email }} </h2>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/font.scss';
@import '@/styles/typography.scss';
@import '@/styles/color.scss';

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    text-transform: lowercase;
  }
}
</style>
