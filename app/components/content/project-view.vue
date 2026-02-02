<script setup lang="ts">
import { defaultWindow, useScroll, useScrollLock, useSwipe, useToggle } from '@vueuse/core'
import { computed, useSlots, useTemplateRef, watch } from 'vue'

const slots = useSlots()
const slidesChildren = computed(() => slots.slides?.() || [])

const contentEl = useTemplateRef<HTMLDivElement>('contentEl')
const [isToggled, toggle] = useToggle()
const scrollLocked = useScrollLock(defaultWindow)
const { y } = useScroll(contentEl)
const { direction } = useSwipe(contentEl, {
  onSwipe: () => {
    if (direction.value === 'down' && y.value === 0 && isToggled.value)
      toggle(false)
  },
})

watch(isToggled, (val) => {
  scrollLocked.value = val
  contentEl.value?.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="layout">
    <div class="slides">
      <component :is="child" v-for="(child, index) in slidesChildren" :key="index" />
    </div>
    <div v-if="slots.default" ref="contentEl" class="content" :class="{ open: isToggled }" @click.prevent="() => !isToggled && toggle(true)">
      <div class="prose">
        <slot />
      </div>
      <div class="read-more">
        <span @click.prevent.stop="() => toggle()">{{ isToggled ? 'go back' : 'read more...' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  @apply grid sm:grid-cols-12 gap-5;

  .slides {
    @apply sm:col-span-8 flex flex-col gap-2;

    &:not(:has(+ .content)) {
      @apply sm:col-span-12;
    }

    // Padding for the floating content column in mobile
    @apply pb-2 sm:pb-0;
  }

  .content {
    @apply sm:col-span-4;

    // Mobile styles
    @apply fixed inset-x-0 bottom-[110px];
    @apply bg-primary-background pt-2 rounded-t-xl;
    @apply max-h-20;
    @apply overflow-hidden sm:overflow-visible;
    @apply transition-all duration-300 ease-out;

    // Desktop styles overrides
    @apply sm:relative sm:inset-auto sm:bottom-auto;
    @apply sm:bg-transparent sm:pt-0 sm:max-h-full sm:rounded-none;
    @apply sm:backdrop-blur-0 sm:backdrop-saturate-100;

    &.open {
      @apply overflow-scroll;

      // we need to substract the size of the nav
      max-height: calc(100% - 110px);
    }

    .read-more {
      @apply sm:hidden;
      @apply sticky bottom-0 px-3 inset-x-0 bg-primary-background/90 pb-2 text-left;

      @apply transition-all duration-300 ease-in-out;

      &::before {
        content: '';
        @apply absolute inset-x-0 top-0 h-2 pointer-events-none -translate-y-full bg-gradient-to-t from-primary-background/90 to-primary-background/0;
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
