<script setup lang="ts">
const props = defineProps<{
  src: string
  alt?: string
  title?: string
  width?: number
  height?: number
}>()
</script>

<template>
  <div class="slide">
    <img :src="props.src" :alt="props.alt" :width="props.width" :height="props.height">
    <p v-if="props.title" class="text-center mt-2 text-sm text-gray-500">
      {{ props.title }}
    </p>
  </div>
</template>

<style lang="scss">
.slide {
  img {
    @apply rounded-sm sm:rounded-md w-full;
  }
}
</style>
