<script setup lang="ts">
import { breakpointsTailwind, defaultWindow, useScroll, useScrollLock, useSwipe, useToggle } from '@vueuse/core'
import { computed, useSlots, useTemplateRef, watch } from 'vue'
import IconBack from '~icons/tabler/arrow-back-up'
import IconPlus from '~icons/tabler/plus'

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
const { sm } = useBreakpoints(breakpointsTailwind)

onClickOutside(contentEl, () => {
  if (isToggled.value)
    toggle(false)
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
    <div
      v-if="slots.default" ref="contentEl" class="content" :class="{ open: isToggled }"
      @click.prevent="() => !isToggled && !sm && toggle(true)"
    >
      <div v-if="y > 1" class="scroll-shadow" />
      <div class="prose">
        <slot />
      </div>
      <div class="read-more">
        <span @click.prevent.stop="() => !sm && toggle()">
          {{ isToggled ? 'back' : 'read more' }}{{ " " }}
          <IconPlus v-if="!isToggled" class="inline" />
          <IconBack v-else class="inline" />
        </span>
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
    @apply pb-32 sm:pb-0;
  }

  .content .prose {
    @apply line-clamp-3 sm:line-clamp-none;
  }

  &:has(.content.open) {
    &::before {
      @apply opacity-100;
    }

    .content .prose {
      @apply line-clamp-none;
    }
  }

  &::before {
    content: '';
    @apply fixed inset-0 pointer-events-none;
    @apply bg-white/65;
    @apply transition-opacity duration-300;
    @apply opacity-0;
  }

  .content {
    @apply sm:col-span-4;

    // Mobile styles
    @apply fixed inset-x-0 bottom-[110px] z-10;
    @apply bg-primary-background/90 backdrop-blur-md pt-2;
    @apply overflow-hidden sm:overflow-visible;
    @apply border-t border-primary-dimmed/50;
    @apply max-h-full;

    // Desktop styles overrides
    @apply sm:relative sm:inset-auto sm:bottom-auto;
    @apply sm:bg-transparent sm:pt-0 sm:max-h-full sm:rounded-none;
    @apply sm:backdrop-blur-0 sm:backdrop-saturate-100;
    @apply sm:border-none;

    &.open {
      @apply overflow-scroll;
      max-height: calc(100% - 110px);
    }

    .read-more {
      @apply sm:hidden;
      @apply sticky bottom-0 px-3 mt-4 inset-x-0 bg-primary-background/90 pb-2 text-left;

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

    .scroll-shadow {
      @apply sticky inset-x-0 -top-2 h-10 pointer-events-none;
      @apply bg-gradient-to-b from-primary-background to-primary-background/0;
      @apply transition-opacity duration-300;
      @apply opacity-100;
    }
  }
}
</style>
