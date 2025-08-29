<script setup lang="ts">
const { push } = useRouter()

const onGoToHome = () => push('/')
</script>

<template>
  <header class="grid grid-cols-12 place-items-center py-3 w-full mix-blend-hard-light">
    <span class="title col-span-4 sm:col-span-5 mr-auto" @click="onGoToHome">
      Sispli!
    </span>
    <img src="../assets/images/sispli_logo.svg" class="col-span-4 sm:col-span-2 cursor-pointer max-h-20 sm:max-h-36"
      draggable="false" @click="onGoToHome">
    <span class="title col-span-4 sm:col-span-5 ml-auto" @click="onGoToHome">
      Studio
    </span>
  </header>
</template>

<style lang="scss" scoped>
.title {
  @apply font-granaina text-primary text-4xl sm:text-6xl font-normal cursor-pointer;
}
</style>
