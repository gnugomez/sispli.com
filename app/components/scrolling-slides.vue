<script setup lang="ts">
import { defaultWindow } from '@vueuse/core';

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

const contentEl = useTemplateRef<HTMLDivElement>("contentEl")
const [isToggled, toggle] = useToggle()
const scrollLocked = useScrollLock(defaultWindow)

watch(isToggled, (val) => {
  scrollLocked.value = val
  contentEl.value?.scrollTo({ top: 0 })
})

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
    <div class="content" :class="{ 'open': isToggled }" ref="contentEl">
      <div class="prose">
        <slot />
      </div>
      <div class="read-more">
        <span @click.prevent="() => toggle()">{{ isToggled ? 'go back' : 'read more...' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  @apply max-w-screen-xl mx-auto;
  @apply grid sm:grid-cols-12 gap-5;

  .slides {
    @apply sm:col-span-8 flex flex-col gap-2;

    // Padding for the floating content column in mobile
    @apply pb-10 sm:pb-0;

    $gap: 20px;

    @media (min-width: calc(theme('screens.xl') + $gap * 2)) {
      margin-left: calc((theme('screens.xl') - 100vw) / 2 + $gap);
    }

    .slide img {
      @apply relative rounded-2xl sm:rounded-[2rem];
    }
  }

  .content {
    @apply sm:col-span-4;

    // Mobile styles
    @apply fixed inset-x-0 bottom-[110px];
    @apply bg-primary-background pt-2 rounded-t-xl;
    @apply pointer-events-none max-h-20;
    @apply overflow-scroll sm:overflow-visible;
    @apply transition-all duration-300 ease-out;

    // Desktop styles overrides
    @apply sm:relative sm:inset-auto sm:bottom-auto;
    @apply sm:bg-transparent sm:pt-0 sm:max-h-full sm:rounded-none;
    @apply sm:backdrop-blur-0 sm:backdrop-saturate-100 sm:pointer-events-auto;


    &.open {
      @apply pointer-events-auto;

      // we need to substract the size of the nav
      max-height: calc(100% - 110px);
    }

    .read-more {
      @apply sm:hidden;
      @apply sticky bottom-0 px-3 inset-x-0 bg-primary-background/90 pb-2 text-left;

      @apply transition-all duration-300 ease-in-out;

      &::before {
        content: '';
        @apply absolute inset-x-0 top-0 h-5 pointer-events-none -translate-y-full bg-gradient-to-t from-primary-background/90 to-primary-background/0;
        @apply transition-all duration-300;
      }

      span {
        @apply cursor-default pointer-events-auto;
      }
    }

    .prose {
      @apply sm:sticky sm:top-8;
      @apply px-3 sm:px-0;

      @apply prose-p:text-primary-dimmed prose-headings:text-primary-dimmed prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base;
    }
  }
}
</style>
