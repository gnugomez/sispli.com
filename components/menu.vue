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
    <div class="item">
      <span>Contact</span>
      <img src="../assets/images/menu/contact.png" alt="contact" draggable="false">
    </div>
    <div class="item" @click="push('/portfolio')">
      <span>Portfolio</span>
      <img src="../assets/images/menu/portfolio.png" alt="portfolio" draggable="false">
    </div>
    <div class="item">
      <span>About</span>
      <img src="../assets/images/menu/me.png" alt="me" draggable="false">
    </div>
    <div class="item">
      <span>Shop</span>
      <img src="../assets/images/menu/shop.png" alt="shop" draggable="false">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
    @apply flex justify-center items-center gap-5 select-none;
    @apply z-50 fixed bottom-7 left-1/2 transform -translate-x-1/2;
    @apply px-6 py-3 rounded-full;

    &:not(.relaxed) {
      @apply bg-primary-background border;

      &::before {
        content: '';
        @apply w-full h-full absolute inset-0 block rounded-full overflow-hidden;

        --s: 28px;  /* control the size of the grid */
        --n: 5;      /* control the granularity */
        --t: 1px;    /* the thickness */
        --g: 1px;   /* the gap between dashes */

        --c:#e3e3e3 25%,#0000 0;
        background:
            conic-gradient(at var(--g) var(--t),var(--c))
             calc((var(--s)/var(--n) - var(--g) + var(--t))/2) 0/
             calc(var(--s)/var(--n)) var(--s),
            conic-gradient(from 180deg at var(--t) var(--g),var(--c))
             0 calc((var(--s)/var(--n) - var(--g) + var(--t))/2)/
             var(--s) calc(var(--s)/var(--n));
      }
    }

    @apply transition duration-300 origin-bottom;

    .item {
        @apply cursor-pointer relative;
        @apply w-20 h-20;

        img {
            @apply w-full h-full object-contain transition;
        }

        span {
          @apply absolute -top-11 left-1/2 transform -translate-x-1/2 text-primary-background font-semibold px-2 bg-gray-950 shadow-md rounded-lg border border-gray-700;
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
</style>
