<script setup lang="ts">
definePageMeta({
  layout: 'empty',
})
</script>

<template>
  <div class="grid grid-rows-3 h-full w-full relative min-h-[500px]">
    <nuxt-img src="cum/tl.png" width="104" height="88" class="absolute top-0 left-0 mix-blend-hard-light" />
    <nuxt-img src="cum/tr.png" width="104" height="88" class="absolute top-0 right-0 mix-blend-hard-light" />
    <nuxt-img src="cum/bl.png" width="104" height="88" class="absolute bottom-0 left-0 mix-blend-hard-light" />
    <nuxt-img src="cum/br.png" width="104" height="88" class="absolute bottom-0 right-0 mix-blend-hard-light" />

    <div class="top flex flex-col items-center">
      <h1 class="font-ppmondwest text-primary text-8xl mix-blend-hard-light text-center">
        Hiiiiii
      </h1>
      <h2 class="font-inconsolata text-primary mix-blend-hard-light text-center text-3xl">
        please (sispli) be kind, <br>
        welcome to my world !
      </h2>
    </div>
    <Brand size="huge" />
    <div class="bottom flex flex-row justify-center">
      <div class="menu mt-auto">
        <div class="item">
          <img src="../assets/images/menu/contact.png" alt="contact" draggable="false">
        </div>
        <div class="item">
          <img src="../assets/images/menu/portfolio.png" alt="portfolio" draggable="false">
        </div>
        <div class="item">
          <img src="../assets/images/menu/me.png" alt="me" draggable="false">
        </div>
        <div class="item">
          <img src="../assets/images/menu/shop.png" alt="shop" draggable="false">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
    @apply flex justify-center items-center gap-12 select-none;

    .item {
        @apply cursor-pointer hover:scale-95 transition;
    }
}
</style>
