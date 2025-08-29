<template>
  <div class="layout-wrapper">
    <nuxt-img width="520" height="245" src="paper/tl.png" class="absolute w-[300px] sm:w-[520px] top-0 left-0" />
    <nuxt-img width="484" height="472" src="paper/tr.png"
      class="absolute w-[230px] sm:w-[484px] top-1/3 sm:top-0 right-0" />
    <nuxt-img width="225" height="389" src="paper/bl.png" class="absolute w-[120px] sm:w-[225px] bottom-0 left-0" />
    <NuxtPage />
  </div>
</template>

<style scoped lang="scss">
.layout-wrapper {
  @apply h-full relative p-3 pb-32 sm:p-11;

  &::before {
    content: '';
    @apply w-full h-full absolute inset-0 block;

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
  }
}
</style>
