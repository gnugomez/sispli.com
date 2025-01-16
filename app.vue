<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} - Sispli! Studio` : 'Sispli! Studio',
})

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Menu :relaxed="isHome" />
</template>
