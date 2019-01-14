<template>
  <div class="container">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Container',
};
</script>

<style lang="scss" scoped>
$margin-from-navbar: 50px;
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: $margin-from-navbar;
}
</style>
