<script setup lang="ts">
const { size = 'default' } = defineProps<{
  size?: 'default' | 'huge'
}>()

const { push } = useRouter()

const onGoToHome = () => push('/')
</script>

<template>
  <header class="grid grid-cols-12 place-items-center py-3 w-full mix-blend-hard-light">
    <h1 class="title col-span-4 sm:col-span-5 mr-auto" @click="onGoToHome">
      Sispli!
    </h1>
    <img
      src="../assets/images/sispli_logo.svg" class="col-span-4 sm:col-span-2 cursor-pointer"
      :class="{ 'max-h-20 sm:max-h-36': size === 'huge', 'max-h-16 sm:max-h-24': size === 'default' }" draggable="false"
      @click="onGoToHome"
    >
    <h1 class="title col-span-4 sm:col-span-5 ml-auto" @click="onGoToHome">
      Studio
    </h1>
  </header>
</template>

<style lang="scss" scoped>
.title {
  @apply font-granaina text-primary text-4xl sm:text-6xl font-normal cursor-pointer;
}
</style>
