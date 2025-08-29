<script setup lang="ts">
const { slides } = defineProps<{
  slides: Array<{
    image: {
      src: string
      alt: string
    }
    width?: number
    height?: number
  }>
}>()
</script>

<template>
  <div class="layout">
    <div class="slides">
      <div v-for="(slide, index) in slides" :key="index" class="slide">
        <nuxt-img class="image" :src="slide.image.src" :width="slide.width || 3333" :height="slide.height || 2500"
          :alt="slide.image.alt"
          :placeholder="[80, Math.round((80 / (slide.width || 3333)) * (slide.height || 2500))]" />
      </div>
    </div>
    <div class="content">
      <div class="prose">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  @apply max-w-screen-xl mx-auto;
  @apply grid grid-cols-12 gap-5;

  .slides {
    @apply col-span-12 sm:col-span-8 flex flex-col gap-2;

    $gap: 20px;

    @media (min-width: calc(theme('screens.xl') + $gap * 2)) {
      margin-left: calc((theme('screens.xl') - 100vw) / 2 + $gap);
    }

    .slide img {
      @apply relative rounded-2xl sm:rounded-[2rem];
    }
  }

  .content {
    @apply col-span-12 sm:col-span-4;

    .prose {
      @apply sticky top-8;

      @apply prose-p:text-primary-dimmed prose-headings:text-primary-dimmed prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base;
    }
  }
}
</style>
