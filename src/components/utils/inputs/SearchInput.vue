<template>
  <div class="search-input">
    <input class="search" v-model="search" type="text" :placeholder='[placeholder]' @keyup="$emit('search', search)">
    <div class="item-list" v-if="items" @click='clear'>
      <router-link :to="{ name: 'Artist', params: { id: item.artistId }}" v-for="(item, index) in items" :key='index' v-if="item.wrapperType === 'artist'">Artist  ||  {{ item.artistName }}</router-link>
      <router-link :to="{ name: 'Album', params: { id: item.collectionId }}" v-for="(item, index) in items" :key='index' v-if="item.wrapperType === 'collection'">Album || {{ item.artistName }} - {{ item.collectionName }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data: () => ({
    search: '',
  }),
  methods: {
    clear() {
      this.search = '';
      this.$store.commit('clearCurrentSearch');
    },
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Search',
    },
    items: {
      type: Array,
      required: false,
    }
  },
  beforeCreate() {
    this.$store.commit('clearCurrentSearch');
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.search-input {
  position: relative;
  width: 100%;
  .search {
    box-sizing: border-box;
    width: 100%;
    padding: inherit;
    border-radius: inherit;
    border: 1px solid white;
    outline: none;
  }
  .item-list {
    position: absolute;
    width: 100%;
    left: 0;
    background-color: rgb(249, 249, 249);
    border-radius: 10px;
    outline: none;
    margin-top: 2px;
    a {
      text-align: start;
      padding: 1rem;
      font-size: 1rem;
      color: rgb(94, 94, 94);
      display: block;
      &:hover {
        background-color: rgb(228, 228, 228);
        border-radius: 10px;
      }
    }
  }
}
</style>
