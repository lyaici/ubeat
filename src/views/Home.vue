<template>
  <div class="Home">
    <div class="title">
      <h1>Ubeat</h1>
      <img src="@/assets/common/ubeat-logo/@1x.png">
    </div>
    <search-input placeholder="What / Who do you want to listen ?" :items="searchList" @search="search"/>
    <small>
      Find out about 1,000 artists and albums.
    </small>
  </div>
</template>

<script>
import { SearchInput } from '@/components/utils';

export default {
  name: 'Home',
  computed: {
    searchList() {
      return this.$store.getters.getCurrentSearch;
    }
  },
  methods: {
    search(search) {
      if (this.$cookie.get('token')) this.$store.dispatch('search', [{ q: search, limit: 5 }]);
      else this.$store.dispatch('unsecureSearch', [{ q: search, limit: 5 }]);
    },
  },
  components: {
    SearchInput,
  },
  beforeCreate() {
    this.$store.commit('clearCurrentSearch');
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';
@import '@/styles/display.scss';

div.Home {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @media screen and (min-width: $tablet-bp){
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      max-width: 300px;
      max-height: 150px;
      margin-bottom: 50px;
      margin-top: 220px;
    }
  }
  @media screen and (max-width: $tablet-bp){
    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 300px;
      max-height: 150px;
      margin-bottom: 100px;
      margin-top: 100px;
    }
  }
  .title {
    img {
        max-width: 100px;
    }
    h1 {
      font-size: 5rem;
      margin-right: 20px;
      color: $secondary-color;
    }
  }
  .search-input {
    width: 100%;
    padding: 20px;
    border-radius: 30px;
  }
  small {
    margin-top: 15px;
    color: $secondary-color;
  }
}
</style>