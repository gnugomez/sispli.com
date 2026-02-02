<script setup lang="ts">
</script>

<template>
  <div class="slide">
    <slot />
  </div>
</template>

<style lang="scss">
.slide {
  img {
    @apply rounded-sm sm:rounded-md w-full;
  }
}
</style>
