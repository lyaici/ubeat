<template>
  <input class="text-input" type="text" :placeholder="[placeholder]" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Enter text'
    },
    value: {
      type: String,
      required: false,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/typography.scss';

.text-input {
  padding: 5px;
  padding-left: 10px;
  border-radius: 6px;
  border: 1px solid black;
  outline: none;
}
</style>
