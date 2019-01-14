<template>
  <select class="drop-down" v-model="playlist" @change="$emit('change', playlist)">
    <option v-for="option in options" :key="option.id" :value="option.value">{{ option.text }}</option>
  </select>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    options: {
      type: Array,
      required: true,
    }
  },
  data: () => ({
    playlist: {},
  })
};
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';
@import '@/styles/typography.scss';
</style>