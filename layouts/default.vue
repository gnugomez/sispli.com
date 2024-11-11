<script setup lang="ts">
</script>

<template>
  <div class="layout-wrapper">
    <img src="../assets/images/paper/tl.png" class="absolute top-0 left-0">
    <img src="../assets/images/paper/tr.png" class="absolute top-0 right-0">
    <img src="../assets/images/paper/bl.png" class="absolute bottom-0 left-0">
    <NuxtPage />
  </div>
</template>

<style scoped lang="scss">
.layout-wrapper {
    @apply h-full relative p-11;

    &::before {
        content: '';
        @apply w-full h-full absolute inset-0 block;

        --s: 50px;  /* control the size of the grid */
        --n: 15;      /* control the granularity */
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
</style>
