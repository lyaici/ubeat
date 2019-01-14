<template>
  <button :class="['button', type]">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      required: false,
      default: 'primary',
      validator: style => ['primary', 'secondary', 'warning', 'danger'].indexOf(style) > -1,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';
@import '@/styles/typography.scss';

.button {
	border-radius: 6px;
  cursor: pointer;
  padding: 8px;
  min-width: 100px;
  &.primary {
    background-color: $primary-color;
    color: white;
    border: none;
    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
	&.secondary {
    background-color: $secondary-color;
    color: black;
    border: none;
    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }
  &.warning {
    background-color: $warning-color;
    color: white;
    border: none;
    &:hover {
      background-color: darken($warning-color, 10%);
    }
  }
  &.danger {
    background-color: $danger-color;
    color: white;
    border: none;
    &:hover {
      background-color: darken($danger-color, 10%);
    }
  }
}
</style>