<template>
  <div class="friends-list">
    <div class="friend-card" v-for="friend in friends" :key="friend.key">
      <router-link :to="{ name: 'User', params: { id: friend.id } }">{{ friend.name }}</router-link>
      <router-link :to="{ name: 'User', params: { id: friend.id } }">{{ friend.email }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FriendsList',
  props: {
    friends: {
      type: Array,
      required: true,
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/font.scss';
@import '@/styles/typography.scss';
@import '@/styles/color.scss';

.friends-list {
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  max-height: 500px;
  width: 100%;
  .friend-card {
    &:nth-child(odd) {
      background-color: $main-color;
      a {
        color: $secondary-color;
        font-size: 16px;
      }
    }
    a {
      color: $main-color;
      font-size: 16px;
      &:not(:first-child) {
        margin-left: 100px;
      }
    }
    text-indent: 15px;
    display: flex;
    flex-direction: row;
    padding: 20px 0;
  }
}
</style>
