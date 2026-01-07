<template>
  <div class="layout-wrapper">
    <Brand />
    <div class="flex w-full justify-between">
      <nuxt-img src="cum/tl.png" width="104" height="88" class="mix-blend-hard-light w-16 sm:w-24" draggable="false" />
      <nuxt-img src="cum/tr.png" width="104" height="88" class="mix-blend-hard-light w-16 sm:w-24" draggable="false" />
    </div>
    <div class="flex-1 py-5 sm:py-6 flex">
      <slot />
    </div>
    <div class="flex w-full justify-between">
      <nuxt-img src="cum/bl.png" width="104" height="88" class="mix-blend-hard-light w-16 sm:w-24" draggable="false" />
      <nuxt-img src="cum/br.png" width="104" height="88" class="mix-blend-hard-light w-16 sm:w-24" draggable="false" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-wrapper {
  @apply min-h-full relative p-3 pb-32 sm:p-11 flex flex-col;

  &::before {
    content: '';
    @apply w-full h-full absolute inset-0 block pointer-events-none;

    --s: 50px;
    /* control the size of the grid */
    --n: 15;
    /* control the granularity */
    --t: 1px;
    /* the thickness */
    --g: 1px;
    /* the gap between dashes */

    --c: #e3e3e3 25%, #0000 0;
    background:
      conic-gradient(at var(--g) var(--t), var(--c)) calc((var(--s)/var(--n) - var(--g) + var(--t))/2) 0/ calc(var(--s)/var(--n)) var(--s),
      conic-gradient(from 180deg at var(--t) var(--g), var(--c)) 0 calc((var(--s)/var(--n) - var(--g) + var(--t))/2)/ var(--s) calc(var(--s)/var(--n));
    background-position: center;
  }
}
</style>
