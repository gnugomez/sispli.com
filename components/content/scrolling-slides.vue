<script setup lang="ts">
const { slides = [] } = defineProps<{
  slides?: {
    src: string
    alt: string
    width: number
    height: number
  }[]
}>()
</script>

<template>
  <div class="layout">
    <div class="slides">
      <div v-for="slide in slides" :key="slide.src" class="slide">
        <nuxt-img
          class="background" :src="slide.src" :width="slide.width" :height="slide.height" :alt="slide.alt"
          :placeholder="[80, Math.round((80 / slide.width) * slide.height)]"
        />
        <div class="absolute inset-0 backdrop-blur-3xl sm:hidden" />
        <nuxt-img
          class="image" :src="slide.src" :width="slide.width" :height="slide.height" :alt="slide.alt"
          :placeholder="[80, Math.round((80 / slide.width) * slide.height)]"
        />
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
@media (max-width: theme("screens.sm")) {
  .slides {
    @apply -m-3;
  }

  .slide {
    height: calc(100dvh - 110px);
    @apply flex items-center relative;

    img.background {
      @apply absolute w-full h-full object-cover;
    }
  }
}

.slide {
  scroll-snap-align: start;

  img {
    &.background {
      @apply sm:hidden;
    }

    &.image {
      @apply sm:rounded-3xl relative;
    }
  }
}

.layout {
  @apply max-w-screen-xl mx-auto;
  @apply grid grid-cols-12 gap-5;

  .slides {
    @apply col-span-12 sm:col-span-8 flex flex-col sm:gap-3 sm:gap-5;

    $gap: 20px;

    @media (min-width: calc(theme('screens.xl') + $gap * 2)) {
      margin-left: calc((theme('screens.xl') - 100vw) / 2 + $gap);
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
