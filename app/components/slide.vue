<script setup lang="ts">
const { image, width = 3333, height = 2500 } = defineProps<{
  image: {
    src: string
    alt: string
  }
  width?: number
  height?: number
}>()

</script>

<template>
  <div class="slide">
    <nuxt-img class="image" :src="image.src" :width="width" :height="height" :alt="image.alt"
      :placeholder="[80, Math.round((80 / width) * height)]" />
  </div>
</template>

<style scoped lang="scss">
.slide {
  img {
    &.image {
      @apply relative rounded-[2rem];
    }
  }
}
</style>
