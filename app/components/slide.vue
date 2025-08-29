<script setup lang="ts">
const { image, width, height } = defineProps<{
  image: {
    src: string
    alt: string
  }
  width: number
  height: number
}>()
</script>

<template>
  <div class="slide">
    <nuxt-img class="background" :src="image.src" :width="width" :height="height" :alt="image.alt"
      :placeholder="[80, Math.round((80 / width) * height)]" />
    <div class="absolute inset-0 backdrop-blur-3xl sm:hidden" />
    <nuxt-img class="image" :src="image.src" :width="width" :height="height" :alt="image.alt"
      :placeholder="[80, Math.round((80 / width) * height)]" />
  </div>
</template>

<style scoped lang="scss">
.slide {
  img {
    &.background {
      @apply sm:hidden;
    }

    &.image {
      @apply sm:rounded-3xl relative;
    }
  }
}
</style>
