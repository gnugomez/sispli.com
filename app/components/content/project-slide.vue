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
    @apply rounded-2xl sm:rounded-[2rem];
  }
}
</style>
