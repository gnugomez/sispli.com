<script setup lang="ts">
import { defaultWindow } from '@vueuse/core'
import { ref } from 'vue'

const { relaxed = false } = defineProps<{
  relaxed?: boolean
}>()
const menuRef = ref<HTMLElement | null>(null)
const isInactive = ref(false)

const { isOutside } = useMouseInElement(menuRef)
const { arrivedState } = useScroll(defaultWindow, {
  offset: {
    bottom: 70,
  },
})

const { push } = useRouter()

const { start, stop } = useTimeoutFn(() => {
  isInactive.value = true
}, 500)

watch(isOutside, (outside) => {
  if (outside) {
    start()
  }
  else {
    stop()
    isInactive.value = false
  }
})
</script>

<template>
  <div ref="menuRef" class="menu" :class="[{ inactive: isInactive && !arrivedState.bottom, relaxed }]">
    <div class="wrapper">
      <div class="item" @click="push('/reach')">
        <span>Reach</span>
        <img src="../assets/images/menu/contact.png" alt="contact" draggable="false">
      </div>
      <div class="item" @click="push('/work')">
        <span>Work</span>
        <img src="../assets/images/menu/portfolio.png" alt="portfolio" draggable="false">
      </div>
      <div class="item" @click="push('/me')">
        <span>Me</span>
        <img src="../assets/images/menu/me.png" alt="me" draggable="false">
      </div>
      <div class="item" @click="push('/blog')">
        <span>Blog</span>
        <img src="../assets/images/menu/shop.png" alt="blog" draggable="false">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  @apply z-50 fixed bottom-0 sm:bottom-7 left-0 right-0;
  @apply flex justify-center items-center pointer-events-none;

  .wrapper {
    @apply transition duration-300 origin-bottom relative pointer-events-auto;

    @apply flex justify-center items-center gap-4 sm:gap-5 select-none;
    @apply px-6 pt-3 pb-8 sm:pb-3 sm:rounded-full border border-transparent transition-all duration-300;

    &::before {
      content: '';
      @apply w-full h-full absolute inset-0 block sm:rounded-full overflow-hidden opacity-0;
      @apply transition-all duration-300;

      --s: 28px;
      /* control the size of the grid */
      --n: 5;
      /* control the granularity */
      --t: 1px;
      /* the thickness */
      --g: 1px;
      /* the gap between dashes */

      --c: #e3e3e3 25%, #0000 0;
      background:
        conic-gradient(at var(--g) var(--t), var(--c)) calc((var(--s)/var(--n) - var(--g) + var(--t))/2) 0/ calc(var(--s)/var(--n)) var(--s),
        conic-gradient(from 180deg at var(--t) var(--g), var(--c)) 0 calc((var(--s)/var(--n) - var(--g) + var(--t))/2)/ var(--s) calc(var(--s)/var(--n));
    }
  }


  &:not(.relaxed) .wrapper {
    @apply bg-primary-background border-inherit;

    &::before {
      @apply opacity-100;
    }
  }


  .item {
    @apply cursor-pointer relative;
    @apply w-16 h-16 sm:w-20 sm:h-20;

    img {
      @apply w-full h-full object-contain transition;
    }

    span {
      @apply absolute bottom-0 left-1/2 transform -translate-x-1/2 text-primary translate-y-full;
    }

    @screen sm {
      span {
        @apply bottom-auto;
        @apply absolute -top-5 -translate-y-full text-primary-background font-semibold px-2 bg-gray-950 shadow-md rounded-lg border border-gray-700;
        @apply transition opacity-0 scale-75 origin-bottom;
      }

      &:hover {
        img {
          @apply scale-110;
        }

        span {
          @apply opacity-100 scale-100;
        }
      }
    }
  }
}
</style>
